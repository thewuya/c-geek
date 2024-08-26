function checkAnswer(event) {
    event.preventDefault(); 
    
    const correctAnswer = "option3";
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    const username = sessionStorage.getItem('username'); 

    if (selectedOption) {
        if (selectedOption.value === correctAnswer) {
            alert("恭喜！你答对了！");
            
            const request = indexedDB.open('users', 1);

            request.onsuccess = function(event) {
                const db = event.target.result;
                const transaction = db.transaction(['users'], 'readwrite');
                const objectStore = transaction.objectStore('users');
                
                const getRequest = objectStore.get(username);

                getRequest.onsuccess = function() {
                    const userData = getRequest.result;

                    if (userData) {
                        
                        userData.experience += 2;
                        

                        const updateRequest = objectStore.put(userData);

                        updateRequest.onsuccess = function() {
                            alert("You have gained 2 experience points!");
                        };

                        updateRequest.onerror = function() {
                            console.log('Error updating experience:', updateRequest.error);
                        };
                    } else {
                        console.log('User data not found.');
                    }
                };

                getRequest.onerror = function() {
                    console.log('Error retrieving user data:', getRequest.error);
                };
            };

            request.onerror = function(event) {
                console.log('Error opening IndexedDB:', event.target.errorCode);
            };

        } else {
            alert("很遗憾，答案错误。再试一次！");
        }
    } else {
        alert("请选择一个选项！");
    }
}
