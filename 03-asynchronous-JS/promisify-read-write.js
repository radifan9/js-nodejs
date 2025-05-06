"use strict";

const fs = require("node:fs");
const superagent = require("superagent");

// Building promise
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    // Do asynchronous work
    fs.readFile(file, (err, data) => {
      // REJECT FUNCTION
      if (err) reject("I could not find that file 😭");

      // RESOLVE FUNCTION
      resolve(data);
    });
  });
};

const writeFilePro = (fileName, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, (err) => {
      if (err) reject("Could not write file 😭");
      resolve("success");
    });
  });
};

// Use promises
readFilePro(`${__dirname}/doggg.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);

    return (
      superagent
        // Making a GET request for a random dog image according to breed name
        .get(`https://dog.ceo/api/breed/${data}/images/random`)
    );
  })

  // Handle fulfilled promise
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro("dog-img.txt", res.body.message);
  })

  // When dog image saved
  .then(() => {
    console.log("Random dog image saved to file!");
  })

  // Handle rejected promise
  .catch((err) => {
    console.log("This is rejected promise");
    console.log(err);
  });
