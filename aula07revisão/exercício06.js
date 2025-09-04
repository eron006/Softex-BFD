//Exercício 6: Construção de tabuada:
// instrução:
// 1 - Usando laços de repetição aninhados (um laço for dentro de outro), crie um programa que imprima as tabuadas de multiplicação do 2 até o número 9.
// 2 - O programa deve imprimir cada tabuada em uma linha separada, começando de (número) x 1 até (número) x 10.

// Laço externo que itera do número 2 até o 9 (para cada tabuada)
for (let i = 2; i <= 9; i++) {
  // Imprime um título para cada tabuada, para melhor organização
  console.log(`\n--- Tabuada do ${i} ---`);

  // Laço interno que itera do 1 ao 10 (para cada multiplicador)
  for (let j = 1; j <= 10; j++) {
    // Imprime a linha da tabuada no formato "i x j = resultado"
    console.log(`${i} x ${j} = ${i * j}`);
  }
}