let db;
const request = indexedDB.open('UserDatabase', 1);

request.onsuccess = function(event) {
    db = event.target.result;

    setupLevelButtons();
};

function setupLevelButtons() {
    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); 

            const levelId = this.id;
            const transaction = db.transaction(['users'], 'readonly');
            const objectStore = transaction.objectStore('users');
            const userRequest = objectStore.get(sessionStorage.getItem('username'));

            userRequest.onsuccess = function(event) {
                const user = userRequest.result;
                if (user.levelFollower[levelId]) {

                    window.location.href = button.querySelector('a').href;
                } else {
                    alert('This level is locked. Complete the previous levels to unlock it.');
                }
            };

            userRequest.onerror = function(event) {
                console.log('Failed to retrieve user data:', event);
            };
        });
    });
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
        };

        updateRequest.onerror = function(event) {
            console.log('Failed to update user data:', event);
        };
    };

    userRequest.onerror = function(event) {
        console.log('Failed to retrieve user data:', event);
    };
}
