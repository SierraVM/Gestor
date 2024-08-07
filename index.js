const fs = require('fs');
const crypto = require('crypto');

// Function to encrypt a password
function encryptPassword(password) {
  const algorithm = 'aes-256-ctr';
  const secretKey = 'my-secret-key';
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encryptedPassword = Buffer.concat([cipher.update(password), cipher.final()]);

  return iv.toString('hex') + ':' + encryptedPassword.toString('hex');
}

// Function to decrypt a password
function decryptPassword(hash) {
  const [iv, encryptedPassword] = hash.split(':');
  const algorithm = 'aes-256-ctr';
  const secretKey = 'my-secret-key';

  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));
  const decryptedPassword = Buffer.concat([decipher.update(Buffer.from(encryptedPassword, 'hex')), decipher.final()]);

  return decryptedPassword.toString();
}

// Function to save a password
function savePassword(name, password) {
  const encryptedPassword = encryptPassword(password);
  fs.writeFileSync(`./passwords/${name}.txt`, encryptedPassword);
  console.log('Password saved!');
}

// Function to get a password
function getPassword(name) {
  const encryptedPassword = fs.readFileSync(`./passwords/${name}.txt`, 'utf8');
  const decryptedPassword = decryptPassword(encryptedPassword);
  console.log(`Password for ${name}: ${decryptedPassword}`);
}

// Example usage
savePassword('example', 'mypassword');
getPassword('example');
