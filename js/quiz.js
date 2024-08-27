
const questions = [
    { 
        question: "题目_1",
        options:  ["A", "B", "C", "D"],
        answer:   "A" 

    },
    { 
        question: "题目_2",
        options:  ["A", "B", "C", "D"],
        answer:   "B" 
    }
];

function displayQuestion() {
    const quizContainer = document.getElementById('quizContainer');
    questions.forEach( (q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.innerHTML = `<p>${ q.question }</p>`;
        q.options.forEach(option => {
            questionDiv.innerHTML += `<input type="radio" name="q${ index }" value="${ option }" required> ${ option }`;
        });
        quizContainer.appendChild(questionDiv);
    });

   
  }

  
  displayQuestion();

function submitQuiz () {
    let score = 0;
    questions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
        if (selectedOption && selectedOption.value === q.answer) {
            score++;
        }
    });
    document.getElementById('result').innerHTML = `分数: ${score}`
}









function quizLoader() {
    if (!db) {
      console.error('请重试');
      return;
    }
  
    const questions = [
      { 
        question: "尼加拉dsfsdfsd瓜的首都",
        options: ["Managua", "León", "Granada", "Masaya"],
        answer: "Managua"
      },
      { 
        question: "尼加拉瓜吃什么",
        options: ["米饭", "土豆", "玉米", "豆子"],
        answer: "米饭"
      },
      { 
        question: "尼加拉瓜喝什么",
        options: ["米饭", "土豆", "玉米", "水"],
        answer: "水"
      }
    ];
  
    let questionIndex = 0; 
  
    
  
    function displayQuestion() {
      const quizContainer = document.getElementById('quizContainer');
      questions.forEach( (q, index) => {
          const questionDiv = document.createElement('div');
          questionDiv.innerHTML = `<p>${ q.question }</p>`;
          q.options.forEach(option => {
              questionDiv.innerHTML += `<input type="radio" name="q${ index }" value="${ option }" required> ${ option }`;
          });
          quizContainer.appendChild(questionDiv);
      });
  
    
    
  }
  displayQuestion();
  }