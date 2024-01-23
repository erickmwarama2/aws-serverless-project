import { SendMessageCommand } from "@aws-sdk/client-sqs";
import { sqsClient } from "./sqsClient.js";

const params = {
    QueueUrl: "https://sqs.ap-southeast-1.amazonaws.com/525060345766/new-sqs-queue",
    DelaySeconds: 10,
    MessageBody: "Send message using aws sdk application"
};

export const run = async () => {
    try {
        const data = await sqsClient.send(new SendMessageCommand(params));
        console.log("Success", data);
    } catch (err) {
        console.error(err);
    }
};

run();