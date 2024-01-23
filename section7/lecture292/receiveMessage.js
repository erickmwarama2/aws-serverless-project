import { DeleteMessageCommand, ReceiveMessageCommand } from "@aws-sdk/client-sqs";
import { sqsClient } from "./sqsClient.js";

const queueUrl = "https://sqs.ap-southeast-1.amazonaws.com/525060345766/new-sqs-queue";

const params = {
    QueueUrl: queueUrl,
    VisibilityTimeout: 20,
    WaitTimeSeconds: 10,
    MaxNumberOfMessages: 10,
    MessageAttributeNames: ["All"]
};

export const run = async () => {
    try {
        const data = await sqsClient.send(new ReceiveMessageCommand(params));
        console.log("Success: ", data);

        setTimeout(async () => {
            if (data.Messages) {
                var deleteParams = {
                    QueueUrl: queueUrl,
                    ReceiptHandle: data.Messages[0].ReceiptHandle
                };

                try {
                    const data = await sqsClient.send(new DeleteMessageCommand(deleteParams));
                    console.log("Message deleted", data);
                } catch (err) {
                    console.log("Error", err);
                }
            } else {
                console.log("No messages to delete");
            }
        }, 5000);

    } catch (err) {
        console.error(err);
    }
};

run();