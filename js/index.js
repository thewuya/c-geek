let db;
const request = indexedDB.open('UserDatabase', 1);

request.onupgradeneeded = function(event) {
  db = event.target.result;
  const objectStore = db.createObjectStore('users', {keyPath: 'username'});
  objectStore.createIndex('password', 'password', { unique: false});
  objectStore.createIndex('experience', 'experience', { unique:false });
  objectStore.createIndex('level', 'level', { unique:false });
  objectStore.createIndex('lessonCompleted', 'lessonCompleted', { unique:false });
  objectStore.createIndex('levelFollower', 'levelFollower', { unique:false });
  objectStore.createIndex('quizzes', 'quizzes', { unique:false });

  const friendsStore = db.createObjectStore('friends', { keyPath: ['username', 'friendUsername']})
  friendsStore.createIndex('username', 'username', { unique: false });
  friendsStore.createIndex('friendUsername', 'friendUsername', { unique:false });

  const messageStore = db.createObjectStore('messages', { keyPath: 'id', autoIncrement: true});
  messageStore.createIndex('sender', 'sender', {unique:false});
  messageStore.createIndex('receiver', 'receiver', {unique:false});
  messageStore.createIndex('messageText', 'messageText', { unique: false });

};

request.onsuccess = function(event) {
  db = event.target.result;
  if(window.location.pathname.endsWith('info.html')) {
    loadInformation();
  }

  if(window.location.pathname.endsWith('profile.html')) {
    loadProfile();
  }

  if(window.location.pathname.endsWith('ranking.html')) {
    showRanking();
  }

  if(window.location.pathname.endsWith('level.html')) {
    levelChecker();
  }
  if(window.location.pathname.endsWith('message.html')) {
    loadMessage();
  }


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

  const signInForm = document.getElementById('signInForm');
  if (signInForm){
    signInForm.addEventListener('submit', handleSignInForm);
  }
  
  const logInForm = document.getElementById('logInForm');
  if (logInForm){
    logInForm.addEventListener('submit', handleLogInform)
  }

  const sendMessageForm = document.getElementById('sendMessageForm');
  if (sendMessageForm){
    sendMessageForm.addEventListener('submit', handleMessageForm);
  }
};

request.onerror = function(event) {
  console.error('开不了IndexedDB', event.target.errorCode);
};

function handleSignInForm(event) {
  event.preventDefault();

  if (!db) {
    console.error('再来依次')
    return
  }
  const username = document.getElementById('s_username').value;
  const password = document.getElementById('s_password').value;

  const transaction = db.transaction(['users']);
  const objectStore = transaction.objectStore('users');
  const request = objectStore.get(username);

  request.onsuccess = function() {
    if (request.result) {
      alert('客户名已经被选了')
    } else {

      
      const transaction = db.transaction(['users'], 'readwrite');
      const objectStore = transaction.objectStore('users');

      const quizzes = {};
      for (let i = 0; i < 10; i++) {
        quizzes[`quiz_${i}`] = false;
      }

      const levelFollower = {};
      for (let i = 0; i < 10; i++) {
        levelFollower[`level_${i}`] = false;
      }

      const user = {
        username: username,
        password: password,
        experience: 0,
        level: 1,
        lessonCompleted: 0,
        quizzes: quizzes
      };

      const addRequest = objectStore.add(user);

      addRequest.onsuccess = function() {
        console.log('成功了');
        document.getElementById('username').value = username;
        document.getElementById('password').value = password;
       
        const flipCardInner = document.querySelector('.flip-card__inner');
        flipCardInner.classList.remove('flipped');
        
      };

      addRequest.onerror = function () {
        alert('Error: ' + addRequest.error);
      };
    
    };
    

  }

  request.onerror = function() {
    alert('Error: ' + request.error)
  };
  
  document.getElementById('signInForm').reset();
};

function handleLogInform (event) {
  event.preventDefault();
  if (!db) {
    console.log("再来依次");
    return;
  }

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  const transaction = db.transaction(['users']);
  const objectStore = transaction.objectStore('users');
  const request = objectStore.get(username);

  request.onsuccess = function () {
    const user = request.result;
    if (user && user.password == password){
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('password', password);
      sessionStorage.setItem('gender', user.gender);
      alert("成功")
      window.location.href = 'menu.html'
    }
    else{
      alert("密码不对吧")
    }


  };

  request.onerror = function () {
    alert ('Error ' + request.error);
  };
  document.getElementById('logInForm').reset();
}

function loadInformation (){
  if (!db) {
    console.error('再来依次')
    return
  }

  const username = document.getElementById('username');
  const password = document.getElementById('password');
  const gender = document.getElementById('gender');
  username.innerHTML = sessionStorage.getItem('username');
  password.innerHTML = sessionStorage.getItem('password');
  gender.innerHTML = sessionStorage.getItem('gender');

}

function loadProfile (){
  if (!db) {
    console.error('再来依次')
    return
  }

  const username = document.getElementById('username');
  const password = document.getElementById('password');
  
  const experience = document.getElementById('experience');
  const level = document.getElementById('level');
  const lessonCompleted = document.getElementById('lessonCompleted');

  const transaction = db.transaction(['users', 'friends']);
  const userStore = transaction.objectStore('users');
  const friendStore = transaction.objectStore('friends');

  const request = userStore.get(sessionStorage.getItem('username'));

  request.onsuccess = function () {
    const user = request.result;
    username.innerHTML = user.username;
    password.innerHTML = user.password;
    experience.innerHTML = user.experience;
    level.innerHTML = user.level;
    lessonCompleted.innerHTML = user.lessonCompleted;
    const friendsList = document.getElementById("friends");
    
    const friendIndex = friendStore.index('username');
    const friendRequest = friendIndex.getAll(user.username);

    friendRequest.onsuccess = function() {
      const friends = friendRequest.result;
      friendsList.innerHTML = '';

      if (friends.length > 0) {
        friends.forEach(friendRelation => {
          const friendItem = document.createElement('li');
          friendItem.textContent = friendRelation.friendUsername;
          friendsList.appendChild(friendItem);
        });

      }
      else{
        friendsList.textContent = '你没有朋友';
      }
    };
    friendRequest.onerror = function() {
      console.error('再来一次：' + friendRequest.error);
    }
  };

  request.onerror = function () {
    alert ('Error ' + request.error);
  };


}

function showRanking() {
  if (!db){
    alert('再来一次')
    return;
  }

  const transaction = db.transaction(['users'], 'readonly');
  const objectStore = transaction.objectStore('users');
  const request = objectStore.getAll();

  request.onsuccess = function(event) {
    const users = event.target.result;

    users.sort((a,b) => {
      if(a.level === b.level) {
        return b.experience - a.experience;
      }
      return b.level - a.level;
    });

    const userList = document.getElementById('userList')
    userList.innerHTML = '';
    users.forEach(user => {
      const listItem = document.createElement('li');
      listItem.textContent = `username:${user.username} level:${user.level} experience:${ user.experience }`;
      if (user.username === sessionStorage.getItem('username')) {
        listItem.textContent += ' - 这是你'
      } else {
        const addButton = document.createElement('button');
        addButton.textContent = '加友';
        addButton.onclick = function() {
          addFriend(user.username);
        };
        listItem.appendChild(addButton);
      }

      userList.appendChild(listItem);
    });
  };

  function addFriend(friendUsername){
    if (!db) {
      alert ('再来');
      return;
    }

    const currentUsername = sessionStorage.getItem('username');

    if (friendUsername === currentUsername){
      alert('不可以加自己');
      return;
    }

    const transaction = db.transaction(['friends'], 'readwrite');
    const objectStore = transaction.objectStore('friends');
    
    const checkRequest = objectStore.get([currentUsername, friendUsername]);

    checkRequest.onsuccess = function () {
      if (checkRequest.result)
      {
        alert('已经是好友了');
      }
      else {
        const friendRelation = {
          username: currentUsername,
          friendUsername: friendUsername
        };
        const addRequest = objectStore.add(friendRelation);
        addRequest.onsuccess = function () {
          alert('加了');
        }
  
        addRequest.onerror = function () {
          alert('失败了' + addRequest.error);
        }
      }
      
      
    };

    checkRequest.onerror = function () {
      alert('失败了' + checkRequest.error)
    };

  }
}

function logInConvenient () {
  const username = document.getElementById("username");
  const password = document.getElementById("password");

  username.value = sessionStorage.getItem("log_username");
  password.value = sessionStorage.getItem("log_password");
}

function handleMessageForm (event) {
  event.preventDefault()
  if (!db) {
    alert('try again');
    return;
  }
  const receiver = document.getElementById('friendList').value;
  const message = document.getElementById('message').value;

  const transaction = db.transaction(['messages'], 'readwrite');
  const messageStore = transaction.objectStore('messages');

  const messages  = {
    sender: sessionStorage.getItem('username'),
    receiver : receiver,
    messageText: message
  }

  const addRequest = messageStore.add(messages);
  addRequest.onsuccess = function() {
    alert("message sent");
    document.getElementById('message').value = '';
  }

  addRequest.onerror = function() {
    alert("message");
    
  }
}

function loadMessage() {
  if(!db) {
    console.error('你再来一次')
    return;
  }

  const receiver = sessionStorage.getItem('username');
  const transaction = db.transaction(['messages'], 'readonly');
  const messageStore = transaction.objectStore('messages');
  const receiverIndex = messageStore.index('receiver');
  const request = receiverIndex.getAll(receiver);

  request.onsuccess = function (event) {
    const message = event.target.result;
    const messageList = document.getElementById("messageList");
    messageList.innerHTML = '';

    if (message.length > 0) {
      message.forEach(message => {
        const messageElement = document.createElement('p');
        messageElement.textContent = `From: ${ message.sender} , Message: ${ message.messageText}`;
        messageList.appendChild(messageElement);
      });
    }
    else
    {
      messageList.textContent = '你没有消息';
    }
  };

  request.onerror = function () {
    console.error('消息失败了： ',request.error)
  }

  const currentUser = sessionStorage.getItem('username');
  const friendTransaction = db.transaction(['friends'], 'readonly');
  const friendStore = friendTransaction.objectStore('friends');
  const friendIndex = friendStore.index('username');
  const friendRequest = friendIndex.getAll(currentUser);

  friendRequest.onsuccess = function (event) {
    const friends = event.target.result;
    const friendList = document.getElementById('friendList');
    friendList.innerHTML = '<option value="">Select a friend</option>'; 

    if (friends.length > 0) {
      friends.forEach(friendRelation => {
        const option = document.createElement('option');
        option.value = friendRelation.friendUsername;
        option.textContent = friendRelation.friendUsername;
        friendList.appendChild(option);
      });
    }
  };

  friendRequest.onerror = function () {
    console.error('Error loading friends:', friendRequest.error);
  };

}

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
          console.error('Actualización fallida: ', updateRequest.error);
        };
      } else {
        alert('你做过啊');
      }
    };

    request.onerror = function() {
      console.error('Carga de usuario fallida: ', request.error);
    };
  };

  displayQuestions();
}



document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.endsWith("log_in.html")) {
    if (sessionStorage.getItem("log_username")) {
      logInConvenient();
    }
  }
});




