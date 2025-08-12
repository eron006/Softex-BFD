// --- Parte 1: Cálculo da Média ---
// Declaração das variáveis com as notas.
let n1 = 7
let n2 = 5 
let n3 = 10 
let n4 = 10 

// Função que calcula a média.
function calcularMedia(nota1, nota2, nota3, nota4) {
    return (nota1 + nota2 + nota3 + nota4) / 4;
}

let media = calcularMedia(n1, n2, n3, n4);
console.log("A média do aluno é:", media);

// --- Parte 2: Teste com Raiz Quadrada ---
let numeroTeste = Math.sqrt(9)
console.log("O teste da raiz quadrada de 9 é:", numeroTeste);

console.log("--------------------"); // Separador para clareza

// --- Parte 3: Fórmula de Bhaskara (ax² + bx + c = 0) ---
// Esta função calcula e imprime o resultado de Bhaskara diretamente no console.
function resolverBhaskara(a, b, c) {
    console.log(`Resolvendo Bhaskara para a=${a}, b=${b}, c=${c}`);
    const delta = (b * b) - (4 * a * c);

    if (delta < 0) {
        console.log(`O Delta é ${delta}. Como é negativo, a equação não possui raízes reais.`);
    } else {
        const raizDeDelta = Math.sqrt(delta);
        const x1 = (-b + raizDeDelta) / (2 * a);
        const x2 = (-b - raizDeDelta) / (2 * a);
        console.log("O valor de x1 é:", x1);
        console.log("O valor de x2 é:", x2);
    }
}

// Agora, chamamos a função com os valores que queremos testar.
// Teste 1: Delta negativo (sem raízes reais)
resolverBhaskara(10, 20, 30);

console.log("--------------------");

// Teste 2: Delta positivo (com duas raízes reais)
resolverBhaskara(1, -5, 6);

// --- Exportação para Testes ---
// Disponibiliza as funções para outros arquivos (como nossos testes).
// Isso não afeta a execução do script no navegador.
module.exports = { calcularMedia, resolverBhaskara };
