const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Conexión a MongoDB
mongoose.connect('mongodb://mongo:27017/passwordManager', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Conectado a MongoDB');
}).catch(err => {
    console.error('Error de conexión a MongoDB:', err);
});

// Modelo de Contraseña
const Password = mongoose.model('Password', new mongoose.Schema({
    site: String,
    username: String,
    password: String,
}));

const app = express();
app.use(express.json());

// Servir contenido estático (HTML, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para mostrar el gestor de contraseñas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rutas para la API
app.post('/passwords', async (req, res) => {
    const password = new Password(req.body);
    await password.save();
    res.send(password);
});

app.get('/passwords', async (req, res) => {
    const passwords = await Password.find();
    res.send(passwords);
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});

