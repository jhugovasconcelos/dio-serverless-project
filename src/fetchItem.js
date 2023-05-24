"use strict"
const AWS = require("aws-sdk");
const { json } = require("express/lib/response");

const fetchItem = async(event) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const {ra} = event.pathParameters

    let item;

    try {
        const results = await dynamoDB.get({
            TableName: "AlunosMonitoria",
            Key: {ra},
        }).promise();

        item = results.Item;
    } catch (error) {
        console.log(error)
    }

    return {
        statusCode: 200,
        body: JSON.stringify(item),
    };
}

module.exports = {
    handler: fetchItem,
}