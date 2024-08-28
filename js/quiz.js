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
          const questions_2 = [
            { 
              question: "下列哪个是C语言中用于声明浮点数的数据类型？",
              options: ["int", "char", "float", "bool"],
              answer: "float"
            },
            { 
              question: "下列哪个是C语言中用于声明一个无符号整数（只能存储非负值）的关键字？",
              options: ["unsigned", "signed", "void", "enum"],
              answer: "unsigned"
            },
            { 
              question: "在C语言中，sizeof(char)的结果通常是？",
              options: ["1", "2", "4", "取决于编译器"],
              answer: "1"
            },
            { 
              question: "哪个数据类型在C语言中用于表示真值或假值（布尔值）？",
              options: ["bool", "true/false", "int", "logical"],
              answer: "int"
            },
            { 
              question: "在C语言中，long int、int和short int类型的变量占用的字节数关系通常是？",
              options: ["long int < int < short int", "short int < int < long int", "它们占用相同的字节数", "取决于编译器和平台"],
              answer: "取决于编译器和平台"
            },
            { 
              question: "以下是一个C语言程序片段，用于打印一个整数的值。请填空，并选出正确的填空选项。\n\n#include <stdio.h>\nint main() {\n    _______ num = 100; // 填空处应填写合适的数据类型\n    printf(\"%d\\n\", num);\n    return 0;\n}",
              options: ["int", "float", "char", "string"],
              answer: "int"
            },
            { 
              question: "以下能正确地定义整型变量a，b和c并为它们赋初值5的语句是？",
              options: ["int a = b = c = 5;", "int a, b, c = 5;", "a = 5, b = 5, c = 5;", "int a = 5, b = 5, c = 5;"],
              answer: "int a = 5, b = 5, c = 5;"
            },
            { 
              question: "下列程序的输出结果是？\n\n# include <stdio.h> \nint main(void)\n{\n int a[10] = {0,1,2,3,4,5,6,7,8,9}, *p = a+3;\n \n printf(\"%d\", p[2]);\n \n return 0;\n}",
              options: ["3", "4", "5", "非法"],
              answer: "5"
            },
            { 
              question: "阅读以下C语言程序片段，下列说法正确的是：\n\nint a = 5;\nfloat b = a;",
              options: ["不会发生任何转换，因为int和float是不同类型。", "a的值会隐式转换为float类型，然后赋值给b。", "b的类型会隐式转换为int类型，以匹配a的类型。", "程序会编译失败，因为int和float类型不兼容。"],
              answer: "a的值会隐式转换为float类型，然后赋值给b。"
            },
            { 
              question: "阅读以下C语言程序，并选择程序输出的结果。\n\n#include <stdio.h>\n\nint main() {\n    char c = 'A' + 1;\n    printf(\"%c\\n\", c);\n    return 0;\n}",
              options: ["A", "B", "66", "1"],
              answer: "B"
            }
          ];
          quizLoader('quiz_2', questions_2);
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
      if (!checkUserLoggedIn()) {
        return; // If not logged in, stop execution
      }
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

  function checkUserLoggedIn() {
    const username = sessionStorage.getItem('username');
    if (!username) {
      alert('请先登录！'); // Prompt user to log in
      window.location.href = 'login.html'; // Redirect to login page
      return false;
    }
    return true;
  }
