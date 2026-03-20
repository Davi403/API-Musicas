const express = require('express');
const app = express();
const musicaRoutes = require('./routes/musicaRoutes');

app.use(express.json());

app.use('/musicas', musicaRoutes);

app.listen(3000, () => {
    console.log('Servidor iniciado em http://localhost:3000');
});