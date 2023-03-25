class formControls {
   
    constructor()
    {
        this['template-1'] = document.getElementById('template-1');
        this['template-2'] = document.getElementById('template-2');
        this['templates'] = document.querySelectorAll("[name='templates']");
        this['fs-logo'] = document.querySelectorAll("[name='fs-logo']");
        this['download-pdf'] = document.getElementById("download-pdf");
        this['form-control'] = document.querySelectorAll('.form-control');
        this['fs-date'] = document.getElementById('fs-date');
        this['fs-time'] = document.getElementById('fs-time');
        this['vat-none'] = document.getElementById('vat-none');
        this['vat-type'] = document.querySelectorAll("[name='vat-type']");
        this['vat-number'] = document.getElementById("vat-number");
        this['fs-station-name'] = document.getElementById("fs-station-name");
        this['fs-address'] = document.getElementById("fs-address");
        this['fs-fuel-rate'] = document.getElementById("fs-fuel-rate");
        this['fs-amount'] = document.getElementById("fs-amount");
        this['u-name'] = document.getElementById("u-name");
        this['u-vechicle-number'] = document.getElementById("u-vechicle-number");
        this['u-vehicle-type'] = document.getElementById("u-vehicle-type");
        this['u-payment-type'] = document.getElementById("u-payment-type");
        this['fs-receipt-number'] = document.getElementById("fs-receipt-number");
        this['spinner-grow'] = document.querySelector(".spinner-grow");
        this['download-text'] = document.querySelector(".download-text");
        this['select-template'] = document.querySelector(".select-template");
        this['bill-container'] = document.querySelectorAll(".bill-container");
    }
}

let objFormControls = {};
let objErrorControls = {};
let objTemplateControls = {};

/* controls end */

let date = new Date();
let selectedTemplate ;



var readyPage = (template) => {

    objTemplateControls = {
        'tele-number': document.querySelectorAll(".tele-number"),
        'vat-type': document.querySelectorAll(".vat-type"),
        'templates': document.querySelectorAll('.templates')
    };
    objFormControls = new formControls();
    for (let i in objFormControls) {
        if (document.querySelector("p[data-error=" + i + "]")) {
            objErrorControls[i] = document.querySelector("p[data-error=" + i + "]")
        }

        if (document.querySelector("[data-tm=" + i + "]") && i != "template-1" && i != "template-2") {
            objTemplateControls[i] = document.querySelectorAll("[data-tm=" + i + "]");
        }
        if (i == "template-1" || i == "template-2") {
            objTemplateControls[i] = document.querySelector("[data-tm=" + i + "]");
        }

    }

    selectedTemplate = objTemplateControls[template]
    objTemplateControls['templates'].forEach(e =>{
        e.classList.add("d-none");
    })
    selectedTemplate.classList.remove("d-none");
    objFormControls[template].checked = true;

    objFormControls["fs-station-name"].value = "Bharat Petroleum";
    objTemplateControls['fs-station-name'].forEach(e =>{
        e.innerHTML = "Bharat Petroleum";
    })

    objFormControls['fs-date'].value = date.toISOString().substring(0, 10);
    objFormControls['fs-time'].value = date.toISOString().substring(11, 16);

    objTemplateControls['fs-date'].forEach((e)=>{
        e.innerHTML = date.toISOString().substring(0, 10);
    });

    objTemplateControls['fs-time'].forEach((e)=>{
        e.innerHTML = date.toISOString().substring(11, 16);
    });
  
    let rnum = Math.floor(1000 + Math.random() * 9000);
    objTemplateControls['fs-receipt-number'].forEach((e)=>{
        e.innerHTML = rnum;
    })
    objFormControls["fs-receipt-number"].value = rnum;
    
    let telnum = Math.floor(1000000 + Math.random() * 9000000);
    objTemplateControls['tele-number'].forEach((e)=>{
        e.innerHTML = telnum;
    })
   
    objTemplateControls['u-vehicle-type'].forEach(e =>{
        e.innerHTML = objFormControls["u-vehicle-type"].options[objFormControls["u-vehicle-type"].selectedIndex].value;
    });

    objTemplateControls['u-payment-type'].forEach(e =>{
        e.innerHTML = objFormControls["u-payment-type"].options[objFormControls["u-payment-type"].selectedIndex].value;
    });


}
readyPage('template-2');


objFormControls["fs-logo"].forEach(i => i.addEventListener(
    "click",
    (e) => {
        const words = e.currentTarget.id.slice(10).replace("-", " ").split(" ");
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }
        objFormControls["fs-station-name"].value = words.join(" ");
        

        objTemplateControls['fs-station-name'].forEach((el) => {
            el.innerHTML = words.join(" ");
        })

        objTemplateControls['fs-logo'].forEach((el) => {
            el.src = "https://sohelkhan00000.github.io/cdn-generate-reciept/assets/images/bill/" + e.currentTarget.id + ".webp";
        })

    }));

objFormControls['vat-type'].forEach(i => i.addEventListener(
    "click",
    (e) => {
        if (e.currentTarget.id == "vat-none") {
            objTemplateControls['vat-none'].forEach((el) => {
                el.classList.add("d-none")
            });

            objFormControls['vat-number'].classList.add("d-none");

        }
        else {
            objFormControls['vat-number'].classList.remove("d-none");

            objTemplateControls['vat-none'].forEach((el) => {
                el.classList.remove("d-none");
            });

            objTemplateControls['vat-type'].forEach((el) => {
                el.innerHTML = e.target.id.slice(4).toLocaleUpperCase() + " NO: "

            });

            objTemplateControls['vat-number'].forEach((el) => {
                el.innerHTML = objFormControls['vat-number'].value;
            });
        }

    }));

objFormControls["form-control"].forEach(function (i) {
    ['keyup', 'change'].forEach(function(e) {
        i.addEventListener(e, function(){
           let ele = document.querySelectorAll("." +i.id);
           ele.forEach((e)=>{
                e.innerHTML  = i.value;;
           })
        });
      });
});

objFormControls['templates'].forEach(i => i.addEventListener("click", (e) => {
    partialLoad((suc,msg)=>{
        if(suc)
        {
            readyPage('template-1');
            objFormControls["form-control"].forEach((em)=>{
                let ele = document.querySelectorAll("." +em.id);
           
                ele.forEach((et)=>{
                     et.innerHTML  = em.value;
                })
            });
            
        }
        else{
            console.log(msg)
        }

    });

    objFormControls['templates'].forEach((el) => {
        if (el.id != i.id) {
            objTemplateControls[i.id].classList.remove("d-none");
            selectedTemplate = objTemplateControls[i.id];
            objTemplateControls[el.id].classList.add("d-none");

        }
    })
}));

var checkValidation = (value, type, name, callBack) => {
    if (type == "Name") {
        var DisgitFinder = /\d/g;
        var NonWordCorrentorFinder = /\W/g;

        if (value == "") {

            callBack(false, name + " cannot be  empty!");
            return false;
        }
        else if (value.length > 35) {

            callBack(false, name + " cannot be more than 35 characters!");
            return false;

        }
        else if (DisgitFinder.test(value)) {

            callBack(false, name + " cannot contain numbers and space!");
            return false;

        }

        callBack(true, name + " validated successfully!");
        return true;
    }
    else if (type == "Empty") {
        if (value == "") {
            callBack(false, name + " cannot be empty!");
            return false;
        }
        callBack(true, name + " validated successfully!");
        return true;
    }
}

var addDynamicData = (callBack) => {
    let isControlsValid = true;

    checkValidation(objFormControls['fs-station-name'].value, "Empty", "Station name", function (nameSuc, nameMsg) {
        if (!nameSuc) {
          
           objErrorControls['fs-station-name'].innerHTML = nameMsg;
           objErrorControls['fs-station-name'].style.display = "block"
        }
        else {
            objErrorControls['fs-station-name'].style.display = "none";
        }
    });

    checkValidation(objFormControls["fs-address"].value, "Empty", "Address", function (nameSuc, nameMsg) {
        if (!nameSuc) {
            objErrorControls['fs-address'].innerHTML = nameMsg;
            objErrorControls['fs-address'].style.display = "block"
        }
        else {
            objErrorControls['fs-address'].style.display = "none";
        }
    });

    checkValidation(objFormControls["fs-fuel-rate"].value, "Empty", "Fuel rate", function (nameSuc, nameMsg) {
        if (!nameSuc) {
            objErrorControls['fs-fuel-rate'].innerHTML = nameMsg;
            objErrorControls['fs-fuel-rate'].style.display = "block"
        }
        else {
            objErrorControls['fs-fuel-rate'].style.display = "none";
        }
    });

    checkValidation(objFormControls["fs-amount"].value, "Empty", "Amount", function (nameSuc, nameMsg) {
        if (!nameSuc) {
            objErrorControls['fs-amount'].innerHTML = nameMsg;
            objErrorControls['fs-amount'].style.display = "block"
        }
        else {
            objErrorControls['fs-amount'].style.display = "none";
        }
    });

    checkValidation(objFormControls["u-name"].value, "Name", "Costomer name", function (nameSuc, nameMsg) {
        if (!nameSuc) {
            objErrorControls['u-name'].innerHTML = nameMsg;
            objErrorControls['u-name'].style.display = "block"
        }
        else {
            objErrorControls['u-name'].style.display = "none";
        }
    });

    checkValidation(objFormControls["u-vechicle-number"].value, "Empty", "Vechical number", function (nameSuc, nameMsg) {
        if (!nameSuc) {
            objErrorControls['u-vechicle-number'].innerHTML = nameMsg;
            objErrorControls['u-vechicle-number'].style.display = "block"
        }
        else {
            objErrorControls['u-vechicle-number'].style.display = "none";
        }
    });

    let checkAllvalidation = document.getElementsByClassName("validation-message");

    Object.keys(checkAllvalidation).some(function (k) {
        if (checkAllvalidation[k].style.display == "block") {
            var headerOffset;
            checkAllvalidation[k].id == "ErrorAdress" ? headerOffset = 130 : headerOffset = 80;

            var elementPosition = checkAllvalidation[k].getBoundingClientRect().top;
            var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
            isControlsValid = false;
            checkAllvalidation[k].previousElementSibling.focus()
            
            return true;
        }
      
    });

    if(isControlsValid)
    {
        callBack(true, "Template ready");
    }
    else
    {
        callBack(false, "Template not ready");
    }

}

var resetPage = (callBack)=>{

    objFormControls["spinner-grow"].style.display = "none";
    objFormControls['download-text'].innerHTML = "Download";

};

var partialLoad = (callback) => {
    let files = document.querySelectorAll('script');
    let found = false;

    files.forEach(e=>{
        if(e.src.replace(/^.*[\\\/]/, '') == 'partial-fuel-receipt.js')
        {
            found = true;
            return;
        }
    })

    if (!found) {

        const script = document.createElement('script');
        script.src = server.serverPath + 'assets/js/partialPage/partial-fuel-receipt' + server.serverScript;
       // script.src = 'https://sohelkhan00000.github.io/cdn-generate-reciept/assets/js/partialPage/partial-fuel-receipt.js';
        script.async = true;

        script.onload = () => {

            objTemplateControls['template-1'].innerHTML = template.code;
            callback(true, 'Script loaded successfuly');
        };
        script.onerror = () => {

            callback(false, 'Error occurred while loading script');

        };
        document.body.appendChild(script);
    }
    
}

objFormControls["download-pdf"].addEventListener("click", () => {
    addDynamicData((suc, msg) => {
        
        if (suc) {
            
            objFormControls["spinner-grow"].style.display = "inline-block";
            objFormControls['download-text'].innerHTML = "PDF Generating...";

            
            var options = {
                jsPDF: {
                    format: 'a4',
                    orientation: 'portrait'
                },
                html2canvas: { letterRendering: true, useCORS: true, logging: true, scrollX: 0, scrollY: 0 },
                margin: 0,
                image: { type: 'jpeg', quality: 1.1 }
            };


            html2pdf().set(options).from(selectedTemplate).toPdf().save("Fuel bill by Generate Receipt").then((data) => {
                // console.log("PDF success");
                resetPage();
                gtag('event', 'Bill PDF download', {
                    'eventCategory': 'category_value',
                    'dimension5': 'custom data'

                });


            }).catch((err) => {
                console.log("PDF Error " + err)
            })
        }
       
    })
});


