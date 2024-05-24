const express = require('express');
const path = require('path');
const calculadoraRoutes = require('./src/routes/calculadoraRoutes');

const app = express();
const PORT = 3001;

// Configuração para usar arquivos estáticos (HTML, CSS, etc.) na pasta 'views'
app.use(express.static(path.join(__dirname, 'src/views')));

// Configuração para usar o body-parser (para lidar com dados de formulários)
app.use(express.urlencoded({ extended: true }));

// Configurar o EJS como motor de template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views')); 

// Usando as rotas definidas em calculadoraRoutes
app.use('/', calculadoraRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});