import { ddbClient } from "./ddbClient.js";
import { marshall } from "@aws-sdk/util-dynamodb";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";

export const handler = async function(event) {
    console.log("Request:", JSON.stringify(event, undefined, 2));

    try {
        for (const record of event.Records) {
            console.log(`Record: ${JSON.stringify(record)}`);

            const snsPublishedMessage = JSON.parse(record.body);
            console.log(`SNS message: ${JSON.stringify(snsPublishedMessage)}`);

            const orderRequest = JSON.parse(snsPublishedMessage.Message);
            console.log(`Order request: ${JSON.stringify(orderRequest)}`);

            if (orderRequest === null || orderRequest.type === null || orderRequest.type != 'SHIP_REQUIRED') {
                throw Error(`order type should be SHIP_REQUIRED`);
            }

            orderRequest.code = orderRequest.item;

            const dynamodbParams = {
                TableName: 'inventory',
                Item: marshall(orderRequest || {})
            }

            const createResult = await ddbClient.send(new PutItemCommand(dynamodbParams));
            console.log(`Succesfully created item in inventory table: ${createResult}`);
        }
    } catch (error) {
        console.error(error);
    }
}