import type { NextPageContext } from 'next';
import { WiredOptions } from 'relay-nextjs/wired/component';
import { NextRouter } from 'next/router';
import { isAuthenticated } from '@bcgov-cas/sso-express/dist/helpers';
import { getClientEnvironment } from './client';
import isRouteAuthorized from '../../utils/isRouteAuthorized';

const withRelayOptions: WiredOptions<any> = {
  fallback: <div>Loading...</div>,
  ErrorComponent: (props) => {
    throw props.error;
  },
  createClientEnvironment: () => getClientEnvironment()!,
  createServerEnvironment: async (ctx: NextPageContext) => {
    const { createServerEnvironment } = await import('./server');
    return createServerEnvironment({ cookieHeader: ctx?.req?.headers.cookie });
  },
  serverSideProps: async (ctx: NextPageContext) => {
    const { default: getAuthRole } = await import('../../utils/getAuthRole');
    // Server-side redirection of the user to their landing route, if they are logged in
    const request = ctx.req as any;
    const authRole = getAuthRole(request);
    const authenticated = isAuthenticated(request);
    const routeAuthorized = isRouteAuthorized(request.url, authRole.pgRole);
    // They're logged in and authorized to access the page or the page is not protected
    if (routeAuthorized) {
      return {};
    }

    // They're logged in but they are not authorized to access the page
    if (authenticated) {
      return {
        redirect: {
          destination: authRole.landingRoute,
        },
      };
    }

    // Redirect them to landing route responding to the page they are trying to access
    return {
      redirect: {
        destination: request.url.startsWith('/analystportal')
          ? '/analystportal'
          : '/applicantportal',
      },
    };
  },
  variablesFromContext: (ctx: NextPageContext | NextRouter) => ({
    ...ctx.query,
  }),
};

export default withRelayOptions;
