"use strict";

const express = require("express");

const app = express();

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
