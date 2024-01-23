export const handler = async (event) => {
    console.log("Received event", JSON.stringify(event, undefined, 2));

    event.Records.forEach(async (record) => {
      console.log(`Record: ${record}`);

      console.log('Table event', record.eventName);
      console.log('Updated user id', record.dynamodb.NewImage.user_id);
    });
};
