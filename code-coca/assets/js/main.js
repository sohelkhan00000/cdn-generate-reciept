let moblNav = document.getElementById("side-menu");
let linkbtn = document.getElementById("nav-mobile");

linkbtn.addEventListener("click", () => {
    moblNav.classList.toggle("d-block");
});