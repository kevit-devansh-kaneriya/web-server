const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageone.textContent = 'Loading...'
    messagetwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            if (data.error) {
                messageone.textContent = data.error;
            } else {
                messageone.textContent = data.location;
                messagetwo.textContent = data.forecast;
            }
        })
        .catch((error) => {
            messageone.textContent = 'Error: ' + error.message;
        });

})