const form = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const myLocationButton = document.querySelector('#my-location');

form.addEventListener('submit', (e) => {

    e.preventDefault();
    messageOne.textContent = 'Loading'; 
    messageTwo.textContent = ''; 

    const location = search.value;
    fetch(`/weather?address=${location}`).then(response => {
        response.json().then(data => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }

        })
    })
})

document.querySelector('#my-location').addEventListener('click', (e) => {
    e.preventDefault();
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser.');
    }

    myLocationButton.setAttribute('disabled', 'disabled');
    navigator.geolocation.getCurrentPosition((position) => {
        const {coords: {longitude, latitude}} = position;
        fetch(`/weather/me?longitude=${longitude}&latitude=${latitude}`).then(response => {
            response.json().then(data => {
                if (data.error) {
                    messageOne.textContent = data.error;
                } else {
                    messageOne.textContent = data.location;
                    messageTwo.textContent = data.forecast;
                }
                myLocationButton.removeAttribute('disabled');
    
            })
        })
    })
})