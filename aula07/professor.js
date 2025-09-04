//  Sistema de Gestão Acadêmica do Professor


// --- 1. CONFIGURAÇÃO INICIAL E MÓDULOS ---
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// --- 2. BANCO DE DADOS EM MEMÓRIA ---
// Os dados são inicializados aqui. Todas as modificações (cadastros, notas)
// ocorrerão neste objeto, mas serão resetados quando o script for fechado.
let professor = {
    nome: "Prof. Ivo",
    escolas: [
        {
            id: 1,
            nome: "Escola de Tecnologia Avançada",
            turmas: [
                {
                    id: 1,
                    nome: "Lógica de Programação",
                    materia: "JavaScript",
                    dias: "Seg/Qua",
                    horario: "19:00 - 21:00",
                    alunos: [
                        { id: 1, matricula: "202401", nome: "Ana Silva", desempenho: 'verde', notas: [], faltas: [] },
                        { id: 2, matricula: "202402", nome: "Bruno Costa", desempenho: 'amarelo', notas: [], faltas: [] }
                    ]
                }
            ]
        }
    ]
};

// --- 3. FUNÇÕES UTILITÁRIAS ---
function perguntar(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

// --- 4. FUNÇÕES DE APOIO E SELEÇÃO ---
async function selecionarEscola() {
    console.log("\n--- ESCOLHA UMA ESCOLA ---");
    if (professor.escolas.length === 0) {
        console.log("Nenhuma escola cadastrada ainda.");
        return null;
    }
    professor.escolas.forEach(escola => {
        console.log(`  [${escola.id}] ${escola.nome}`);
    });
    const id = parseInt(await perguntar("\nDigite o ID da escola: "), 10);
    const escolaSelecionada = professor.escolas.find(e => e.id === id);
    if (!escolaSelecionada) {
        console.log("Escola não encontrada.");
        return null;
    }
    return escolaSelecionada;
}

async function selecionarTurma() {
    console.log("\n--- ESCOLHA UMA TURMA ---");
    let todasAsTurmas = professor.escolas.flatMap(escola => {
        console.log(`\nEscola: ${escola.nome}`);
        escola.turmas.forEach(turma => console.log(`  [${turma.id}] ${turma.nome} (${turma.alunos.length} alunos)`));
        return escola.turmas;
    });

    if (todasAsTurmas.length === 0) {
        console.log("Nenhuma turma cadastrada no sistema.");
        return null;
    }
    const id = parseInt(await perguntar("\nDigite o ID da turma: "), 10);
    const turmaSelecionada = todasAsTurmas.find(t => t.id === id);
    if (!turmaSelecionada) {
        console.log("Turma não encontrada.");
        return null;
    }
    return turmaSelecionada;
}

// --- 5. FUNÇÕES DE CADASTRO (CRIAR DADOS EM MEMÓRIA) ---
async function cadastrarEscola() {
    console.log("\n--- CADASTRAR NOVA ESCOLA ---");
    const nome = await perguntar("Nome da nova escola: ");
    if (!nome) { console.log("Cadastro cancelado."); return; }

    const novoId = Math.max(0, ...professor.escolas.map(e => e.id)) + 1;
    professor.escolas.push({ id: novoId, nome, turmas: [] });
    console.log(`Escola "${nome}" cadastrada com sucesso! (Em memória)`);
}

async function cadastrarTurma() {
    console.log("\n--- CADASTRAR NOVA TURMA ---");
    const escola = await selecionarEscola();
    if (!escola) return;

    const nome = await perguntar("Nome da nova turma: ");
    const materia = await perguntar("Matéria da turma: ");

    const todasAsTurmas = professor.escolas.flatMap(e => e.turmas);
    const novoId = Math.max(0, ...todasAsTurmas.map(t => t.id)) + 1;
    escola.turmas.push({ id: novoId, nome, materia, alunos: [] });
    console.log(`Turma "${nome}" cadastrada com sucesso na escola "${escola.nome}"! (Em memória)`);
}

async function cadastrarAluno() {
    console.log("\n--- CADASTRAR NOVO ALUNO ---");
    const turma = await selecionarTurma();
    if (!turma) return;

    const nome = await perguntar("Nome do novo aluno: ");
    const matricula = await perguntar(`Matrícula de ${nome}: `);

    const todosOsAlunos = professor.escolas.flatMap(e => e.turmas).flatMap(t => t.alunos);
    const novoId = Math.max(0, ...todosOsAlunos.map(a => a.id)) + 1;
    turma.alunos.push({ id: novoId, matricula, nome, desempenho: 'verde', notas: [], faltas: [] });
    console.log(`Aluno "${nome}" cadastrado com sucesso na turma "${turma.nome}"! (Em memória)`);
}

// --- 6. FUNÇÕES DE AÇÃO (MODIFICAR DADOS EM MEMÓRIA) ---
async function fazerChamada() {
    const turma = await selecionarTurma();
    if (!turma) return;
    console.log(`\n--- CHAMADA: ${turma.nome} ---`);
    const dataHoje = new Date().toLocaleDateString('pt-BR');
    for (const aluno of turma.alunos) {
        const status = await perguntar(`  - ${aluno.nome} [Pressione ENTER para Presente]: `) || 'P';
        if (status.toUpperCase() !== 'P') {
            aluno.faltas.push({ data: dataHoje, status: status.toUpperCase() });
        }
    }
    console.log(`\nChamada finalizada com sucesso!`);
}

async function lancarNotas() {
    const turma = await selecionarTurma();
    if (!turma) return;
    console.log(`\n--- LANÇAR NOTAS: ${turma.nome} ---`);
    const tipoNota = await perguntar("Qual o tipo da avaliação (ex: Prova 1)?: ");
    if (!tipoNota) { console.log("Operação cancelada."); return; }
    for (const aluno of turma.alunos) {
        const notaValor = parseFloat(await perguntar(`  - Nota para ${aluno.nome}: `));
        if (!isNaN(notaValor)) {
            aluno.notas.push({ tipo: tipoNota, valor: notaValor });
            console.log(`  Nota ${notaValor} lançada.`);
        } else {
            console.log("  Nota inválida, aluno pulado.");
        }
    }
    console.log(`\nLançamento de notas finalizado!`);
}

// --- 7. FUNÇÕES DE LEITURA E RELATÓRIOS ---
async function relatorioIndividual() {
    const turma = await selecionarTurma();
    if (!turma || turma.alunos.length === 0) {
        console.log("Nenhum aluno encontrado para gerar relatório.");
        return;
    }
    console.log(`\n--- ALUNOS DA TURMA: ${turma.nome} ---`);
    turma.alunos.forEach(a => console.log(`  [${a.id}] ${a.nome}`));
    const idAluno = parseInt(await perguntar("\nDigite o ID do aluno: "), 10);
    const aluno = turma.alunos.find(a => a.id === idAluno);
    if (!aluno) { console.log("Aluno não encontrado."); return; }

    console.log("\n========================================");
    console.log(`    RELATÓRIO - ${aluno.nome.toUpperCase()}`);
    console.log("========================================");
    console.log(`Matrícula: ${aluno.matricula}`);
    console.log(`Desempenho: ${aluno.desempenho}`);
    console.log("\n--- NOTAS ---");
    aluno.notas.length > 0
        ? aluno.notas.forEach(n => console.log(`  - ${n.tipo}: ${n.valor}`))
        : console.log("  Nenhuma nota lançada.");
    console.log("\n--- FALTAS ---");
    aluno.faltas.length > 0
        ? aluno.faltas.forEach(f => console.log(`  - Data: ${f.data} | Status: ${f.status}`))
        : console.log("  Nenhum registro de falta.");
    console.log("========================================");
}

// --- 8. MENUS E FLUXO PRINCIPAL DA APLICAÇÃO ---
async function menuCadastros() {
    while (true) {
        console.log(`\n--- MENU DE CADASTROS ---`);
        console.log("1. Cadastrar Nova Escola");
        console.log("2. Cadastrar Nova Turma");
        console.log("3. Cadastrar Novo Aluno");
        console.log("4. Voltar");
        const opcao = await perguntar("Escolha uma opção: ");
        switch (opcao) {
            case '1': await cadastrarEscola(); break;
            case '2': await cadastrarTurma(); break;
            case '3': await cadastrarAluno(); break;
            case '4': return;
            default: console.log("Opção inválida.");
        }
        await perguntar("\nPressione ENTER para continuar...");
    }
}

async function menuPrincipal() {
    console.log(`\nBem-vindo ao Sistema de Gestão, ${professor.nome}!`);
    while (true) {
        console.log(`\n--- MENU PRINCIPAL ---`);
        console.log("1. Gerenciar Cadastros");
        console.log("2. Fazer Chamada");
        console.log("3. Lançar Notas");
        console.log("4. Gerar Relatório de Aluno");
        console.log("5. Sair");
        const opcao = await perguntar("Escolha uma opção: ");
        switch (opcao) {
            case '1': await menuCadastros(); break;
            case '2': await fazerChamada(); break;
            case '3': await lancarNotas(); break;
            case '4': await relatorioIndividual(); break;
            case '5': console.log("Saindo..."); rl.close(); return;
            default: console.log("Opção inválida.");
        }
        if (opcao !== '5') {
            await perguntar("\nPressione ENTER para continuar...");
        }
    }
}

// --- PONTO DE ENTRADA ---
menuPrincipal();