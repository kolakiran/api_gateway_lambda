exports.handler = async (event) => {
    console.log("Event: ", event);
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Hello World from lambda" }),
    };
};
