const { readFileSync, createWriteStream, existsSync,mkdirSync,statSync } = require("fs");
const { DateTime } = require('luxon');
const AdmZip = require('adm-zip');
const AWS = require("aws-sdk");

const INFECTED_FILE_PREFIX = 'BROKEN';
const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET; // || 'fapi7b-dev-ccbc-data';
const s3 = new AWS.S3();

exports.handler = async(event, context, callback) => {
  if (!event.Records) {
    console.log("Not an S3 event invocation!");
    return;
  }
  const record = event.Records[0];

  if (record.s3.object.key.indexOf('Intake_')>-1 && record.s3.object.key.indexOf('json')>-1) {
    const s3Object = await s3
    .getObject({
      Bucket: record.s3.bucket.name,
      Key: record.s3.object.key
    })
    .promise();
    const message = s3Object.Body;
    console.log(`Got list of attachments from S3; file size: ${message.length}`);
    const list = JSON.parse(message);
    const issues = [];
    const key = record.s3.object.key.replace('.json','.zip');
    const currentDate = DateTime.now().toFormat('yyyyMMdd');
    const fileName = `CCBC_applications_${currentDate}.zip`;
  
    if (list && Array.isArray(list)) {  
      if (!existsSync('/tmp')){
        mkdirSync('/tmp');
    }
      const output = createWriteStream(`/tmp/${fileName}`, { flags: 'w' });  
      const archive = new AdmZip();
      output.on("close", () => {
        console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');
      });
      output.on("finish", () => { 
        console.log('output stream finished.');
      });
      output.on('end', function() {
        console.log('Data has been drained');
      });
      output.on('error', function (err) { 
        console.log('[OUTPUT STREAM ERROR]', err); 
      });

      archive.on('error', function(err) {
        console.log('[ARCHIVER ERROR]', err); 
      });
      for (const record of list) {
        // each record: { name, uuid }
        if (record.name.indexOf(INFECTED_FILE_PREFIX) > -1) {
          archive.addFile(`${INFECTED_FILE_PREFIX}_${record.name}`, '');
          issues.push({
            status: 409,
            name: record.name, 
            uuid: record.uuid, 
            size: record.size,
            type: record.type,
            size_s3: 0,
            type_s3: '',
            timestamp: Date.now().toLocaleString(), 
            details: 'File excluded due to possible virus infection'
          });
        }
        else {
          const objectSrc = await s3.getObject({
              Bucket: AWS_S3_BUCKET,  
              Key: record.uuid
            })
            .promise()
            .catch((err) =>{
              issues.push({
                status: 500,
                name: record.name, 
                uuid: record.uuid, 
                size: record.size,
                type: record.type,
                size_s3: 0,
                type_s3: '',
                timestamp: Date.now().toLocaleString(), 
                details: JSON.stringify(err)
              });
            });
          if (objectSrc && objectSrc.Body) {
            console.log(`downloaded ${record.name} from s3, key: ${record.uuid}`);
            archive.addFile(record.name, objectSrc.Body);
            const metadata = objectSrc.Metadata;
            if (metadata) {
              if (metadata.ContentLength !== record.size || metadata.ContentType !== record.type){
                issues.push({
                  status: 400,
                  name: record.name, 
                  uuid: record.uuid, 
                  size: record.size,
                  type: record.type,
                  size_s3: metadata.ContentLength,
                  type_s3: metadata.ContentType,
                  timestamp: Date.now().toLocaleString(), 
                  details: 'Size or file type mismatch'
                });
              }
            }
          }
        }
      }
      let summary = '';
      if (issues.length>0) {
        issues.forEach(x => {
          const line =`${x.status} - ${x.uuid} - ${x.name} - ${x.type} - ${x.size_s3} - ${x.size} - ${x.timestamp}`;
          summary += line + '\r\n';
        });
      }
      else {
        summary = 'Download successfull';
      }
      archive.addFile('errors.txt',Buffer.alloc(summary.length, summary));
      
      archive.writeZip(`/tmp/${fileName}`);
      const stats = statSync(`/tmp/${fileName}`);
      const fileSizeInBytes = stats.size;
      const blob = readFileSync(`/tmp/${fileName}`);
      var params = {
        Bucket: AWS_S3_BUCKET,  
        Key:  key,
        Body: blob
      };
      await uploadFileToS3(params); 
      console.log(`uploaded ${key} to s3, size on disk: ${fileSizeInBytes}, blob size ${blob.length}`);
      return {key};
    }
  }
  return;
};

async function uploadFileToS3(params)
{
    try {
      await s3.upload({
        Bucket: params.Bucket,
        Key: params.Key,
        Body: params.Body,
      }).promise();
    }
    catch (ex) {
        console.error(ex);
    }	
    return;
}
