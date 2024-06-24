// Import inquirer library package - https://www.npmjs.com/package/inquirer
import inquirer from "inquirer";
// Import the qr-image library package -https://www.npmjs.com/package/qr-image
import qr from "qr-image"
// Importing the File system module from Node.js - https://nodejs.org/docs/latest/api/fs.html
import fs from "fs";

// 1. Use the inquirer npm package to get the desired prompted user input.
inquirer
    .prompt([{
        /* Create a question object which will contain the question related values */
        message: "Type in your URL (Uniform Resource Locator):",
        name: "URL"
    }])
    // Successful user feedback from the prompt message is then brokendown from the configuration object.
    .then((answers) => {
        //re-variable the respone as the user entered URL from the callback variable.
        const url = answers.URL;
        // the QRCode is generated using the qr.image method i.e https://www.npmjs.com/package/qr-image
        const qr_svg = qr.image(url);
        // A png file is created, containg the URL as an QR-code image.
        qr_svg.pipe(fs.createWriteStream('nodeQR_image.png'));
    })
    .catch((error) => {
        if (error.isTtyError) {
            console.log("Error: Prompt could not execute");
        } else {
            console.log("Error:".error);
        }
    })