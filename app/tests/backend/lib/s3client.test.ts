/**
 * @jest-environment node
 */
import { mocked } from 'jest-mock'; 
import express from 'express';
import session from 'express-session';
import crypto from 'crypto';  
import getAuthRole from '../../../utils/getAuthRole';
import { uploadFileToS3, getFileFromS3, checkFileExists, getFileTagging } from '../../../backend/lib/s3client';

jest.mock('@aws-sdk/middleware-apply-body-checksum');
jest.mock("../../../backend/lib/awsCommon", () => {
  return  {
    region: 'AWS_S3_REGION',
    logger: console,
    requestHandler: jest.fn(),
    credentials: () => {
      masterCredentials: () => {
        return {
          params: {
            RoleArn: 'AWS_ROLE_ARN',
            RoleSessionName: `s3-v3-role-session-${Date.now()}`,
            DurationSeconds: 3600,
          },
          clientConfig: { region: 'AWS_S3_REGION' }
        }
      }
    }
  }
});
jest.mock('@aws-sdk/s3-request-presigner',()=> {
  return {
    getSignedUrl: ()=>{
      return new Promise((resolve) => {
        resolve('fake_signed_url');
      });
    }
  }
});

jest.mock("@aws-sdk/client-s3",()=>{
  return { 
    S3Client: jest.fn().mockImplementation(() => { 
      return {
        middlewareStack:{use: jest.fn()},
        config:{},
        send: ()=>{
          return new Promise((resolve) => {
            resolve(
              {
                $metadata:{
                  httpStatusCode:200
                },
                TagSet:[{ Key: 'av-status', Value: 'clean' }]
              }
            );
          });
        }
      } 
    }), 
    
    GetObjectCommand: jest.fn().mockImplementation(() =>{}), 
    GetObjectTaggingCommand: jest.fn().mockImplementation(() =>{}), 
    HeadObjectCommand: jest.fn().mockImplementation(() =>{}), 
    PutObjectCommand: jest.fn().mockImplementation(() =>{})
  }  
});

jest.mock('../../../backend/lib/graphql');
jest.mock('../../../utils/getAuthRole');

jest.setTimeout(10000000);

describe('S3 client', () => {
  let app;

  beforeEach(async () => {
    app = express();
    app.use(session({ secret: crypto.randomUUID(), cookie: { secure: true } }));
  });

  it('should receive the correct response for file upload', async () => {
    const params = {
      Bucket: 'bucket',
      Key: 'file',
      Body:  'filebody',
    };
    const response = await uploadFileToS3(params);
    expect(response).toBe(true);
  });

  it('should receive the correct response for file download', async () => {
    const mockJson = jest.fn();
    const fakeResponse = {
      json: mockJson
    }
    
    await getFileFromS3('uuid','filename', fakeResponse);
    expect(mockJson).toBeCalled();
  });

  it('should receive the correct response to user checking if file exists', async () => {
    const params = {
      Bucket: 'bucket',
      Key: 'file',
      Body:  'filebody',
    };
    const response = await checkFileExists(params);
    expect(response).toBe(true);
  });

  it('should receive the correct response to user checking file tags', async () => {
    const params = {
      Bucket: 'bucket',
      Key: 'file',
      Body:  'filebody',
    };
    const expected = {"$metadata": {"httpStatusCode": 200}, "TagSet": [{"Key": "av-status", "Value": "clean"}]};
    const response = await getFileTagging(params);
    expect(response).toEqual(expected);
  });

  afterAll(()=>{
    jest.resetAllMocks();
  })
});
