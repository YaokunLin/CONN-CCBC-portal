import { Router } from 'express';

import config from '../../config';
import getAuthRole from '../../utils/getAuthRole';
import {checkFileExists,getFileFromS3, uploadFileToS3} from './s3client';
import getAttachmentList from './attachments';
import getLastIntakeId from './lastIntake';

const AWS_S3_BUCKET = config.get('AWS_S3_BUCKET');
const AWS_S3_LIST_BUCKET = config.get('AWS_CLAM_S3_BUCKET');
const AWS_S3_SECRET_KEY = config.get('AWS_S3_SECRET_KEY');

const s3adminArchive = Router();

// eslint-disable-next-line consistent-return
s3adminArchive.get('/api/analyst/admin-archive/:intake', async (req, res) => {
  const authRole = getAuthRole(req);
  const isRoleAuthorized = authRole?.pgRole === 'ccbc_admin';
  if (!isRoleAuthorized) {
    // check header
    const apiKey = req.headers['x-api-key'];
    if (apiKey !== AWS_S3_SECRET_KEY) {
      return res.status(404).end();
    }
    req.claims = {
      identity_provider: 'idir',
      client_roles: ['admin'],
      aud: 'ccbc',
      exp: 0,
      iat: 0,
      iss: 'ccbc',
      sub: 'ccbc',
    };
  }
  let { intake } = req.params;
  const s3Key = `Intake_${intake}_attachments`;
  const s3params =  {
    Bucket: AWS_S3_BUCKET,
    Key: `${s3Key}.zip`,
  };
  if (intake === '-1') intake = await getLastIntakeId(req);
  if (intake === '-1') {
    throw new Error('Wrong intake id');
  }
  const alreadyExists = await checkFileExists(s3params);
  if (alreadyExists) {
    await getFileFromS3(s3params.Key, s3params.Key, res);
    return res.status(200).end();
  }

  const attachments = await getAttachmentList(
    parseInt(intake as string, 10),
    req
  );

  const fileName = `${s3Key}.json`;
  const params = {
    Bucket: AWS_S3_LIST_BUCKET,  
    Key:  fileName,
    Body: JSON.stringify(attachments)
  };
  const response = await uploadFileToS3(params)
  res.send(response);
  return res.status(200).end();
});

export default s3adminArchive;
