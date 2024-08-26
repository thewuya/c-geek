let db;
const request = indexedDB.open('UserDatabase', 1);

request.onupgradeneeded = function(event) {
  db = event.target.result;
  const objectStore = db.createObjectStore('users', {keyPath: 'username'});
  objectStore.createIndex('password', 'password', { unique: false});
  objectStore.createIndex('gender', 'gender', { unique:false });
  objectStore.createIndex('experience', 'experience', { unique:false });
  objectStore.createIndex('level', 'level', { unique:false });
  objectStore.createIndex('lessonCompleted', 'lessonCompleted', { unique:false });

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


  if(window.location.pathname.endsWith('message.html')) {
    loadMessage();
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
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const gender = document.getElementById('gender').value;

  const transaction = db.transaction(['users']);
  const objectStore = transaction.objectStore('users');
  const request = objectStore.get(username);

  request.onsuccess = function() {
    if (request.result) {
      alert('客户名已经被选了')
    } else {
      const transaction = db.transaction(['users'], 'readwrite');
      const objectStore = transaction.objectStore('users');

      const user = {
        username: username,
        password: password,
        gender: gender,
        experience: 0,
        level: 1,
        lessonCompleted: 0
      };

      const addRequest = objectStore.add(user);

      addRequest.onsuccess = function() {
        console.log('成功了');
        sessionStorage.setItem('log_username', username);
        sessionStorage.setItem('log_password', password);
        window.location.href = 'log_in.html'
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
  const gender = document.getElementById('gender');
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
    gender.innerHTML = user.gender;
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
    alert('再来一次');
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
    alert("发消息了");
  }

  addRequest.onerror = function() {
    alert("没发");
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

document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.endsWith("log_in.html")) {
    if (sessionStorage.getItem("log_username")) {
      logInConvenient();
    }
  }
});




