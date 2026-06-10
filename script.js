// Array com as perguntas sobre o tema
const questions = [
    {
        question: "O que é o sistema de Plantio Direto e como ele ajuda o meio ambiente?",
        answers: [
            { text: "Técnica de queimar a palhada para limpar o solo rapidamente.", correct: false },
            { text: "Cultivo sem revolvimento do solo, mantendo a palhada anterior para evitar erosão e reter água.", correct: true },
            { text: "Plantio em estufas fechadas com luz artificial.", correct: false },
            { text: "Uso intensivo de tratores para afofar a terra todos os dias.", correct: false }
        ]
    },
    {
        question: "O que significa a sigla ILPF no contexto da agricultura sustentável?",
        answers: [
            { text: "Integração Lavoura-Pecuária-Floresta, otimizando o uso da terra e reduzindo emissões de carbono.", correct: true },
            { text: "Instituto de Limpeza das Plantações e Fazendas.", correct: false },
            { text: "Irrigação Livre Para Florestas.", correct: false },
            { text: "Índice de Lucro do Produtor Familiar.", correct: false }
        ]
    },
    {
        question: "Qual o principal objetivo do uso de 'Controle Biológico' nas lavouras?",
        answers: [
            { text: "Eliminar 100% dos insetos do planeta.", correct: false },
            { text: "Substituir as máquinas por animais.", correct: false },
            { text: "Usar inimigos naturais (como fungos ou insetos predadores) para combater pragas, diminuindo o uso de químicos.", correct: true },
            { text: "Modificar geneticamente todas as sementes para brilharem no escuro.", correct: false }
        ]
    },
    {
        question: "Por que a preservação das Matas Ciliares (vegetação nas margens de rios) é crucial para o Agronegócio?",
        answers: [
            { text: "Para ter mais espaço para pasto.", correct: false },
            { text: "Elas protegem a água, evitam o assoreamento dos rios e garantem a irrigação no futuro.", correct: true },
            { text: "Porque dificultam a passagem do gado.", correct: false },
            { text: "Não têm importância para a produção agrícola.", correct: false }
        ]
    },
    {
        question: "Como a 'Agricultura de Precisão' equilibra produção e meio ambiente?",
        answers: [
            { text: "Usando tecnologia (como drones e GPS) para aplicar água e nutrientes apenas onde é necessário, evitando desperdícios.", correct: true },
            { text: "Plantando as sementes de forma perfeitamente alinhada com réguas.", correct: false },
            { text: "Produzindo menos alimentos para economizar energia.", correct: false },
            { text: "Focando apenas em colher na hora exata do relógio.", correct: false }
        ]
    }
];

// Elementos do DOM
const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-btn");
const quizBody = document.getElementById("quiz");
const controls = document.getElementById("controls");
const scoreSection = document.getElementById("score-section");

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");
const totalQuestionsElement = document.getElementById("total-questions");
const restartButton = document.getElementById("restart-btn");
const feedbackMsg = document.getElementById("feedback-msg");

let currentQuestionIndex = 0;
let score = 0;

// Configura a tela inicial antes do jogo começar
function initQuiz() {
    startScreen.style.display = "flex";
    quizBody.style.display = "none";
    controls.style.display = "none";
    scoreSection.style.display = "none";
}

// Inicia o Jogo (esconde a tela inicial ou final e mostra o quiz)
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    startScreen.style.display = "none";
    scoreSection.style.display = "none";
    quizBody.style.display = "block";
    controls.style.display = "flex";
    nextButton.innerHTML = "Próxima Pergunta";
    showQuestion();
}

// Mostra a pergunta atual
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

// Limpa os botões antigos antes da nova pergunta
function resetState() {
    nextButton.style.display = "none";
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// Lida com a seleção da resposta
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("wrong");
    }

    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

// Exibe a tela final
function showScore() {
    resetState();
    quizBody.style.display = "none";
    controls.style.display = "none";
    scoreSection.style.display = "flex";
    scoreElement.innerHTML = score;
    totalQuestionsElement.innerHTML = questions.length;

    if(score === questions.length) {
        feedbackMsg.innerHTML = "🏆 Excelente! Você é um verdadeiro especialista em sustentabilidade no campo!";
    } else if (score >= questions.length / 2) {
        feedbackMsg.innerHTML = "🌱 Muito bom! Você entende bastante sobre o equilíbrio entre produção e meio ambiente.";
    } else {
        feedbackMsg.innerHTML = "🚜 Boa tentativa! Vale a pena estudar um pouco mais sobre o futuro sustentável no agro.";
    }
}

// Avança para a próxima pergunta
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

// Ouvintes de Eventos (Cliques)
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", handleNextButton);

// Inicializa a tela ao carregar a página
initQuiz();