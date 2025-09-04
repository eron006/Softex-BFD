class Pessoas {

    public nome : string  
    private rg : string  
    private cpf : string;
    public dataNascimento : string
    public endereco:string

    constructor(nome: string, rg: string, cpf: string, dataNascimento: string, endereco: string) {
        this.nome = nome;
        this.rg = rg;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.endereco = endereco;
    }

    acordar(){
        console.log(`${this.nome} acordou.`);
    }
    estudar(){
        console.log(`${this.nome} está estudando.`);
    }
    descansar(){
        console.log(`${this.nome} foi descansar.`);
    }
    trabalhar(){
        console.log(`${this.nome} está trabalhando.`);
    }
    comer (){
        console.log(`${this.nome} foi comer.`);
    }
    dormir (){
        console.log(`${this.nome} foi dormir.`);
    }
}

// Criando 3 objetos da classe Pessoas
const pessoa1 = new Pessoas("João Silva", "12.345.678-9", "123.456.789-00", "15/05/1990", "Rua das Flores, 123");
const pessoa2 = new Pessoas("Maria Oliveira", "98.765.432-1", "987.654.321-11", "20/11/1985", "Avenida Brasil, 456");
const pessoa3 = new Pessoas("Carlos Souza", "11.222.333-4", "111.222.333-44", "01/02/2000", "Praça da Sé, 789");

console.log(`--- Ações de ${pessoa1.nome} ---`);
pessoa1.acordar();
pessoa1.trabalhar();
pessoa1.dormir();

console.log(`\n--- Ações de ${pessoa2.nome} ---`);
pessoa2.estudar();

console.log(`\n--- Ações de ${pessoa3.nome} ---`);
pessoa3.comer();
pessoa3.descansar();