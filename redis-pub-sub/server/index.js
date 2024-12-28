//create a express server
import express from "express";
import { createClient } from "redis";

const app = express();

///middleware
app.use(express.json());

const port = 3000;

const client = createClient();
client.on("error", (err) => console.log("Redis Client Error", err));

//routes
app.get("/", (req, res) => {
    res.send("Hello World!");
});

//routes push data into redis
app.post("/submit", async (req, res) => {
    const { problemId, code, language } = req.body;
    try {
        console.log({ problemId, code, language });
        await client.lPush(
            "submissions",
            JSON.stringify({ problemId, code, language }),
        );
        //store in the database
        res.status(200).send("Data submitted successfully");
    } catch (error) {
        console.error("Error submitting data:", error);
        res.status(500).send("Error submitting data");
    }
});

//start the server
async function startServer() {
    try {
        await client.connect();
        console.log("Connected to Redis");
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    } catch (error) {
        console.error("Error connecting to Redis:", error);
    }
}

startServer();
