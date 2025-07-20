const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const ENCRYPTION_KEY = crypto.randomBytes(32); // or use process.env.ENCRYPTION_KEY
const IV_LENGTH = 16;

const encryptFile = (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);

    const input = fs.createReadStream(inputPath);
    const output = fs.createWriteStream(outputPath);

    input.pipe(cipher).pipe(output);

    output.on('finish', () => {
      resolve();
    });

    output.on('error', reject);
  });
};

module.exports = encryptFile;
