let moblNav = document.getElementById("nav-links");
let linkbtn = document.getElementById("linkmblmenu");

<<<<<<< HEAD
linkbtn.addEventListener("click",()=>{
    moblNav.classList.toggle("d-block");
});

function lazyLoading() {

    if(!islazyLoadingDone)
    {
        islazyLoadingDone = true;
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        script.async = true;
    
        script.onload = () => {
            islazyLoadingDone = true;
            console.log('Script loaded successfuly');
        };
        script.onerror = () => {
            islazyLoadingDone = false;
            console.log('Error occurred while loading script');
        };
        document.body.appendChild(script);
    }

}

eleBody[0].addEventListener("click", ()=>{
    lazyLoading();
=======
linkbtn.addEventListener("click", () => {
    moblNav.classList.toggle("d-block");
>>>>>>> 8b0bef559b83d6e519b5c8de0105b64a5fb04d16
});