document.querySelector(".hamburger").addEventListener("click", function () {
  const navbar = document.querySelector(".navbar_container");
  navbar.classList.toggle("active");
});

const users = JSON.parse(localStorage.getItem("object")) || [];

const submitButton = document.querySelector("button[type='submit']");
submitButton.addEventListener("click", function (e) {
  e.preventDefault();

  const emailValue = document.querySelector("#email").value;
  const passwordValue = document.querySelector("#password").value;

  let isLoggedIn = false;

  for (let userIndex = 0; userIndex < users.length; userIndex++) {
    const user = users[userIndex];
    if (user.email === emailValue && user.password === passwordValue) {
      isLoggedIn = true;

      window.location.href = `data_show.html?id=${user.id}`;
      break;
    }
  }

  if (!isLoggedIn) {
    alert("Please enter valid credentials");
  }
});
