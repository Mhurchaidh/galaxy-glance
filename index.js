const URL = "http://localhost:3000/space-pictures";
const dailyURL = "https://go-apod.herokuapp.com/apod";

const dailyImage = document.querySelector('#daily-image');
const pictureDatesList = document.querySelector('#picture-dates-list');


function getPicture(url){
    return fetch(url)
        .then(resp => resp.json())
}

function iteratePictures(pictureArray){
    pictureArray.forEach(addPictures);
}

function addPictures(picObject){
    const dateItem = document.createElement('li');
    dateItem.textContent = picObject.date;
    dateItem.addEventListener('click', () => {
        dailyImage.innerHTML = '';
        renderPicture(picObject)});
    pictureDatesList.append(dateItem);
}

function renderPicture(spaceObject){
    const image = document.createElement('img');
    image.setAttribute('id', 'space-image');
    image.setAttribute('src', spaceObject.hdurl);
    dailyImage.append(image);
}

getPicture(URL).then(pictureArray => {
    iteratePictures(pictureArray);
    renderPicture(pictureArray[pictureArray.length -1]);
})