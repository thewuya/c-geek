let db;
const request = indexedDB.open('UserDatabase', 1);

request.onsuccess = function(event) {
    db = event.target.result;
    if (!checkUserLoggedIn()) {
        return;
      }
    setupLevelButtons();
};

function setupLevelButtons() {
    const buttons = document.querySelectorAll('button');
    const transaction = db.transaction(['users'], 'readonly');
    const objectStore = transaction.objectStore('users');
    const userRequest = objectStore.get(sessionStorage.getItem('username'));

    userRequest.onsuccess = function(event) {
        const user = userRequest.result;
        
        buttons.forEach(button => {
            const levelId = button.id;
            if (user.levelFollower[levelId]) {
                button.style.backgroundColor = '#4CAF50'; // Green for unlocked
            } else {
                button.style.backgroundColor = 'red'; // Red for locked
            }

            button.addEventListener('click', function(event) {
                event.preventDefault(); 

                if (user.levelFollower[levelId]) {
                    window.location.href = button.querySelector('a').href;
                } else {
                    alert('This level is locked. Complete the previous levels to unlock it.');
                }
            });
        });
    };

    userRequest.onerror = function(event) {
        console.log('Failed to retrieve user data:', event);
    };
}

function unlockNextLevel(username, completedLevel) {
    const transaction = db.transaction(['users'], 'readwrite');
    const objectStore = transaction.objectStore('users');

    const userRequest = objectStore.get(username);

    userRequest.onsuccess = function(event) {
        const user = userRequest.result;
        const nextLevel = `level_${parseInt(completedLevel.split('_')[1]) + 1}`;

        if (user.levelFollower[nextLevel] === false) {
            user.levelFollower[nextLevel] = true;
        }

        const updateRequest = objectStore.put(user);

        updateRequest.onsuccess = function(event) {
            console.log('User data updated successfully.');
            setupLevelButtons(); // Refresh button colors after update
        };

        updateRequest.onerror = function(event) {
            console.log('Failed to update user data:', event);
        };
    };

    userRequest.onerror = function(event) {
        console.log('Failed to retrieve user data:', event);
    };
}

function checkUserLoggedIn() {
    const username = sessionStorage.getItem('username');
    if (!username) {
      alert('请先登录！'); 
      window.location.href = 'log_in.html';
      return false;
    }
    return true;
  }