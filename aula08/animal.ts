class Urso{
    public pelagem:string;
    public peso:number; // Alterado para number
    public raca:string;
    public altura:number; // Alterado para number
    public cor:string;
    public idade:number; // Alterado para number
    public sexo:string;
    public nome:string;

    constructor(nome: string, raca: string, cor: string, idade: number, peso: number, altura: number, sexo: string) {
        this.nome = nome;
        this.raca = raca;
        this.cor = cor;
        this.idade = idade;
        this.peso = peso;
        this.altura = altura;
        this.sexo = sexo;
        this.pelagem = "Longa e densa"; // Valor padrão
    }

    cacar(){
        console.log(`${this.nome} está caçando peixes no rio.`);
    }
    comer(){
        console.log(`${this.nome} está comendo mel.`);
    }
    dormir(){
        console.log(`${this.nome} está hibernando em sua caverna. ZzZzZ...`);
    }
    nadar(){
        console.log(`${this.nome} está nadando.`);
    }
}

// Criando 3 objetos da classe Urso
const urso1 = new Urso("Zeca", "Pardo", "Marrom", 10, 500, 2.5, "Macho");
const urso2 = new Urso("Panda", "Panda Gigante", "Preto e Branco", 5, 120, 1.8, "Fêmea");
const urso3 = new Urso("Polar", "Polar", "Branco", 8, 600, 3.0, "Macho");

console.log(`--- Conhecendo ${urso1.nome} ---`);
console.log(`Raça: ${urso1.raca}, Idade: ${urso1.idade} anos`);
urso1.cacar();
urso1.dormir();

console.log(`\n--- Conhecendo ${urso2.nome} ---`);
console.log(`Raça: ${urso2.raca}, Peso: ${urso2.peso}kg`);
urso2.comer();

console.log(`\n--- Conhecendo ${urso3.nome} ---`);
console.log(`Raça: ${urso3.raca}, Altura: ${urso3.altura}m`);
urso3.nadar();