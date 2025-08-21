
// Atividade de operadores java script:
const readlineSync = require('readline-sync');


// soma entre 04 numeros:
const num1 = readlineSync.questionFloat('Digite o primeiro numero: ');
const num2 = readlineSync.questionFloat('Digite o segundo numero: ');
const num3 = readlineSync.questionFloat('Digite o terceiro numero: ');
const num4 = readlineSync.questionFloat('Digite o quarto numero: ');

const soma = num1 + num2 + num3 + num4;
console.log("O resultado da soma é: " + soma);

// media dos valores somados acima:
const media = soma / 4;
console.log("O resultado da média é: " + media);

//  raiz quadrada do valor da media:
if (media >= 0) {
    const raizQuadrada = Math.sqrt(media);
    console.log("A raiz quadrada da média é: " + raizQuadrada);
} else {
    console.log("Não é possível calcular a raiz quadrada de um número negativo (" + media + ").");
}
