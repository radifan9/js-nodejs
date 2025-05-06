"use strict";

const fs = require("node:fs");
const superagent = require("superagent");

// Build read promise
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      // Reject
      if (err) reject("I could not find that file 😭");

      // Resolve
      resolve(data);
    });
  });
};

// Build write promise
const writeFilePro = (fileName, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, (err) => {
      if (err) reject("Could not write file 😭");
      resolve("success");
    });
  });
};

// Use promise
const getDogPic = async () => {
  try {
    // Get the dog breed name
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    // Get dog image URL from API call
    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    // Write the dog image URL to a text
    await writeFilePro("dog-img.txt", res.body.message);
    console.log("Random dog image saved to file!");
  } catch (err) {
    // Error handling
    console.log(err);
  }
  return `2: READY 🐶`;
};

console.log(`1: Will get dog pics!`);
getDogPic().then((x) => {
  console.log(x);
  console.log(`3: Done getting dog pics!`);
});
