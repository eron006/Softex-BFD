/**
 * Script para cadastro de dados pessoais com funcionalidades CRUD (Create, Read, Update, Delete).
 * Utiliza o readline-sync para interação com o usuário no console.
 */

const readlineSync = require('readline-sync');

// Objeto para armazenar os dados do usuário. Funciona como nosso "banco de dados" em memória.
let dadosPessoais = {};

// Função para verificar se existem dados cadastrados
function existemDados() {
    // Object.keys(obj).length retorna o número de chaves (propriedades) em um objeto.
    // Se for 0, o objeto está vazio.
    return Object.keys(dadosPessoais).length > 0;
}

/**
 * Função para verificar a maioridade com base na data de nascimento.
 * @param {string} dataNascimentoStr - A data de nascimento no formato "DD/MM/AAAA".
 */
function verificarMaioridade(dataNascimentoStr) {
    const partesData = dataNascimentoStr.split('/');
    if (partesData.length !== 3) return; // Ignora se o formato for inválido

    const dia = parseInt(partesData[0], 10);
    const mes = parseInt(partesData[1], 10) - 1; // Mês é 0-indexado em JS
    const ano = parseInt(partesData[2], 10);

    const dataNascimento = new Date(ano, mes, dia);
    // Validação para datas inválidas (ex: 31/02/2000) que o `new Date` corrige automaticamente.
    if (dataNascimento.getFullYear() !== ano || dataNascimento.getMonth() !== mes || dataNascimento.getDate() !== dia) {
        console.log('\nAVISO: A data de nascimento fornecida parece ser inválida.');
        return;
    }

    const hoje = new Date();

    // Calcula a idade
    let idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const m = hoje.getMonth() - dataNascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < dataNascimento.getDate())) {
        idade--;
    }

    if (idade >= 18) {
        console.log("\nAVISO: Por ser maior de idade, você é civilmente responsável por seus atos, conforme o Código Civil Brasileiro.");
    } else {
        const aniversario18 = new Date(ano + 18, mes, dia);
        let anosFaltantes = aniversario18.getFullYear() - hoje.getFullYear();
        let mesesFaltantes = aniversario18.getMonth() - hoje.getMonth();
        let diasFaltantes = aniversario18.getDate() - hoje.getDate();

        if (diasFaltantes < 0) {
            mesesFaltantes--;
            diasFaltantes += new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0).getDate();
        }
        if (mesesFaltantes < 0) {
            anosFaltantes--;
            mesesFaltantes += 12;
        }
        console.log(`\nAVISO: Faltam ${anosFaltantes} ano(s), ${mesesFaltantes} mes(es) e ${diasFaltantes} dia(s) para você atingir a maioridade.`);
        console.log("Seus pais ou responsáveis legais respondem por seus atos até lá.");
    }
}

/**
 * Função para CRIAR (Create) os dados, solicitando um por um.
 */
function criarDados() {
    console.log('\n--- Início do Cadastro ---');
    dadosPessoais.nomeCompleto = readlineSync.question('Nome Completo: ');
    dadosPessoais.dataNascimento = readlineSync.question('Data de Nascimento (DD/MM/AAAA): ');
    verificarMaioridade(dadosPessoais.dataNascimento); // Chamada da nova função
    dadosPessoais.rg = readlineSync.question('RG: ');
    dadosPessoais.cpf = readlineSync.question('CPF: ');
    dadosPessoais.telefone = readlineSync.question('Telefone: ');
    dadosPessoais.email = readlineSync.questionEMail('Digite seu e-mail: ');
    dadosPessoais.enderecoCompleto = readlineSync.question('Endereco Completo: ');
    dadosPessoais.tipoSanguineo = readlineSync.question('Tipo Sanguineo: ');
    dadosPessoais.escolaridade = readlineSync.question('Escolaridade: ');
    dadosPessoais.profissao = readlineSync.question('Profissao: ');
    dadosPessoais.estadoCivil = readlineSync.question('Estado Civil: ');
    console.log('\n--- Cadastro Concluído ---\n');
}

/**
 * Função para LER (Read) os dados, exibindo-os de forma organizada.
 */
function lerDados() {
    if (!existemDados()) {
        console.log('\nNenhum dado cadastrado para exibir.\n');
        return;
    }
    console.log('\n--- Dados Cadastrados ---');
    console.log(`Nome Completo: ${dadosPessoais.nomeCompleto}`);
    console.log(`Data de Nascimento: ${dadosPessoais.dataNascimento}`);
    console.log(`RG: ${dadosPessoais.rg} | CPF: ${dadosPessoais.cpf}`);
    console.log(`Telefone: ${dadosPessoais.telefone}`);
    console.log(`E-mail: ${dadosPessoais.email}`);
    console.log(`Endereço: ${dadosPessoais.enderecoCompleto}`);
    console.log(`Tipo Sanguíneo: ${dadosPessoais.tipoSanguineo}`);
    console.log(`Escolaridade: ${dadosPessoais.escolaridade}`);
    console.log(`Profissão: ${dadosPessoais.profissao}`);
    console.log(`Estado Civil: ${dadosPessoais.estadoCivil}`);
    console.log('-------------------------\n');
}

/**
 * Função para ATUALIZAR (Update) um campo específico.
 */
function atualizarDados() {
    if (!existemDados()) {
        console.log('\nNenhum dado cadastrado para editar.\n');
        return;
    }

    lerDados(); // Mostra os dados atuais antes de editar

    const campos = [
        'nomeCompleto',
        'dataNascimento',
        'rg',
        'cpf',
        'telefone',
        'email',
        'enderecoCompleto',
        'tipoSanguineo',
        'escolaridade',
        'profissao',
        'estadoCivil'
    ];
    const index = readlineSync.keyInSelect(campos, 'Qual campo voce deseja editar?');

    if (index === -1) {
        console.log('\nOperação de edição cancelada.\n');
        return;
    }

    const campoSelecionado = campos[index];
    const valorAntigo = dadosPessoais[campoSelecionado];
    const novoValor = readlineSync.question(`Digite o novo valor para "${campoSelecionado}" (valor atual: ${valorAntigo}): `);

    // Atualiza o valor no nosso objeto de dados.
    dadosPessoais[campoSelecionado] = novoValor;

    console.log('\nInformação atualizada com sucesso!');
    lerDados(); // Mostra os dados atualizados.
}

/**
 * Função para DELETAR (Delete) todos os dados.
 */
function deletarDados() {
    if (!existemDados()) {
        console.log('\nNenhum dado cadastrado para apagar.\n');
        return;
    }

    if (readlineSync.keyInYN('Tem certeza que deseja apagar todos os dados?')) {
        dadosPessoais = {}; // Esvazia o objeto, apagando os dados.
        console.log('\nDados apagados com sucesso.\n');
    } else {
        console.log('\nOperação cancelada.\n');
    }
}

// --- Menu Principal do Script ---
function main() {
    while (true) {
        const opcoes = [
            'Cadastrar/Sobrescrever Dados',
            'Ver Dados Cadastrados',
            'Editar um Campo',
            'Apagar Todos os Dados'
        ];
        const index = readlineSync.keyInSelect(opcoes, 'O que voce deseja fazer?', { cancel: 'Sair' });

        switch (index) {
            case 0:
                criarDados();
                break;
            case 1:
                lerDados();
                break;
            case 2:
                atualizarDados();
                break;
            case 3:
                deletarDados();
                break;
            default: // O usuário escolheu 'Sair' ou pressionou ESC
                console.log('\n--- Programa finalizado. Obrigado! ---');
                return; // Encerra a função main e o script
        }
    }
}

main(); // Inicia o programa