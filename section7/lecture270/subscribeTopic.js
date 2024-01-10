import { SubscribeCommand } from "@aws-sdk/client-sns";
import { snsClient } from "./snsClient.js";

const params = {
    TopicArn: 'arn:aws:sns:ap-southeast-1:525060345766:new-topic',
    Protocol: 'email',
    Endpoint: 'erickmwarama@gmail.com'
};

export const run = async () => {
    try {
        const data = await snsClient.send(new SubscribeCommand(params));
        console.log("Success", data);
    } catch (err) {
        console.log("Error", err);
    }
};

run();