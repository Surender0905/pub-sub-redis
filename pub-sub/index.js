import WebSocket, { WebSocketServer } from "ws";
import express from "express";
// import http from "http";

// const server = http.createServer(function (req, res) {
//     console.log(new Date() + " Received request for " + req.url);
//     res.end("Hello World!");
// });
// const wss = new WebSocketServer({ server });

// let userCount = 0;
// wss.on("connection", function connection(ws) {
//     ws.on("error", (error) => console.error(error));
//     ws.on("message", function incoming(message, isBinary) {
//         //when ever a message is received, send it to all the clients
//         wss.clients.forEach(function each(client) {
//             if (client.readyState === WebSocket.OPEN) {
//                 client.send(message, { binary: isBinary });
//             }
//         });
//     });
//     console.log("user count: " + ++userCount);
//     ws.send("hello world from server");
// });

// server.listen(8080, function listening() {
//     console.log(new Date() + " Server is listening on port 8080");
// });

//another way to create a server
const app = express();
const httpServer = app.listen(8080);

const wss = new WebSocketServer({ server: httpServer });

app.get("/", function (req, res) {
    res.send("Hello World!");
});
let userCount = 0;
wss.on("connection", function connection(ws) {
    ws.on("error", console.error);
    ws.on("message", function incoming(data, isBinary) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
    console.log("user count: " + ++userCount);
    ws.send("hello");
});
