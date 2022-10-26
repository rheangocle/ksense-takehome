// references to important DOM elements
// const tableBody = document.querySelector(".tableBody");
window.onload = function () {
  const usersTable = document.getElementById("usersTable");
  const tableRow = document.getElementById("tableRow");
  const postSection = document.getElementById("userPosts");
  let userLink;
  // handle displaying user data to page

  // handle displaying post data to page
  function displayUsers() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (response.ok) return response.json();
        else throw new Error("User data cannot be retrieved.");
      })
      .then((data) => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          let rowItem = document.createElement("tr");
          rowItem.innerHTML = `
        
        ${data[i].name}
        `;
          rowItem.dataset.userId = data[i].id;
          rowItem.addEventListener("click", (e) => displayUserPosts(e));
          tableRow.appendChild(rowItem);
        }
      });
  }

  // handle button click
  const usernameButton = document.getElementById("");

  function displayUserPosts(e) {
    postSection.innerHTML = "";
    const userId = e.target.dataset.userId;
    console.log(userId);
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((response) => {
        if (response.ok) return response.json();
        else throw new Error("User data cannot be retrieved.");
      })
      .then((data) => {
        console.log(data);
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

          //       post += `
          //   <div class="card">
          //   <div class="card-body">
          //   <h5 class="card-title">${data[i].title}</h5>
          //   <p class="card-text">${data[i].body}</p>
          //   <a href="#" class="btn btn-primary">Go somewhere</a>
          // </div>
          //   </div>
          //   `;
          postSection.append(post);
        }
      });
  }
  displayUsers();
};
