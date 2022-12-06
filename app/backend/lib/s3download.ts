import { Router } from 'express';
import config from '../../config';
import getAuthRole from '../../utils/getAuthRole';
import s3Client from './s3client';

const AWS_S3_BUCKET = config.get('AWS_S3_BUCKET');

const s3download = Router();

// eslint-disable-next-line consistent-return
s3download.get('/api/s3/download/:uuid/:fileName', (req, res) => {
  const { uuid, fileName } = req.params;

  const authRole = getAuthRole(req);
  const isRoleAuthorized =
    authRole?.pgRole === 'ccbc_admin' ||
    authRole?.pgRole === 'ccbc_analyst' ||
    authRole?.pgRole === 'ccbc_auth_user';

  if (!isRoleAuthorized || !uuid || !fileName) {
    return res.status(404).end();
  }

  const signedUrl = s3Client.getSignedUrl('getObject', {
    Bucket: AWS_S3_BUCKET,
    Key: uuid as string,
    Expires: 60,
    ResponseContentDisposition: `attachment; filename="${fileName}"`,
  });

  res.json(signedUrl);
});

export default s3download;
