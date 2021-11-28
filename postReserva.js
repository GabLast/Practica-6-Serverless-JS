'use strict';
const AWS = require('aws-sdk');

exports.handler = async(event, context) => {
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html
    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;

    const { id, correo, nombre, lab, fecha, horaInicio, horaFin } = JSON.parse(event.body);

    const params = {

        TableName: "Reservas",
        Item: {
            id: id,
            nombre: nombre,
            correo: correo,
            lab: lab,
            fecha: fecha,
            horaInicio: horaInicio,
            horaFin: horaFin
        }
    };

    try {

        const data = await documentClient.put(params).promise();
        // Creates a new item, or replaces an old item with a new item by delegating to AWS.DynamoDB.putItem().
        responseBody = event.body
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