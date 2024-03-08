const AWS = require('aws-sdk');
const fs = require('fs');
const lambda = new AWS.Lambda({region: 'us-east-1'});

const functionCode = fs.readFileSync('helloWorld.zip');

lambda.createFunction({
    Code: { ZipFile: functionCode },
    FunctionName: 'HelloWorldFunction',
    Handler: 'helloWorld.handler',
    Role: 'arn:aws:iam::ACCOUNT_ID:role/ROLE',
    Runtime: 'nodejs14.x',
}, (err, data) => {
    if (err) console.log(err, err.stack);
    else console.log("Lambda function created:", data);
});

