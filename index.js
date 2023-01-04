const URL = "http://localhost:3000/space-pictures";
const dailyURL = "https://go-apod.herokuapp.com/apod";

let currPicture;

const dailyImage = document.querySelector('#daily-image');
const pictureDatesList = document.querySelector('#picture-dates-list');
const pictureInfo = document.querySelector('#picture-info');
const commentForm = document.querySelector('#comment-form');
const commentsList = document.querySelector('#comments-list');
const commentLi = document.querySelector('#commentLi');
const image = document.querySelector('#space-image');
const title = document.querySelector('#title');
const explanation = document.querySelector('#explanation');
const copyright = document.querySelector('#copyright');

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
        commentsList.innerHTML = '';
        renderPicture(picObject)
    });
    dateItem.addEventListener('mouseover', () => dateItem.style.color = 'rgb(93, 0, 255)');
    dateItem.addEventListener('mouseout', () => dateItem.style.color = 'white');
    pictureDatesList.append(dateItem);
}

function renderPicture(spaceObject){
    currPicture = spaceObject;
    console.log(currPicture.comments)
    copyright.textContent = `Copyright: ${spaceObject.copyright}`;
    explanation.textContent = spaceObject.explanation;
    title.textContent = `- ${spaceObject.title} -`;
    image.src = spaceObject.hdurl;
    currPicture.comments.forEach(index => renderComments(index));
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

commentForm.addEventListener('submit', addNewComment)

function addNewComment(e){
    e.preventDefault();
    currPicture.comments.push(commentForm.comment.value);
    commentsList.innerHTML = "";
    patchComments(currPicture).then(renderPicture)
    commentForm.reset();
}

function renderComments(index){
    const newComment = document.createElement('li');
    newComment.textContent = index;
    commentsList.append(newComment);
}

function patchComments(picObject){
    const config = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(picObject)
    }
    
    return fetch(URL + `/${currPicture.id}`, config)
        .then(resp => {
            if(resp.ok){
                return resp.json();
            }
        });
}
