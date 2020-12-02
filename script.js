const showModal = document.querySelector('.show-modal');
const displayModal = document.querySelector('.modal-container');
const websiteName = document.querySelector('#website-name');
const websiteUrl = document.querySelector('#website-url');
const formButton = document.querySelector('.form-button');
const bookmarkForm = document.querySelector('.bookmark-form');
const modalCross = document.querySelector('.modal-cross');

//To show the modal after clicking add bookmarks

function toShowModal(){
console.log('working');
displayModal.classList.add('display-modal');
websiteName.focus();
}

// To remove modal from the screen
function toRemoveClass(){
    displayModal.classList.remove('display-modal'); 
}
function removeClassOnOutsideClick(e){
    e.target === displayModal ? displayModal.classList.remove('display-modal') : false;
}

//Form 
function storeBookmark(e){
    e.preventDefault();
    const nameValue = websiteName.value;
    let urlValue = websiteUrl.value;

    if(!urlValue.includes('https://') && !urlValue.includes('http://')){
        urlValue = `https://${urlValue}`;
    }

    console.log(nameValue);
    console.log(urlValue);
}


//Modal Event listeners
showModal.addEventListener('click',toShowModal);
modalCross.addEventListener('click',toRemoveClass);
window.addEventListener('click',removeClassOnOutsideClick)

//Form Event listeners
bookmarkForm.addEventListener('submit',storeBookmark);