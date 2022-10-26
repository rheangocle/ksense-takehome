const usersTable = document.getElementById("usersTable");
const tableRow = document.getElementById("tableRow");
const postSection = document.getElementById("userPosts");
let userLink;

// Retrieve user data from api
function getUsers() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      if (response.ok) return response.json();
      else throw new Error("User data cannot be retrieved.");
    })
    .then((data) => {
      console.log(data);
      renderUsers(data);
    });
}

// Display username data to page
function renderUsers(data) {
  for (let i = 0; i < data.length; i++) {
    let rowItem = document.createElement("tr");
    let userLink = document.createElement("a");
    userLink.innerHTML = `
    ${data[i].name}
    `;

    userLink.dataset.userId = data[i].id;
    userLink.addEventListener("click", (e) => getUserPosts(e));
    rowItem.appendChild(userLink);
    tableRow.appendChild(rowItem);
  }
}

// Retrieve posts from user from api
function getUserPosts(e) {
  // Clear previous information
  postSection.innerHTML = "";
  const userId = e.target.dataset.userId;

  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then((response) => {
      if (response.ok) return response.json();
      else throw new Error("User data cannot be retrieved.");
    })
    .then((data) => {
      console.log(data);
      renderUserPosts(data);
    });
}

// Display user's posts to page
function renderUserPosts(data) {
  for (let i = 0; i < data.length; i++) {
    let post = document.createElement("div");
    post.classList.add("card");
    let postCard = document.createElement("div");
    postCard.classList.add("card-body");

    let postTitle = document.createElement("h5");
    postTitle.classList.add("card-title");
    let postBody = document.createElement("p");
    postBody.classList.add("card-text");

    postTitle.innerHTML = data[i].title;
    postBody.innerHTML = data[i].body;

    post.appendChild(postCard);
    postCard.appendChild(postTitle);
    postCard.appendChild(postBody);

    postSection.append(post);
  }
}

// initiatialize function
getUsers();
