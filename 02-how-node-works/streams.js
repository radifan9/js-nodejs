"use strict";

const fs = require("node:fs");
const server = require("node:http").createServer();

// Setup an event listener
server.on("request", (req, res) => {
  // Solution 3
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
  // Explaination --> readableSource.pipe(writableDestination)
});

// Start server
server.listen({ host: "127.0.0.1", port: 8000 }, () => {
  console.log("Listening...");
});
