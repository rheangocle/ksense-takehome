const usersTable = document.getElementById("usersTable");
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
    })
    .catch((error) => {
      console.error("Error fetching the data: ", error);
    });
}

// Display username data to page
function renderUsers(data) {
  for (let i = 0; i < data.length; i++) {
    let tableRow = document.createElement("tr");
    let rowItem = document.createElement("td");
    let userLink = document.createElement("a");
    userLink.innerHTML = `
    ${data[i].name}
    `;

    userLink.dataset.userId = data[i].id;
    userLink.addEventListener("click", (e) => getUserPosts(e));
    rowItem.appendChild(userLink);
    tableRow.appendChild(rowItem);
    usersTable.appendChild(tableRow);
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
    })
    .catch((error) => {
      console.error("Error fetching posts data: ", error);
    });
}

// Display user's posts to page
function renderUserPosts(data) {
  for (let i = 0; i < data.length; i++) {
    let postCard = document.createElement("div");
    postCard.classList.add("card");

    let postTitle = document.createElement("h5");
    postTitle.classList.add("card-header", "bg-secondary");
    let postBody = document.createElement("p");
    postBody.classList.add("card-body");

    postTitle.innerHTML = data[i].title;
    postBody.innerHTML = data[i].body;

    postCard.appendChild(postTitle);
    postCard.appendChild(postBody);

    postSection.append(postCard);
  }
}

// initiatialize function
getUsers();
