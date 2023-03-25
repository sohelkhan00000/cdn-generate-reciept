<<<<<<< HEAD
let moblNav=document.getElementById("nav-links"),linkbtn=document.getElementById("linkmblmenu"),eleBody=document.getElementsByTagName("body"),islazyLoadingDone=!1;function lazyLoading(){if(!islazyLoadingDone){islazyLoadingDone=!0;let e=document.createElement("script");e.src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js",e.async=!0,e.onload=()=>{islazyLoadingDone=!0,console.log("Script loaded successfuly")},e.onerror=()=>{islazyLoadingDone=!1,console.log("Error occurred while loading script")},document.body.appendChild(e)}}linkbtn.addEventListener("click",()=>{moblNav.classList.toggle("d-block")}),eleBody[0].addEventListener("click",()=>{lazyLoading()});
=======
let moblNav=document.getElementById("nav-links"),linkbtn=document.getElementById("linkmblmenu");linkbtn.addEventListener("click",()=>{moblNav.classList.toggle("d-block")});
>>>>>>> 8b0bef559b83d6e519b5c8de0105b64a5fb04d16
