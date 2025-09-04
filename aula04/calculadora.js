/**
  Atividade: Calculadora com Switch Case
  Este script implementa uma calculadora básica que opera com dois números.
 O usuário escolhe a operação desejada (soma, subtração, multiplicação, divisão)
 */

const readlineSync = require('readline-sync');

console.log('--- Calculadora Simples ---');

// 1. Solicitar os números
const num1 = readlineSync.questionFloat('Digite o primeiro numero: ');
const num2 = readlineSync.questionFloat('Digite o segundo numero: ');

// 2. Apresentar as opções de operação
const operacoes = ['Soma', 'Subtracao', 'Multiplicacao', 'Divisao'];
const index = readlineSync.keyInSelect(operacoes, 'Qual operacao voce deseja realizar?');

let resultado;
let operacaoRealizada = true;

// 3. Utilizar o switch case para realizar o cálculo
switch (index) {
    case 0: // Soma
        resultado = num1 + num2;
        console.log(`\nO resultado de ${num1} + ${num2} é: ${resultado}`);
        break;

    case 1: // Subtração
        resultado = num1 - num2;
        console.log(`\nO resultado de ${num1} - ${num2} é: ${resultado}`);
        break;

    case 2: // Multiplicação
        resultado = num1 * num2;
        console.log(`\nO resultado de ${num1} * ${num2} é: ${resultado}`);
        break;

    case 3: // Divisão
        // Verifica se o segundo número é zero para evitar erro de divisão por zero
        if (num2 !== 0) {
            resultado = num1 / num2;
            console.log(`\nO resultado de ${num1} / ${num2} é: ${resultado}`);
        } else {
            console.log('\nErro: Não é possível dividir por zero.');
            operacaoRealizada = false; // Adiciona esta linha para indicar que a operação falhou
        }
        break;

    default: // Caso o usuário cancele a seleção
        console.log('\nOperação cancelada pelo usuário.');
        operacaoRealizada = false;
        break;
}

if (operacaoRealizada) {
    console.log('--- Fim do cálculo ---');
}