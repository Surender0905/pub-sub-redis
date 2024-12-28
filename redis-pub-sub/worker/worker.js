// worker process
const redis = require("redis");
const client = redis.createClient();

async function processSubmission(submission) {
    const { problemId, code, language } = JSON.parse(submission);
    console.log({ problemId, code, language });
    ///here you will goes all the processing and logic saving in the database

    //simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000));

    //store in the database
    console.log("finished processing" + problemId);
}

async function worker() {
    try {
        await client.connect();
        console.log("Connected to Redis");

        // process submissions main loop
        while (true) {
            try {
                const submission = await client.brPop("submissions", 0);

                await processSubmission(submission.element);
            } catch (error) {
                console.error("Error processing submission:", error);
                // continue to the next submission
            }
        }
    } catch (error) {}
}

worker();
