"use strict";

const fs = require("node:fs");
const superagent = require("superagent");

// Reading dog breed name from a file
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`);

  superagent
    // Making a GET request for a random dog image according to breed name
    .get(`https://dog.ceo/api/breed/${data}/images/random`)

    // Handle fulfilled promise
    .then((res) => {
      console.log(res.body.message);

      // Save the received random dog URL to a file
      fs.writeFile("dog-img.txt", res.body.message, (err) => {
        // Error handling when saving file to local
        if (err) return console.log(err.message);
        console.log("Random dog image saved to file!");
      });
    })

    // Handle rejected promise
    .catch((err) => {
      console.log(err.message);
    });
});
