const URL = "http://localhost:3000/space-pictures";
const dailyURL = "https://go-apod.herokuapp.com/apod";

const dailyImage = document.querySelector('#daily-image');

function getPicture(url){
    return fetch(url)
        .then(resp => resp.json())
}

getPicture(dailyURL).then(console.log);