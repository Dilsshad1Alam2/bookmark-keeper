const showModal = document.querySelector(".show-modal");
const displayModal = document.querySelector(".modal-container");
const websiteName = document.querySelector("#website-name");
const websiteUrl = document.querySelector("#website-url");
const formButton = document.querySelector(".form-button");
const bookmarkForm = document.querySelector(".bookmark-form");
const modalCross = document.querySelector(".modal-cross");

let bookmarks = [];

//To show the modal after clicking add bookmarks

function toShowModal() {
  displayModal.classList.add("display-modal");
  websiteName.focus();
}

// To remove modal from the screen
function toRemoveClass() {
  displayModal.classList.remove("display-modal");
}
function removeClassOnOutsideClick(e) {
  e.target === displayModal
    ? displayModal.classList.remove("display-modal")
    : false;
}

// To validate form

function validate(nameValue,urlValue){
  const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

  const regex = new RegExp(expression);
 
  if (!nameValue || !urlValue) {
    alert('Please submit values for both fields.');
    return false;
  }
  if (!urlValue.match(regex)) {
    alert('Please provide a valid web address.');
    return false;
  }
  // Valid
  return true;
  
}

//Fetching the bookmarks if available

function fetchBookmarks(){

if ( localStorage.getItem('bookmarks')) {
  bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
  console.log(bookmarks)
}
else{
  //setting a default bookmarks
bookmarks = [{
  name: 'Dilshad',
  url: 'dilshad.com',
},
];
localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}
console.log(bookmarks);

}



//Form
function storeBookmark(e) {
  e.preventDefault();
  const nameValue = websiteName.value;
  let urlValue = websiteUrl.value;

  if (!urlValue.includes("https://") && !urlValue.includes("http://")) {
    urlValue = `https://${urlValue}`;
  }
  
  if (!validate(nameValue,urlValue)) {
    return false;
  }

  //
  const bookmark = {
    name: nameValue,
    url: urlValue,
  };

  bookmarks.push(bookmark);
  bookmarkForm.reset();
  websiteName.focus();
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();

}



//Modal Event listeners
showModal.addEventListener("click", toShowModal);
modalCross.addEventListener("click", toRemoveClass);
window.addEventListener("click", removeClassOnOutsideClick);

//Form Event listeners
bookmarkForm.addEventListener("submit", storeBookmark);
fetchBookmarks();
