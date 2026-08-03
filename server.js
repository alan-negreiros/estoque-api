const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
const app = express();

app.use(express.json());
app.use('/api/usuarios', userRoutes);

app.listen(3000, () => console.log('API rodando na porta 3000'));