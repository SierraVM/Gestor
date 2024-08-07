const express = require('express');
const crypto = require('crypto');

const app = express();
app.use(express.json());

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encryptPassword(password) {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(password);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

app.get('/', (req, res) => {
    res.send('Welcome to the Password Manager');
});

app.post('/save-password', (req, res) => {
    const { password } = req.body;
    const encryptedPassword = encryptPassword(password);
    res.send({ encryptedPassword });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

