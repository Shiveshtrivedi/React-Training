document.getElementById('hamburger').addEventListener('click', function() {
    const navbar = document.querySelector('.navbar_container');
    navbar.classList.toggle('active'); 
});

let users = JSON.parse(localStorage.getItem('object')) || [];

const submitButton = document.querySelector("button[type='submit']");
submitButton.addEventListener("click", function(e) {
    e.preventDefault(); 

    const emailValue = document.querySelector("#email").value;
    const passwordValue = document.querySelector("#password").value;

    let isLoggedIn = false;

    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (user.email === emailValue && user.password === passwordValue) {
            isLoggedIn = true;
            console.log("Login success");

            window.location.href = `data_show.html?id=${user.id}`;
            break;
        }
    }

    if (!isLoggedIn) {
        console.log("Login failed");
        alert("Please enter valid credentials")
    }
});
