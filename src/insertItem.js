"use strict";


const {v4} = require("uuid");
const AWS = require("aws-sdk");

const instertItem = async (event) => {

    const item = JSON.parse(event.body);
    const createdAt = new Date().toISOString;
    const ra = v4();

    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const newItem = {
        ra,
        item,
        createdAt,
        itemStatus: false
    };

    await dynamoDB.put(
        {
        TableName: "AlunosMonitoria",
        item: newItem
        }
    ).promise();
    return {
        statusCode: 200,
        body: JSON.stringify(newItem)
    };
}
module.exports = {
    handler: instertItem
}    
