const express = require('express');
const mat = require('./util/calculadora');
const calculadora = require('./util/calculadora');

const app = express();


app.get('/somar/:a/:b', (req, res) => {
    const resultado = calculadora.somar(req.params.a, req.params.b);
    res.send(resultado.toString());
});

app.get('/subtrair/:a/:b', (req, res) => {
    const resultado = calculadora.subtrair(req.params.a, req.params.b);
    res.send(resultado.toString());
});

app.get('/multiplicar/:a/:b', (req, res) => {
    const resultado = calculadora.multplicar(req.params.a, req.params.b);
    res.send(resultado.toString());
});

app.get('/dividir/:a/:b', (req, res) => {
    const resultado = calculadora.dividir(req.params.a, req.params.b);
    res.send(resultado.toString());
});

const PORT = 8080;
app.listen(PORT, function() {
    console.log('App rodando na porta ' + PORT);
});