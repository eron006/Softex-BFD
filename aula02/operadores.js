/**
  Atividade: Operadores Matemáticos em JavaScript
  Este script demonstra operações básicas como média, raiz quadrada e a fórmula de Bhaskara.
 */

// --- Parte 1: Média de 4 notas ---

// Declara as 4 notas.
let n1 = 7;
let n2 = 5;
let n3 = 10;
let n4 = 10;

// Soma as notas.
let soma = n1 + n2 + n3 + n4;

// Calcula a média dividindo a soma pelo número de notas.
let media = soma / 4;
console.log("A média do aluno é:", media);

// --- Parte 2: Raiz Quadrada ---

// Calcula a raiz quadrada da média.
let raizDaMedia = Math.sqrt(media);
console.log("A raiz quadrada da média é:", raizDaMedia);

console.log("--------------------");

// --- Parte 3: Fórmula de Bhaskara ---

// Define os coeficientes a, b, e c.
let a = 1;
let b = -5;
let c = 6;

// Calcula o delta.
const delta = (b * b) - (4 * a * c);

// Calcula as raízes x1 e x2.
const x1 = (-b + Math.sqrt(delta)) / (2 * a);
const x2 = (-b - Math.sqrt(delta)) / (2 * a);

console.log("O valor de x1 é:", x1);
console.log("O valor de x2 é:", x2);