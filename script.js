const showModal = document.querySelector('.show-modal');
const displayModal = document.querySelector('.modal-container');
const toFocus = document.querySelector('#to-focus');
const modalCross = document.querySelector('.modal-cross');


function toShowModal(){
console.log('working');
displayModal.classList.add('display-modal');
toFocus.focus();
}

function toRemoveClass(){
    displayModal.classList.remove('display-modal'); 
}

showModal.addEventListener('click',toShowModal);
modalCross.addEventListener('click',toRemoveClass);
window.addEventListener('click',(e)=>{
    console.log(e.target)
    e.target === displayModal ? displayModal.classList.remove('display-modal') : false;
})