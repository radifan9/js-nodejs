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

const getDogPic = async () => {
  try {
    // Get the breed name
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    // Get the dog image from API call
    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    // Write the dog img URL to a text
    await writeFilePro("dog-img.txt", res.body.message);
    console.log("Random dog image saved to file!");
  } catch (err) {
    // If there's an error
    console.log(err);
  }
};

getDogPic();
