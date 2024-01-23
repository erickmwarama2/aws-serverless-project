import { v4 as uuidv4 } from "uuid";
import { snsClient } from "./snsClient.js";
import { PublishCommand } from "@aws-sdk/client-sns";
import { marshall } from "@aws-sdk/util-dynamodb";
import { ddbClient } from "./dynamodbClient.js";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";

export const handler = async (event) => {
    console.log("event:", JSON.stringify(event, undefined, 2));

    try {
        if (event.httpMethod != 'POST') {
            throw new Error(`Http Method should be POST`);
        }

        const orderRequest = JSON.parse(event.body);

        if (orderRequest === null || orderRequest.type === null) {
            throw new Error(`order type should exist in orderRequest: ${orderRequest}`);
        }

        const orderId = uuidv4();
        orderRequest.id = orderId;

        // process.env.TopicArn

        let params = {
            Message: JSON.stringify(orderRequest),
            TopicArn: process.env.TopicArn
        };

        const data = await snsClient.send(new PublishCommand(params));
        console.log("Succesfully published SNS Message", data);

        const dynamodbParams = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Item: marshall(orderRequest || {})
        };

        const createResult = await ddbClient.send(new PutItemCommand(dynamodbParams));
        console.log(`Succesfully created item in the order table. ${createResult}`);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: `Succesfully finished order create operation: ${orderRequest}`,
                body: data
            })
        };

    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: `Error occured while creating order: ${error.message}`
            })
        };
    }
}