const showModal = document.querySelector(".show-modal");
const displayModal = document.querySelector(".modal-container");
const websiteName = document.querySelector("#website-name");
const websiteUrl = document.querySelector("#website-url");
const formButton = document.querySelector(".form-button");
const bookmarkForm = document.querySelector(".bookmark-form");
const modalCross = document.querySelector(".modal-cross");
const bookmarksContainer  = document.querySelector('.bookmark-container')

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

function validate(nameValue, urlValue) {
  const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

  const regex = new RegExp(expression);

  if (!nameValue || !urlValue) {
    alert("Please submit values for both fields.");
    return false;
  }
  if (!urlValue.match(regex)) {
    alert("Please provide a valid web address.");
    return false;
  }
  // Valid
  return true;
}


function deleteBookmark(url) {
  // Loop through the bookmarks array
  bookmarks.forEach((bookmark, i) => {
    if (bookmark.url === url) {
      bookmarks.splice(i, 1);
    }
  });
  // Update bookmarks array in localStorage, re-populate DOM
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
}

//Building bookmarks DOM elements
function buildBookmarks() {
  bookmarksContainer.textContent = '';
  bookmarks.forEach((bookmark) => {
    const { name, url } = bookmark;

    //building dom

    const itemDiv  = document.createElement('div');
    itemDiv.classList.add('item');

    const closeIcon = document.createElement('i');
    closeIcon.classList.add('fas','fa-times','to-delete-bookmark');
    closeIcon.setAttribute('tilte','Delete Bookmark');
    closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);

    const linkThroughFavicon = document.createElement('a');
    linkThroughFavicon.setAttribute('href',`${url}`);

    const faviconImage = document.createElement('img');
    faviconImage.setAttribute('src',`https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
    faviconImage.setAttribute('alt',name);

    const bookmarkNameDiv = document.createElement('div');
    bookmarkNameDiv.classList.add('name');
    
    const bookmarkNamelink = document.createElement('a');
    bookmarkNamelink.setAttribute('href',`${url}`);
    bookmarkNamelink.setAttribute('target','_blank');
    bookmarkNamelink.textContent = name;

    linkThroughFavicon.append(faviconImage);
    bookmarkNameDiv.append(bookmarkNamelink);
    itemDiv.append(closeIcon,linkThroughFavicon,bookmarkNameDiv);

    bookmarksContainer.appendChild(itemDiv);

  });
}

//Fetching the bookmarks if available
function fetchBookmarks() {
  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    console.log('test')
  } else {
    //setting a default bookmarks
    bookmarks = [
      {
        name: "Google",
        url: "https://google.com",
      },
    ];
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    console.log('code reaching here')
  }

  buildBookmarks();
}

//Form
function storeBookmark(e) {
  e.preventDefault();
  const nameValue = websiteName.value;
  let urlValue = websiteUrl.value;

  if (!urlValue.includes("https://") && !urlValue.includes("http://")) {
    urlValue = `https://${urlValue}`;
  }

  if (!validate(nameValue, urlValue)) {
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


