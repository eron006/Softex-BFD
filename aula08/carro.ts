class Carro {

    public marca : string
    public cor : string
    public placa : string
    public modelo : string
    public ano : number

    constructor(marca: string, cor: string, placa: string, modelo: string, ano: number){
        this.marca = marca;
        this.cor = cor;
        this.placa = placa;
        this.modelo = modelo;
        this.ano = ano;
    }
 
    ligar (){
        console.log("carro ligado")
    }
    desligar (){
        console.log("carro desligado")
    }
 
}

const carro1 = new Carro ("Fiat", "rosa", "PIG1234", "Mobi", 2024);
const carro2 = new Carro("Tesla", "Preto", "BAT2023", "Model S", 2023);
const carro3 = new Carro("Volkswagen", "Branco", "GOL9876", "Gol", 2022);

carro1.ligar();
console.log(`A placa do carro é: ${carro1.placa}`);
carro1.desligar();

console.log("\n--------------------\n");

carro2.ligar();
console.log(`A placa do carro é: ${carro2.placa}`);
carro2.desligar();

console.log("\n--------------------\n");

carro3.ligar();
console.log(`A placa do carro é: ${carro3.placa}`);
carro3.desligar();