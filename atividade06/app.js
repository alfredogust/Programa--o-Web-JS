const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'views')));

// Rota para enviar o arquivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Rota para enviar o arquivo dados.html após o envio do formulário
app.post('/dados', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'dados.html'));
});

const PORT = process.env.PORT || 3019;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
