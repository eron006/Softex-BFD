// 1. Importamos a função que queremos testar.
const { calcularMedia } = require('./aula03.js');

// 2. 'describe' agrupa testes relacionados. É como um capítulo do nosso livro de testes.
describe('Cálculo da Média', () => {

    // 3. 'test' (ou 'it') define um caso de teste específico.
    test('deve calcular corretamente a média de quatro números inteiros', () => {
        // 4. 'expect' é a nossa asserção. Esperamos que o resultado de calcularMedia(7, 5, 10, 10) SEJA (toBe) 8.
        expect(calcularMedia(7, 5, 10, 10)).toBe(8);
    });
});