const submitButton = document.querySelector("button[type='submit']");
let formdata = JSON.parse(localStorage.getItem("object")) || [];
submitButton.addEventListener("click", function (e) {
  e.preventDefault();
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const mobile = document.querySelector("#mobile").value;
  const radio = document.querySelectorAll('input[name="gender"]');
  let genderValue = null;

  for (let i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      genderValue = radio[i].value;
      break;
    }
  }

  const password = document.querySelector("#password").value;
  const bio = document.querySelector("#bio").value;
  const role = document.querySelector("#role").value;
  const userId = formdata.length + 1; 
  const mobileNumberLimit = 10;

  if (name === '' || mobile === '' || bio === '' || password === '' || genderValue === null) {
    alert("All fields are required");
  } else if (mobile.length !== mobileNumberLimit) {
    alert(`Mobile number must be exactly ${mobileNumberLimit} digits long.`);
  } else {
    // Validate password
    const upperCase = /[A-Z]/.test(password);
    const lowerCase = /[a-z]/.test(password);
    const digit = /\d/.test(password);
    const specialChar = /[!@#$%^&*()_+~`|}{[\]:;?><,./-]/.test(password);
    const length = password.length >= 8;

    function validateEmail(email) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
      return emailRegex.test(email);
    }

    if (upperCase && lowerCase && digit && specialChar && length && validateEmail(email)) {
      formdata.push({
        id: userId,
        name,
        email,
        mobile,
        genderValue,
        bio,
        role,
        password
      });
      console.log("form data is ", formdata);
      localStorage.setItem("object", JSON.stringify(formdata));
      window.location.href = `data_show.html?id=${userId}`;
    } else {
      if (!validateEmail(email)) {
        alert('Please enter a valid Gmail email address.');
      } else {
        alert('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.');
      }
    }
  }
});

document.getElementById('hamburger').addEventListener('click', function() {
  const navbar = document.querySelector('.navbar_container');
  navbar.classList.toggle('active'); 
});