// c:\node.js\aula07\exercício02.js

// 1. Importamos o módulo 'readline' para lidar com a entrada do terminal.
const readline = require('readline');

// 2. Criamos a interface para ler do teclado (input) e escrever no console (output).
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 3. Criamos o array vazio.
const minhaListaDeTarefas = [];

console.log("Por favor, insira suas 3 tarefas.");

// 4. Fazemos a primeira pergunta. O código dentro de (resposta) => { ... } só executa DEPOIS que o usuário responde.
rl.question('Digite a primeira tarefa: ', (tarefa1) => {
  // Adicionamos a resposta ao array.
  minhaListaDeTarefas.push(tarefa1);

  // 5. Dentro da primeira resposta, fazemos a segunda pergunta.
  rl.question('Digite a segunda tarefa: ', (tarefa2) => {
    minhaListaDeTarefas.push(tarefa2);

    // 6. E finalmente, a terceira pergunta.
    rl.question('Digite a terceira tarefa: ', (tarefa3) => {
      minhaListaDeTarefas.push(tarefa3);

      // 7. Agora que temos todas as tarefas, imprimimos o resultado.
      console.log("\nObrigado! Sua lista de tarefas completa é:");
      console.log(minhaListaDeTarefas);

      // 8. Fechamos a interface para o programa poder encerrar.
      rl.close();
    });
  });
});