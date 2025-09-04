

let readline = require ("readline-sync");

let nome = readline.question("Qual é o seu nome? ");

switch (nome) {
    case "Eron":
        console.log("O seu nome é Eron!");
        console.log("Eu to aqui!");
        break;
    default:
        console.log("Olá! Eu não te conheço, " + nome + ".");
        break;
}