# Projeto de Atividades do Curso BFD - SOFTEX

Este repositório contém os exercícios e projetos desenvolvidos durante o curso BFD da SOFTEX.

## Estrutura do Projeto

O projeto foi organizado em pastas, onde cada uma representa uma aula ou um tópico específico abordado durante o curso. A estrutura é a seguinte:

- **/aula02**: Contém scripts relacionados a operadores matemáticos básicos.
  - `operadores.js`: Demonstração de média, raiz quadrada e a fórmula de Bhaskara.
- **/aula03**: Focado em Arrays e laços de repetição.
  - `arrayLrepetição.js`: Script refatorado que calcula a média de notas usando um array e também resolve a fórmula de Bhaskara, agora dentro de funções.
- **/aula04**: Implementação de uma calculadora simples.
  - `calculadora.js`: Calculadora de linha de comando que utiliza `switch case` para as operações.
- **/aula05**: Script de cadastro de usuário com persistência de dados.
  - `cadastro.js`: Sistema de CRUD (Create, Read, Update, Delete) para dados de usuário, com interação via console e salvamento dos dados em um arquivo `dados.json`.

## Registro de Alterações

### Data: 25 de Julho de 2024

**1. Reorganização Estrutural:**
   - O repositório foi reestruturado para uma melhor organização. Os arquivos de script, que antes estavam na raiz do projeto, foram movidos para pastas correspondentes às suas respectivas aulas (`aula02`, `aula03`, `aula04`, `aula05`).
   - Esta mudança visa facilitar a navegação e o entendimento da progressão do curso.

**2. Melhorias no Código:**
   - **`aula03/arrayLrepetição.js`**:
     - O cálculo da média, que antes usava variáveis separadas, foi refatorado para usar um `Array` de notas. Isso torna o código mais limpo e escalável.
     - A lógica de Bhaskara foi encapsulada em uma função `resolverBhaskara(a, b, c)`, melhorando a reutilização e a clareza.
     - Foram adicionados tratamentos para casos específicos, como o delta negativo em Bhaskara.
   - **`aula05/cadastro.js`**:
     - Adicionada a funcionalidade de persistência de dados. Agora, os dados do cadastro são salvos em um arquivo `dados.json` e carregados quando o programa inicia.
     - O código foi modularizado com a criação de funções específicas para cada operação do CRUD (criar, ler, atualizar, deletar).
     - Implementadas funções de formatação e validação para campos como CPF, RG, CEP e Telefone, melhorando a experiência do usuário e a consistência dos dados.

**3. Documentação:**
   - Criação deste arquivo `README.md` para documentar a estrutura do projeto e registrar as principais mudanças realizadas.
   - Adição de comentários JSDoc nos scripts para explicar o propósito de cada função e bloco de código.
