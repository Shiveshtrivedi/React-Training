const val = JSON.parse(localStorage.getItem("object"))||[];
console.log(val);
const url = new URL(window.location.href);
const userId = url.searchParams.get("id");
// const userData = val.find(user => user.id === userId);
const formData=val[userId-1];
  console.log("id ",userId);
  console.log("Name:", formData.name);
  console.log("Email:", formData.email);
  console.log("Mobile:", formData.mobile);
  console.log("Gender:", formData. genderValue);
  console.log("Bio:", formData.bio);
  console.log("Role:", formData.role);
const formDataContainer = document.getElementById("datashow_form-data");
formDataContainer.style.flex=1;
formDataContainer.innerHTML = "";

Object.keys(formData).forEach((key) => {
  if (key !== 'id' && key !== 'password') {
  const div = document.createElement("div");
  div.innerHTML = `
       <h2 class="field-name">${key}</h2>
        <p class="field-value">${formData[key]}</p>
    `;
    div.style.display='flex'
    div.style.flexDirection='column'
    div.style.height='3rem'
    div.style.justifyContent='center'
    div.style.alignItems='center'
    div.style.flex=1;
  formDataContainer.appendChild(div);
  }
});
document.getElementById('hamburger').addEventListener('click', function() {
  const navbar = document.querySelector('.navbar_container');
  navbar.classList.toggle('active'); 
});