
let rasm1 = document.querySelector(".rasm1");
let rasm2 = document.querySelector(".rasm2");
let rasm3 = document.querySelector(".rasm3");

function photoChangeToRasm1() {
    rasm1.classList.remove("hidden");
    rasm2.classList.add("hidden");
    rasm3.classList.add("hidden");
}

function photoChangeToRasm2() {
    rasm1.classList.add("hidden");
    rasm2.classList.remove("hidden");
    rasm2.classList.add(`data-aos="fade-up"`)
    rasm3.classList.add("hidden");
}

function photoChangeToRasm3() {
    rasm1.classList.add("hidden");
    rasm2.classList.add("hidden");
    rasm3.classList.remove("hidden");
}




const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  mobileMenu.classList.toggle("flex");
});






