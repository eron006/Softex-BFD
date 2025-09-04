class Celular {
    // 1. Propriedades da classe
    public marca: string;
    public modelo: string;
    public so: string; // Sistema Operacional
    public memoria: string;
    public camera: string;

    // 2. Construtor: "molde" para criar novos objetos Celular
    constructor(marca: string, modelo: string, so: string, memoria: string, camera: string) {
        this.marca = marca;
        this.modelo = modelo;
        this.so = so;
        this.memoria = memoria;
        this.camera = camera;
    }
 
    // 3. Métodos: ações que o celular pode realizar
    ligar() {
        console.log(`O ${this.marca} ${this.modelo} está ligando...`);
    }
 
    fazerLigacao(numero: string) {
        console.log(`Ligando para  do seu ${this.marca}...`);
    }
 
    fotografar() {
        console.log(`Tirando uma foto com a câmera de ${this.camera}.`);
    }
 
    instalarApp(nomeApp: string) {
        console.log(`Instalando "" no seu ${this.modelo} com ${this.memoria} de memória.`);
    }
 
    desligar() {
        console.log(`Desligando o ${this.marca} ${this.modelo}.`);
    }
}

// 4. Criando 3 objetos (instâncias) da classe Celular
const celular1 = new Celular("Samsung", "Galaxy S23", "Android", "256GB", "200MP");
const celular2 = new Celular("Apple", "iPhone 15", "iOS", "128GB", "48MP");
const celular3 = new Celular("Xiaomi", "Redmi Note 12", "Android", "128GB", "50MP");

// 5. Usando os objetos criados
console.log(`--- Celular 1: ${celular1.modelo} ---`);
celular1.ligar();
celular1.fotografar();
celular1.desligar();

console.log(`\n--- Celular 2: ${celular2.modelo} ---`);
celular2.fazerLigacao("99999-8888");

console.log(`\n--- Celular 3: ${celular3.modelo} ---`);
celular3.instalarApp("WhatsApp");
