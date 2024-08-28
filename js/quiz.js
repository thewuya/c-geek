let db;
const request = indexedDB.open('UserDatabase', 1);

request.onsuccess = function(event) {
    db = event.target.result;

    if(window.location.pathname.endsWith('quiz_1.html')) {
        const questions = [
          { 
            question: "下列for循环的次数为",
            options: ["5", "6", "1", "无限"],
            answer: "6"
          },
          { 
            question: "下述关于循环体的描述中，（C）是错误的。",
            options: ["循环体中可以出现break语句和continue语句", "循环体中还可以出现循环语句", "循环体中不能出现goto语句", "循环体中可以出现开关语句"],
            answer: "循环体中不能出现goto语句"
          },
          { 
            question: "有以下程序段：int n=0,p; do { scanf(”%d”, &p); n++;} while(p!=12345&&n<3); 此处do-while循环的结束条件是（D）。",
            options: ["p的值不等于12345并且n的值小于3", "p的值等于12345并且n的值大于等于3", "p的值不等于12345或者n的值小于3", "p的值等于12345或者n的值大于等于3"],
            answer: "p的值等于12345或者n的值大于等于3"
          },
          { 
            question: "以下程序中，while循环的循环次数是（D）",
            options: ["1", "10", "6", "死循环，不能确定次数"],
            answer: "死循环，不能确定次数"
          },
          { 
            question: "下列while循环的执行次数是（A）",
            options: ["0", "1", "5", "死循环"],
            answer: "0"
          },
          { 
            question: "在下列选项中，没有构成死循环的程序段是（D）",
            options: ["int i=100; while (1) { i=i%100+1; if (i>100) break; }", "for( ; ; );", "int k=1000; do {++k;} while (k>=1000);", "int s=36; while (s) --s;"],
            answer: "int s=36; while (s) --s;"
          },
          { 
            question: "以下程序的输出结果是",
            options: ["101", "6", "4", "3"],
            answer: "3"
          },
          { 
            question: "以下程序的功能是:从键盘上输入若干个学生的成绩, 统计并输出最高成绩和最低成绩, 当输入负数时结束输入。请填空。（D）",
            options: ["x<=0; x>amin; x<=amin", "x>0; x>amin; x<=amin", "x>0; x>amin; x<amin", "x>=0; x>amin; x<amin"],
            answer: "x>=0; x>amin; x<amin"
          },
          { 
            question: "函数pi的功能是根据以下近似公式求π值：请填空，完成求π的功能。（C）",
            options: ["1/i*i", "1.0/i*i", "1.0/(i*i)", "1.0/(n*n)"],
            answer: "1.0/(i*i)"
          },
          { 
            question: "设有以下程序：程序运行后，如果从键盘上输入1298，则输出结果为（B）",
            options: ["892", "8921", "89", "921"],
            answer: "8921"
          }
        ];
          quizLoader('quiz_1', questions);
        }
      
        if(window.location.pathname.endsWith('quiz_2.html')) {
          quizLoader('quiz_2');
        }
      
        if(window.location.pathname.endsWith('quiz_3.html')) {
          quizLoader('quiz_3');
        }
      
        if(window.location.pathname.endsWith('quiz_4.html')) {
          quizLoader('quiz_4');
        }
      
        if(window.location.pathname.endsWith('quiz_5.html')) {
          quizLoader('quiz_5');
        }
      
};

function quizLoader(quiz_name, questions) {
    if (!db) {
      console.error('Por favor, inténtalo de nuevo.');
      return;
    }
  
    
  
    const quizContainer = document.getElementById('quizContainer');
    const submitButton = document.getElementById('submitQuiz');
  
    function displayQuestions() {
      quizContainer.innerHTML = ''; 
  
      questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.innerHTML = `<p>${q.question}</p>`;
        q.options.forEach(option => {
          questionDiv.innerHTML += `<input type="radio" name="q${index}" value="${option}"> ${option}<br>`;
        });
        quizContainer.appendChild(questionDiv);
      });
    }
  
    submitButton.onclick = function() {
        let score = 0;
        let totalQuestions = questions.length;

        questions.forEach((q, index) => {
            const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
            if (selectedOption && selectedOption.value === q.answer) {
                score++;
            }
        });
    
        const username = sessionStorage.getItem('username');
    
        const transaction = db.transaction(['users'], 'readwrite');
        const objectStore = transaction.objectStore('users');
        const request = objectStore.get(username);
    
        request.onsuccess = function(event) {
            const user = request.result;
    

            if (!user.quizzes) user.quizzes = {}; 
    

            if (user.quizzes[quiz_name] === false) {
                user.experience += score * 10;
                user.quizzes[quiz_name] = true;
    
                const updateRequest = objectStore.put(user);
    
                updateRequest.onsuccess = function() {
                    alert(`你已经正确回答了 ${score} 道题，共 ${totalQuestions} 道题！你获得了 ${score * 10} 点经验值。`);
                };
    
                updateRequest.onerror = function() {
                    console.error('更新失败: ', updateRequest.error);
                };
            } else {
                alert('你已经完成过这个测验了，经验值无法再次更新。');
            }
    

            if (score >= 6) {
                const nextLevelElement = document.getElementById('level');
                const nextLevel = nextLevelElement.textContent.trim();
                
            
                if (user.levelFollower && !user.levelFollower[nextLevel]) {
                    user.levelFollower[nextLevel] = true; 
                    user.lessonCompleted = parseInt(user.lessonCompleted) + 1;
                    const updateRequest = objectStore.put(user);
                    updateRequest.onsuccess = function() {
                        alert(`恭喜！你已解锁下一等级 ${nextLevel}!`);
                    };
    
                    updateRequest.onerror = function() {
                        console.error('解锁下一等级失败: ', updateRequest.error);
                    };
                }
            } else {
                alert(`You did not pass. Your score is ${score}. Try again.`);
            }
        };
    
        request.onerror = function() {
            console.error('加载用户数据失败: ', request.error);
        };
    };
    
  
    displayQuestions();
  }


