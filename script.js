
   
   const quizData = [
      {
        pergunta: "Qual a capital da França?",
        opcoes: ["Paris", "Roma", "Londres", "Berlim"],
        correta: 0
      },
      {
        pergunta: "Quanto é 5 x 5?",
        opcoes: ["20", "15", "25", "30"],
        correta: 2
      },
      {
        pergunta: "Quem escreveu Dom Quixote?",
        opcoes: ["Machado de Assis", "Cervantes", "Shakespeare", "Camões"],
        correta: 1
      }
    ];

    let indice = 0;
    let pontuacao = 0;
    let tempoRestante = 90; // 1min30
    let timerGlobal;
    let timerQuestao;

    const quizEl = document.getElementById("quiz");
    const resultEl = document.getElementById("result");
    const timerEl = document.getElementById("timer");

    function iniciarQuiz() {
      timerGlobal = setInterval(() => {
        tempoRestante--;
        timerEl.innerText = "Tempo restante: " + tempoRestante + "s";
        if (tempoRestante <= 0) {
          clearInterval(timerGlobal);
          finalizarQuiz();
        }
      }, 1000);

      mostrarQuestao();
    }

    function mostrarQuestao() {
      if (indice >= quizData.length) {
        finalizarQuiz();
        return;
      }

      const questao = quizData[indice];
      quizEl.innerHTML = `
        <div class="question">${questao.pergunta}</div>
        <div class="options">
          ${questao.opcoes.map((op, i) => `<button onclick="responder(${i})">${op}</button>`).join("")}
        </div>
      `;

      // tempo de 10s por questão
      timerQuestao = setTimeout(() => {
        indice++;
        mostrarQuestao();
      }, 10000);
    }

    function responder(opcao) {
      clearTimeout(timerQuestao); // evita pular sozinho se já respondeu
      if (opcao === quizData[indice].correta) {
        pontuacao++;
      }
      indice++;
      mostrarQuestao();
    }

    function finalizarQuiz() {
      clearInterval(timerGlobal);
      quizEl.innerHTML = "";
      timerEl.innerHTML = "Fim do Quiz!";
      resultEl.innerHTML = `<h2>Sua pontuação: ${pontuacao} de ${quizData.length}</h2>`;
    }

    iniciarQuiz();
