exports.handler = async function (event, context) {
    console.info('Remaining time', context.getRemainingTimeInMillis());
    console.info('Function name: ', context.functionName);
    console.info('Request id: ', context.awsRequestId);

    console.warn("this is a warning");

    throw new Exception("This is an exception");

    // const body = `
    // Function name: ${context.functionName}
    // LogStream name: ${context.logStreamName}
    // `;

    // return body;
};