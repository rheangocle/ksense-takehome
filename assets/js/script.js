// references to important DOM elements
// const tableBody = document.querySelector(".tableBody");
const usersTable = document.getElementById("usersTable");

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
        rowItem.innerHTML = `${data[i].name}`;
        usersTable.appendChild(rowItem);
      }
    });
}

displayUsers();
