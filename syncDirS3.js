var AWS = require('aws-sdk');
var fs = require('fs');
var path = require('path');
require('dotenv').config()


AWS.config.update({region: process.env.AWS_REGION});

// Create S3 service object
s3 = new AWS.S3({apiVersion: '2006-03-01'});

// Call S3 to list the buckets
s3.listBuckets(function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Buckets);
  }
});

function uploadArtifactsToS3() {
    const testResultsPath = './cypress/screenshots';
  
    const walkSync = (currentDirPath, callback) => {
      fs.readdirSync(currentDirPath).forEach((name) => {
        const filePath = path.join(currentDirPath, name);
        const stat = fs.statSync(filePath);
        if (stat.isFile()) {
          callback(filePath, stat);
        } else if (stat.isDirectory()) {
          walkSync(filePath, callback);
        }
      });
    };
  
    walkSync(testResultsPath, async (filePath) => {
      let bucketPath = filePath.substring(testResultsPath.length - 1);
      let params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${bucketPath}`,
        Body: fs.readFileSync(filePath),
        ACL: 'public-read'
      };
      try {
        await s3.putObject(params).promise();
        console.log(`Successfully uploaded ${bucketPath} to s3 bucket`);
      } catch (error) {
        console.error(`error in uploading ${bucketPath} to s3 bucket`);
        throw new Error(`error in uploading ${bucketPath} to s3 bucket`);
      }
    });
  };
  
  uploadArtifactsToS3()