/**
 * Script para cadastro de dados pessoais com funcionalidades CRUD (Create, Read, Update, Delete).
 * Utiliza o readline-sync para interação com o usuário no console.
 * Adicionada persistência de dados em arquivo JSON.
 */

const readlineSync = require('readline-sync');
const fs = require('fs'); // Módulo File System para interagir com arquivos

const ARQUIVO_DE_DADOS = 'dados.json'; // Nome do arquivo para salvar os dados

// Objeto para armazenar os dados do usuário. Funciona como nosso "banco de dados" em memória.
let dadosPessoais = {};

/**
 * Funções para formatar CPF, RG e Telefone.
 */
const formatarCPF = (cpf) => cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
const formatarRG = (rg) => {
    // Formato mais comum para 9 dígitos (SP)
    if (rg.length === 9) {
        return rg.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4');
    }
    // Outros estados podem ter formatos diferentes, aqui retornamos sem formatação
    return rg;
};
const formatarTelefone = (tel) => {
    if (tel.length === 11) {
        return tel.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return tel.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
};
const formatarCEP = (cep) => cep.replace(/(\d{5})(\d{3})/, '$1-$2');

/**
 * Pergunta ao usuário, valida a entrada com uma regex e aplica uma máscara.
 * @param {string} prompt - A pergunta para o usuário.
 * @param {RegExp} regexValidacao - A regex para validar a entrada (apenas dígitos).
 * @param {function} funcaoFormatacao - A função que aplica a máscara.
 * @param {string} mensagemErro - A mensagem de erro para entrada inválida.
 * @returns {string} O valor formatado.
 */
function perguntarComMascara(prompt, regexValidacao, funcaoFormatacao, mensagemErro) {
    let input;
    while (true) {
        input = readlineSync.question(prompt).replace(/\D/g, ''); // Pega apenas os dígitos
        if (regexValidacao.test(input)) {
            return funcaoFormatacao(input);
        }
        console.log(mensagemErro);
    }
}

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
    dadosPessoais.rg = perguntarComMascara('RG (apenas numeros): ', /^\d{7,9}$/, formatarRG, 'RG inválido. Deve conter de 7 a 9 números.');
    dadosPessoais.cpf = perguntarComMascara('CPF (apenas numeros): ', /^\d{11}$/, formatarCPF, 'CPF inválido. Deve conter 11 números.');
    dadosPessoais.telefone = perguntarComMascara('Telefone (com DDD, apenas numeros): ', /^\d{10,11}$/, formatarTelefone, 'Telefone inválido. Deve conter 10 ou 11 números.');
    dadosPessoais.email = readlineSync.questionEMail('Digite seu e-mail: ');
    console.log('--- Endereço ---');
    dadosPessoais.rua = readlineSync.question('Nome da Rua: ');
    dadosPessoais.numero = readlineSync.question('Numero: ');
    dadosPessoais.bairro = readlineSync.question('Bairro: ');
    dadosPessoais.cidade = readlineSync.question('Cidade: ');
    dadosPessoais.cep = perguntarComMascara('CEP (apenas numeros): ', /^\d{8}$/, formatarCEP, 'CEP inválido. Deve conter 8 números.');
    dadosPessoais.tipoSanguineo = readlineSync.question('Tipo Sanguineo: ');
    dadosPessoais.escolaridade = readlineSync.question('Escolaridade: ');
    dadosPessoais.profissao = readlineSync.question('Profissao: ');
    dadosPessoais.estadoCivil = readlineSync.question('Estado Civil: ');

    // Novas perguntas do enunciado
    dadosPessoais.temAnimal = readlineSync.keyInYNStrict('Tem animal de estimacao? ');
    if (dadosPessoais.temAnimal) {
        dadosPessoais.quantidadeAnimais = readlineSync.questionInt('Quantos animais tem? ');
    } else {
        dadosPessoais.quantidadeAnimais = 0;
    }
    console.log('\n--- Cadastro Concluído ---\n');
}

/**
 * Função para SALVAR os dados no arquivo JSON.
 */
function salvarDados() {
    // JSON.stringify converte o objeto JavaScript para uma string no formato JSON.
    // O segundo e terceiro argumentos (null, 2) formatam o JSON para ser legível.
    const dadosEmJson = JSON.stringify(dadosPessoais, null, 2);
    fs.writeFileSync(ARQUIVO_DE_DADOS, dadosEmJson, 'utf8');
    console.log('Dados salvos com sucesso em ' + ARQUIVO_DE_DADOS);
}

/**
 * Função para CARREGAR os dados do arquivo JSON.
 */
function carregarDados() {
    if (fs.existsSync(ARQUIVO_DE_DADOS)) {
        const dadosEmJson = fs.readFileSync(ARQUIVO_DE_DADOS, 'utf8');
        dadosPessoais = JSON.parse(dadosEmJson); // JSON.parse converte a string JSON de volta para um objeto.
        console.log('Dados carregados de ' + ARQUIVO_DE_DADOS);
    }
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
    console.log(`Endereço: ${dadosPessoais.rua}, ${dadosPessoais.numero} - ${dadosPessoais.bairro}, ${dadosPessoais.cidade} - CEP: ${dadosPessoais.cep}`);
    console.log(`Tipo Sanguíneo: ${dadosPessoais.tipoSanguineo}`);
    console.log(`Escolaridade: ${dadosPessoais.escolaridade}`);
    console.log(`Profissão: ${dadosPessoais.profissao}`);
    console.log(`Estado Civil: ${dadosPessoais.estadoCivil}`);
    // Log das novas informações
    console.log(`Tem animal de estimação: ${dadosPessoais.temAnimal ? 'Sim' : 'Não'}`);
    if (dadosPessoais.temAnimal) {
        console.log(`Quantidade de animais: ${dadosPessoais.quantidadeAnimais}`);
    }
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
        'rua',
        'numero',
        'bairro',
        'cidade',
        'cep',
        'tipoSanguineo',
        'escolaridade',
        'profissao',
        'estadoCivil',
        'temAnimal',
        'quantidadeAnimais'
    ];
    const index = readlineSync.keyInSelect(campos, 'Qual campo voce deseja editar?');

    if (index === -1) {
        console.log('\nOperação de edição cancelada.\n');
        return;
    }

    const campoSelecionado = campos[index];
    const valorAntigo = dadosPessoais[campoSelecionado];
    let novoValor;

    // Lógica para solicitar o tipo de dado correto e aplicar máscaras
    if (campoSelecionado === 'rg') {
        novoValor = perguntarComMascara(`Novo RG (apenas numeros) (valor atual: ${valorAntigo}): `, /^\d{7,9}$/, formatarRG, 'RG inválido. Deve conter de 7 a 9 números.');
    } else if (campoSelecionado === 'cpf') {
        novoValor = perguntarComMascara(`Novo CPF (apenas numeros) (valor atual: ${valorAntigo}): `, /^\d{11}$/, formatarCPF, 'CPF inválido. Deve conter 11 números.');
    } else if (campoSelecionado === 'telefone') {
        novoValor = perguntarComMascara(`Novo Telefone (com DDD, apenas numeros) (valor atual: ${valorAntigo}): `, /^\d{10,11}$/, formatarTelefone, 'Telefone inválido. Deve conter 10 ou 11 números.');
    } else if (campoSelecionado === 'cep') {
        novoValor = perguntarComMascara(`Novo CEP (apenas numeros) (valor atual: ${valorAntigo}): `, /^\d{8}$/, formatarCEP, 'CEP inválido. Deve conter 8 números.');
    } else if (campoSelecionado === 'temAnimal') {
        novoValor = readlineSync.keyInYNStrict(`Tem animal de estimacao? (valor atual: ${valorAntigo ? 'Sim' : 'Não'}) `);
        if (!novoValor) { // Se o novo valor for Não, zera a quantidade
            dadosPessoais.quantidadeAnimais = 0;
        }
    } else if (campoSelecionado === 'quantidadeAnimais') {
        novoValor = readlineSync.questionInt(`Digite o novo valor para "${campoSelecionado}" (valor atual: ${valorAntigo}): `);
    } else {
        novoValor = readlineSync.question(`Digite o novo valor para "${campoSelecionado}" (valor atual: ${valorAntigo}): `);
    }

    dadosPessoais[campoSelecionado] = novoValor;

    console.log('\nInformação atualizada com sucesso!');
    lerDados(); // Mostra os dados atualizados.
    salvarDados(); // Salva os dados após a atualização
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
        salvarDados(); // Salva o estado vazio
    } else {
        console.log('\nOperação cancelada.\n');
    }
}

// --- Menu Principal do Script ---
function main() {
    carregarDados(); // Carrega os dados do arquivo ao iniciar

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
                salvarDados();
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