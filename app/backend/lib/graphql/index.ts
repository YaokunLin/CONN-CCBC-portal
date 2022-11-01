import type { Request } from 'express';
import * as Sentry from '@sentry/nextjs';
import PgManyToManyPlugin from '@graphile-contrib/pg-many-to-many';
import {
  postgraphile,
  createPostGraphileSchema,
  withPostGraphileContext,
  PostGraphileOptions,
} from 'postgraphile';
import { graphql, GraphQLSchema } from 'graphql';
import { TagsFilePlugin } from 'postgraphile/plugins';
import PostgraphileRc from '../../../.postgraphilerc';

import { pgPool, getDatabaseUrl } from '../setup-pg';
import authenticationPgSettings from './authenticationPgSettings';

import { generateDatabaseMockOptions } from './helpers';
import config from '../../../config';
import resolveFileUpload from './resolveFileUpload';
import PostGraphileUploadFieldPlugin from './uploadFieldPlugin';

export const pgSettings: any = (req: Request) => {
  const opts = {
    ...authenticationPgSettings(req),
    ...generateDatabaseMockOptions(req.cookies, ['mocks.mocked_timestamp']),
  };
  return opts;
};

let postgraphileOptions: PostGraphileOptions = {
  appendPlugins: [
    PgManyToManyPlugin,
    // ConnectionFilterPlugin,
    TagsFilePlugin,
    PostGraphileUploadFieldPlugin,
    // PgOmitArchived,
    // PgOrderByRelatedPlugin,
    // FormChangeValidationPlugin,
  ],
  classicIds: true,
  enableQueryBatching: true,
  dynamicJson: true,
  pgSettings,
  graphileBuildOptions: {
    ...PostgraphileRc.options.graphileBuildOptions,
    uploadFieldDefinitions: [
      {
        match: ({ table, column }) =>
          table === 'attachment' && column === 'file',
        resolve: resolveFileUpload,
      },
    ],
  },
};

if (config.get('SENTRY_ENVIRONMENT')) {
  postgraphileOptions = {
    ...postgraphileOptions,
    handleErrors: (errors) => {
      Sentry.captureException(errors);
      return errors;
    },
  };
} else {
  postgraphileOptions = {
    ...postgraphileOptions,
    extendedErrors: ['hint', 'detail', 'errcode'],
    showErrorStack: 'json',
  };
}

if (config.get('NODE_ENV') === 'production') {
  postgraphileOptions = {
    ...postgraphileOptions,
    retryOnInitFail: true,
  };
} else {
  postgraphileOptions = {
    ...postgraphileOptions,
    graphiql: true,
    enhanceGraphiql: true,
    allowExplain: true,
  };
}

const postgraphileMiddleware = () =>
  postgraphile(pgPool, config.get('PGSCHEMA'), postgraphileOptions);

export default postgraphileMiddleware;

let postgraphileSchemaSingleton: GraphQLSchema;

const postgraphileSchema = async () => {
  if (!postgraphileSchemaSingleton) {
    postgraphileSchemaSingleton = await createPostGraphileSchema(
      getDatabaseUrl(),
      config.get('PGSCHEMA'),
      postgraphileOptions
    );
  }

  return postgraphileSchemaSingleton;
};

export async function performQuery(
  query: any,
  variables: any,
  request: Request
) {
  const settings = pgSettings(request);
  return withPostGraphileContext(
    {
      pgPool,
      pgSettings: settings,
    },
    async (context) =>
      // Execute your GraphQL query in this function with the provided
      // `context` object, which should NOT be used outside of this
      // function.
      graphql(
        await postgraphileSchema(),
        query,
        null,
        { ...context },
        variables
      )
  );
}
