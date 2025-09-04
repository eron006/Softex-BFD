// --- Parte 1: Cálculo da Média ---
// Declaração das notas usando um Array.
// Com um array, podemos facilmente adicionar ou remover notas.
const notas = [7, 5, 10, 10];

// Função refatorada para calcular a média de um array de notas.
function calcularMedia(arrayDeNotas) {
    // Se o array estiver vazio, retornamos 0 para evitar divisão por zero.
    if (arrayDeNotas.length === 0) {
        return 0;
    }

    let somaDasNotas = 0;
    // Usamos um laço de repetição 'for...of' para somar cada nota do array.
    for (const nota of arrayDeNotas) {
        somaDasNotas += nota;
    }

    // A média é a soma dividida pela quantidade de notas.
    return somaDasNotas / arrayDeNotas.length;
}

const media = calcularMedia(notas);
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
