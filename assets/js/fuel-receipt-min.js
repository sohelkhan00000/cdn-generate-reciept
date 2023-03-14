class formControls{constructor(){this["template-1"]=document.getElementById("template-1"),this["template-2"]=document.getElementById("template-2"),this.templates=document.querySelectorAll("[name='templates']"),this["fs-logo"]=document.querySelectorAll("[name='fs-logo']"),this["download-pdf"]=document.getElementById("download-pdf"),this["form-control"]=document.querySelectorAll(".form-control"),this["fs-date"]=document.getElementById("fs-date"),this["fs-time"]=document.getElementById("fs-time"),this["vat-none"]=document.getElementById("vat-none"),this["vat-type"]=document.querySelectorAll("[name='vat-type']"),this["vat-number"]=document.getElementById("vat-number"),this["fs-station-name"]=document.getElementById("fs-station-name"),this["fs-address"]=document.getElementById("fs-address"),this["fs-fuel-rate"]=document.getElementById("fs-fuel-rate"),this["fs-amount"]=document.getElementById("fs-amount"),this["u-name"]=document.getElementById("u-name"),this["u-vechicle-number"]=document.getElementById("u-vechicle-number"),this["u-vehicle-type"]=document.getElementById("u-vehicle-type"),this["u-payment-type"]=document.getElementById("u-payment-type"),this["fs-receipt-number"]=document.getElementById("fs-receipt-number"),this["spinner-grow"]=document.querySelector(".spinner-grow"),this["download-text"]=document.querySelector(".download-text"),this["select-template"]=document.querySelector(".select-template"),this["bill-container"]=document.querySelectorAll(".bill-container")}}let objFormControls={},objErrorControls={},objTemplateControls={},date=new Date,selectedTemplate;var readyPage=e=>{for(let t in objTemplateControls={"tele-number":document.querySelectorAll(".tele-number"),"vat-type":document.querySelectorAll(".vat-type"),templates:document.querySelectorAll(".templates")},objFormControls=new formControls)document.querySelector("p[data-error="+t+"]")&&(objErrorControls[t]=document.querySelector("p[data-error="+t+"]")),document.querySelector("[aria-labelledby="+t+"]")&&"template-1"!=t&&"template-2"!=t&&(objTemplateControls[t]=document.querySelectorAll("[aria-labelledby="+t+"]")),("template-1"==t||"template-2"==t)&&(objTemplateControls[t]=document.querySelector("[aria-labelledby="+t+"]"));selectedTemplate=objTemplateControls[e],objTemplateControls.templates.forEach(e=>{e.classList.add("d-none")}),selectedTemplate.classList.remove("d-none"),objFormControls[e].checked=!0,objFormControls["fs-station-name"].value="Bharat Petroleum",objTemplateControls["fs-station-name"].forEach(e=>{e.innerHTML="Bharat Petroleum"}),objFormControls["fs-date"].value=date.toISOString().substring(0,10),objFormControls["fs-time"].value=date.toISOString().substring(11,16),objTemplateControls["fs-date"].forEach(e=>{e.innerHTML=date.toISOString().substring(0,10)}),objTemplateControls["fs-time"].forEach(e=>{e.innerHTML=date.toISOString().substring(11,16)});let o=Math.floor(1e3+9e3*Math.random());objTemplateControls["fs-receipt-number"].forEach(e=>{e.innerHTML=o}),objFormControls["fs-receipt-number"].value=o;let r=Math.floor(1e6+9e6*Math.random());objTemplateControls["tele-number"].forEach(e=>{e.innerHTML=r}),objTemplateControls["u-vehicle-type"].forEach(e=>{e.innerHTML=objFormControls["u-vehicle-type"].options[objFormControls["u-vehicle-type"].selectedIndex].value}),objTemplateControls["u-payment-type"].forEach(e=>{e.innerHTML=objFormControls["u-payment-type"].options[objFormControls["u-payment-type"].selectedIndex].value})};readyPage("template-2"),objFormControls["fs-logo"].forEach(e=>e.addEventListener("click",e=>{let t=e.currentTarget.id.slice(10).replace("-"," ").split(" ");for(let o=0;o<t.length;o++)t[o]=t[o][0].toUpperCase()+t[o].substr(1);objFormControls["fs-station-name"].value=t.join(" "),objTemplateControls["fs-station-name"].forEach(e=>{e.innerHTML=t.join(" ")}),objTemplateControls["fs-logo"].forEach(t=>{t.src="https://sohelkhan00000.github.io/cdn-generate-reciept/assets/images/bill/"+e.currentTarget.id+".png"})})),objFormControls["vat-type"].forEach(e=>e.addEventListener("click",e=>{"vat-none"==e.currentTarget.id?(objTemplateControls["vat-none"].forEach(e=>{e.classList.add("d-none")}),objFormControls["vat-number"].classList.add("d-none")):(objFormControls["vat-number"].classList.remove("d-none"),objTemplateControls["vat-none"].forEach(e=>{e.classList.remove("d-none")}),objTemplateControls["vat-type"].forEach(t=>{t.innerHTML=e.target.id.slice(4).toLocaleUpperCase()+" NO: "}),objTemplateControls["vat-number"].forEach(e=>{e.innerHTML=objFormControls["vat-number"].value}))})),objFormControls["form-control"].forEach(function(e){["keyup","change"].forEach(function(t){e.addEventListener(t,function(){document.querySelectorAll("."+e.id).forEach(t=>{t.innerHTML=e.value})})})}),objFormControls.templates.forEach(e=>e.addEventListener("click",t=>{partialLoad((e,t)=>{e?(readyPage("template-1"),objFormControls["form-control"].forEach(e=>{document.querySelectorAll("."+e.id).forEach(t=>{t.innerHTML=e.value})})):console.log(t)}),objFormControls.templates.forEach(t=>{t.id!=e.id&&(objTemplateControls[e.id].classList.remove("d-none"),selectedTemplate=objTemplateControls[e.id],objTemplateControls[t.id].classList.add("d-none"))})}));var checkValidation=(e,t,o,r)=>{if("Name"==t){var l=/\d/g,n=/\W/g;return""==e?(r(!1,o+" cannot be  empty!"),!1):e.length>35?(r(!1,o+" cannot be more than 35 characters!"),!1):l.test(e)?(r(!1,o+" cannot contain numbers and space!"),!1):(r(!0,o+" validated successfully!"),!0)}if("Empty"==t)return""==e?(r(!1,o+" cannot be empty!"),!1):(r(!0,o+" validated successfully!"),!0)},addDynamicData=e=>{let t=!0;checkValidation(objFormControls["fs-station-name"].value,"Empty","Station name",function(e,t){e?objErrorControls["fs-station-name"].style.display="none":(objErrorControls["fs-station-name"].innerHTML=t,objErrorControls["fs-station-name"].style.display="block")}),checkValidation(objFormControls["fs-address"].value,"Empty","Address",function(e,t){e?objErrorControls["fs-address"].style.display="none":(objErrorControls["fs-address"].innerHTML=t,objErrorControls["fs-address"].style.display="block")}),checkValidation(objFormControls["fs-fuel-rate"].value,"Empty","Fuel rate",function(e,t){e?objErrorControls["fs-fuel-rate"].style.display="none":(objErrorControls["fs-fuel-rate"].innerHTML=t,objErrorControls["fs-fuel-rate"].style.display="block")}),checkValidation(objFormControls["fs-amount"].value,"Empty","Amount",function(e,t){e?objErrorControls["fs-amount"].style.display="none":(objErrorControls["fs-amount"].innerHTML=t,objErrorControls["fs-amount"].style.display="block")}),checkValidation(objFormControls["u-name"].value,"Name","Costomer name",function(e,t){e?objErrorControls["u-name"].style.display="none":(objErrorControls["u-name"].innerHTML=t,objErrorControls["u-name"].style.display="block")}),checkValidation(objFormControls["u-vechicle-number"].value,"Empty","Vechical number",function(e,t){e?objErrorControls["u-vechicle-number"].style.display="none":(objErrorControls["u-vechicle-number"].innerHTML=t,objErrorControls["u-vechicle-number"].style.display="block")});let o=document.getElementsByClassName("validation-message");Object.keys(o).some(function(e){if("block"==o[e].style.display){r="ErrorAdress"==o[e].id?130:80;var r,l=o[e].getBoundingClientRect().top+window.pageYOffset-r;return window.scrollTo({top:l,behavior:"smooth"}),t=!1,o[e].previousElementSibling.focus(),!0}}),t?e(!0,"Template ready"):e(!1,"Template not ready")},resetPage=e=>{objFormControls["spinner-grow"].style.display="none",objFormControls["download-text"].innerHTML="Download"},partialLoad=e=>{let t=document.querySelectorAll("script"),o=!1;if(t.forEach(e=>{if("partial-fuel-receipt.js"==e.src.replace(/^.*[\\\/]/,"")){o=!0;return}}),!o){let r=document.createElement("script");r.src="https://sohelkhan00000.github.io/cdn-generate-reciept/assets/js/partialPage/partial-fuel-receipt.js",r.async=!0,r.onload=()=>{objTemplateControls["template-1"].innerHTML=template.code,e(!0,"Script loaded successfuly")},r.onerror=()=>{e(!1,"Error occurred while loading script")},document.body.appendChild(r)}};objFormControls["download-pdf"].addEventListener("click",()=>{addDynamicData((e,t)=>{if(e){objFormControls["spinner-grow"].style.display="inline-block",objFormControls["download-text"].innerHTML="PDF Generating...";var o={jsPDF:{format:"a4",orientation:"portrait"},html2canvas:{letterRendering:!0,useCORS:!0,logging:!0,scrollX:0,scrollY:0},margin:0,image:{type:"jpeg",quality:1.1}};html2pdf().set(o).from(selectedTemplate).toPdf().save("Fuel bill by Generate Receipt").then(e=>{resetPage(),gtag("event","Bill PDF download",{eventCategory:"category_value",dimension5:"custom data"})}).catch(e=>{console.log("PDF Error "+e)})}else console.log(t)})});