const calculadora = require('../calculadora');

exports.exibirFormulario = (req, res) => {
  res.render('index', { error: req.query.erro });
};

exports.calcular = (req, res) => {
  const num1 = parseFloat(req.body.num1);
  const num2 = parseFloat(req.body.num2);
  const operador = req.body.operador;

  if (isNaN(num1) || isNaN(num2)) {
    return res.redirect('/?erro=Valores inválidos!');
  }

  const resultado = calculadora.calcular(num1, num2, operador);
  const nomeOperacao = calculadora.getNomeOperacao(operador);

  res.render('resultado', { resultado, nomeOperacao });
};