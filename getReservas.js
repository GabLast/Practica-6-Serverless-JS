'use strict';
const AWS = require('aws-sdk');

exports.handler = async(event, context) => {
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html
    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;

    const params = {
        TableName: "Reservas"
    };

    try {
        const data = await documentClient.scan(params).promise();
        responseBody = JSON.stringify(data.Items);
        statusCode = 200;
    } catch (error) {
        responseBody = "An error has occured: " + error;
        statusCode = 400;
    }

    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin": "*"
        },
        body: responseBody
    };

    return response;
};