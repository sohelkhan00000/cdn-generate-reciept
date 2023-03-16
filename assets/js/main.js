let moblNav = document.getElementById("nav-links");
let linkbtn = document.getElementById("linkmblmenu");

linkbtn.addEventListener("click", () => {
    moblNav.classList.toggle("d-block");
});