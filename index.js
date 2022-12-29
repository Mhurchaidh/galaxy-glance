const URL = "http://localhost:3000/space-pictures";
const dailyURL = "https://go-apod.herokuapp.com/apod";

const dailyImage = document.querySelector('#daily-image');


function getPicture(url){
    return fetch(url)
        .then(resp => resp.json())
}

function renderPicture(spaceObject){
    image = document.createElement('img');
    image.setAttribute('id', 'space-image');
    image.setAttribute('src', spaceObject.hdurl);
    dailyImage.append(image);
}

getPicture(dailyURL).then(object => {
    renderPicture(object);
})