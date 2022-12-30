const URL = "http://localhost:3000/space-pictures";
const dailyURL = "https://go-apod.herokuapp.com/apod";

const dailyImage = document.querySelector('#daily-image');
const pictureDatesList = document.querySelector('#picture-dates-list');
const pictureInfo = document.querySelector('#picture-info');

function getPicture(url){
    return fetch(url)
        .then(resp => resp.json())
}

function iteratePictures(pictureArray){
    pictureArray.forEach(addPictures);
}

function addPictures(picObject){
    const dateItem = document.createElement('li');
    dateItem.textContent = `${picObject.date}`;
    dateItem.addEventListener('click', () => {
        dailyImage.innerHTML = '';
        pictureInfo.innerHTML = '';
        renderPicture(picObject)});
    dateItem.addEventListener('mouseover', () => dateItem.style.color = 'cyan');
    dateItem.addEventListener('mouseout', () => dateItem.style.color = 'white');
    pictureDatesList.append(dateItem);
}

function renderPicture(spaceObject){
    const image = document.createElement('img');
    const title = document.createElement('h2');
    const explanation = document.createElement('p');
    const copyright = document.createElement('em');

    copyright.textContent = `Copyright: ${spaceObject.copyright}`;
    explanation.textContent = spaceObject.explanation;
    title.textContent = ` - ${spaceObject.title} -`;

    image.setAttribute('id', 'space-image');
    image.setAttribute('src', spaceObject.hdurl);

    dailyImage.append(image);
    pictureInfo.append(title, explanation, copyright);
}

//#region - TESTING -
// function addDailyPicture(responseObject){
//     const todaysDate = responseObject.date;
//     getPicture(URL).then(pictureArray => {
//         const printDate = pictureArray.find(element => element.date === todaysDate)
//         if(printDate){
//             iteratePictures(pictureArray);
//             renderPicture(pictureArray[pictureArray.length -1]);
//             return;
//         }
//         else{
//             postDailyPicture(responseObject)
//         }
//     });
    
// }

// function postDailyPicture(pictureObject){
//     const config = {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         },
//         body: JSON.stringify(pictureObject)
//     }
//     return fetch(URL, config)
//         .then(response => response.json())
    
//     console.log(pictureObject)
// }

// function getDailyPicture(url){
//     return fetch(url)
//         .then(resp => resp.json());
// }

// getDailyPicture(dailyURL).then(resp => addDailyPicture(resp))
//#endregion

getPicture(URL).then(pictureArray => {
    iteratePictures(pictureArray);
    renderPicture(pictureArray[pictureArray.length -1]);
})


