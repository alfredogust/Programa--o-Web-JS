exports.calcular = (num1, num2, operador) => {
  switch (operador) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      return num1 / num2;
    default:
      return 'Operação inválida!';
  }
};

exports.getNomeOperacao = (operador) => {
  switch (operador) {
    case '+':
      return 'Adição';
    case '-':
      return 'Subtração';
    case '*':
      return 'Multiplicação';
    case '/':
      return 'Divisão';
    default:
      return 'Operação inválida!';
  }
};