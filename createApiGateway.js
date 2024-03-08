const AWS = require('aws-sdk');
const apiGateway = new AWS.APIGateway({region: 'us-east-1'});

const createApiGateway = async () => {
    try {
        const api = await apiGateway.createRestApi({ name: 'HelloWorldAPI' }).promise();
        console.log("API created:", api);

        const resources = await apiGateway.getResources({ restApiId: api.id }).promise();
        const rootResourceId = resources.items.find(item => item.path === '/').id;

        const resource = await apiGateway.createResource({
            restApiId: api.id,
            parentId: rootResourceId,
            pathPart: 'hello',
        }).promise();
        console.log("Resource created:", resource);

        const method = await apiGateway.putMethod({
            restApiId: api.id,
            resourceId: resource.id,
            httpMethod: 'GET',
            authorizationType: 'NONE',
        }).promise();
        console.log("Method created:", method);

        const integration = await apiGateway.putIntegration({
            restApiId: api.id,
            resourceId: resource.id,
            httpMethod: 'GET',
            type: 'AWS_PROXY',
            integrationHttpMethod: 'POST',
            uri: `arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:YOUR_ACCOUNT_ID:function:HelloWorldFunction/invocations`,
        }).promise();
        console.log("Integration created:", integration);

    } catch (err) {
        console.error(err);
    }
};

createApiGateway();