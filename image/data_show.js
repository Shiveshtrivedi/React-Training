const val = JSON.parse(localStorage.getItem("object")) || [];
const url = new URL(window.location.href);
const userId = url.searchParams.get("id");

const formData = val[userId - 1];
const formDataContainer = document.getElementById("datashow_form-data");
formDataContainer.style.flex = 1;
formDataContainer.innerHTML = "";

Object.keys(formData).forEach((key) => {
  if (key !== "id" && key !== "password") {
    const div = document.createElement("div");
    div.innerHTML = `
       <h2 class="field-name">${key}</h2>
        <p class="field-value">${formData[key]}</p>
    `;
    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.height = "3rem";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.flex = 1;
    formDataContainer.appendChild(div);
  }
});
document.querySelector(".hamburger").addEventListener("click", function () {
  const navbar = document.querySelector(".navbar_container");
  navbar.classList.toggle("active");
});
