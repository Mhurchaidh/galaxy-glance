const URL = "http://localhost:3000/space-pictures";
const dailyURL = "https://go-apod.herokuapp.com/apod";

let currPicture;
let previousDate;
let datesArray = [];

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
const commentTextArea = document.querySelector('#comment');
const submitFormButton = document.querySelector('#submit-button');

function getPicture(url){
    return fetch(url)
        .then(resp => resp.json())
}

function iteratePictures(pictureArray){
    pictureArray.forEach(addPictures);
    datesArray[datesArray.length - 1].id = 'currentDate';
}

function addPictures(picObject){
    const dateItem = document.createElement('li');
    dateItem.setAttribute('class', 'dateLi');
    dateItem.setAttribute('id', '');
    dateItem.textContent = `${picObject.date}`;
    dateItem.addEventListener('click', () => {
        commentsList.innerHTML = '';
        const datesList = document.querySelectorAll('.dateLi');
        datesList.forEach(element => element.id = '');
        highlightDate(dateItem);
        renderPicture(picObject);
    });
    dateItem.addEventListener('mouseover', () => dateItem.style.color = 'rgb(93, 0, 255)');
    dateItem.addEventListener('mouseout', () => dateItem.style.color = 'white');
    pictureDatesList.append(dateItem);
    datesArray.push(dateItem);
}

function highlightDate(currDate){
    currDate.id = 'currentDate';
}

function renderPicture(spaceObject){
    currPicture = spaceObject;
    copyright.textContent = `Copyright: ${spaceObject.copyright}`;
    explanation.textContent = spaceObject.explanation;
    title.textContent = `- ${spaceObject.title} -`;
    image.src = spaceObject.hdurl;
    currPicture.comments.forEach(index => renderComments(index));
}


getPicture(URL).then(pictureArray => {
    iteratePictures(pictureArray);
    renderPicture(pictureArray[pictureArray.length -1]);
})

commentForm.addEventListener('submit', addNewComment)

function addNewComment(e){
    e.preventDefault();
    if(commentTextArea.value.length !== 0) {
        currPicture.comments.push(commentForm.comment.value);
        commentsList.innerHTML = "";
        patchComments(currPicture).then(resp => resp.comments.forEach(index => renderComments(index)))
        commentForm.reset();
    }
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
