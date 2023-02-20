var billDate = document.getElementById('billDate');
var billTime = document.getElementById('billTime');
const toggleSpinner = document.querySelector("#downloadPDF .spinner-grow");
const toggleDownload = document.querySelector("#downloadPDF .download-text");
var date = new Date();
const changeLogo = document.querySelectorAll("[name='flexRadiologo']");
const changecst = document.querySelectorAll("[name='flexRadioCST']");
const liveEdit = document.querySelectorAll(".form-control");
//const liveAddress = document.querySelectorAll("[type='text']");
const logoImage = document.querySelector(".logo");
const downloadPDF = document.getElementById("downloadPDF");
const cstNumber = document.getElementById("cstNumber");
const cstNumberText = document.querySelector(".cst-number-text");
const receiptNumber = document.querySelector(".receipt-number");
const templateBillDate = document.querySelector(".bill-date");
const templateBillTime = document.querySelector(".bill-time");
const templateTeleNumber = document.querySelector(".tele-number");

let isControlsValid = true;
const objCombine = {
    inputStationName : "pump-name",
    textboxAddress : "pump-address",
    inputFuelRate : "fuel-rate",
    inputAmount : "fuel-amount",
    billDate : "bill-date",
    billTime : "bill-time",
    inputCustomerName : "customer-name",
    inputVechical : "vehical-number",
    inputVehcleType : "vehical-type",
    inputPaymentType : "cash-type",
    inputInvoiceNumber : "receipt-number"
}

var readyPage = () => {

    try{
    var title = document.querySelector("title")
    if(title)
    {
        title.innerHTML = "Free fuel bills";
    }
    

    var metaKeyword = document.querySelector("meta[name='keywords']")
    metaKeyword.content = "free fuel bills, free petrol bills, free diesel bills, free cng bills";

    var metaDiscription = document.querySelector("meta[name='description']")
    metaDiscription.content = "Free download fuel bills pdf without login and email";
    }
    catch(err){
        console.log("Error : " + err)
    }




    billDate.value = date.toISOString().substring(0, 10);
    billTime.value = date.toISOString().substring(11, 16); 
    templateBillDate.innerHTML = date.toISOString().substring(0, 10);
    templateBillTime.innerHTML = date.toISOString().substring(11, 16); 
    receiptNumber.innerHTML = Math.floor(1000 + Math.random() * 9000);
    templateTeleNumber.innerHTML = Math.floor(1000000 + Math.random() * 9000000);


}
readyPage();

changeLogo.forEach(i => i.addEventListener(
    "click",
    (e) => {
        if (e.currentTarget.id == "logo-bharat-petroleum") {
            logoImage.src = "https://sohelkhan00000.github.io/cdn-generate-reciept/images/bill/bharat-petrol-logo.png";
        }
        else if (e.currentTarget.id == "logo-indian-oil") {
            logoImage.src = "https://sohelkhan00000.github.io/cdn-generate-reciept/images/bill/indian-oil.png";
        }
        else if (e.currentTarget.id == "logo-hp-oil") {
            logoImage.src = "https://sohelkhan00000.github.io/cdn-generate-reciept/images/bill/HP-petroleum.png";
        }
        else if (e.currentTarget.id == "logo-essar-oil") {
            logoImage.src = "https://sohelkhan00000.github.io/cdn-generate-reciept/images/bill/essar-oil.png";
        }
    }));

changecst.forEach(i => i.addEventListener(
    "click",
    (e) => {
        if (e.currentTarget.id == "cst-none") {

            cstNumber.style.display = "none";
            cstNumberText.style.display = "none";
        }
        else {
            cstNumber.style.display = "block";
            cstNumberText.style.display = "block";
        }

    }));


liveEdit.forEach(function (i) {
    ['keyup', 'change'].forEach(function(e) {
        i.addEventListener(e, function(){
            objCombine[i.id]
            document.querySelector("." + objCombine[i.id]).innerHTML = i.value;
        });
      });
});

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
            // EleValidationMassage.innerHTML ="Field cannot be empty!"
            callBack(false, name + " cannot be empty!");
            return false;
        }
        //EleValidationMassage.innerHTML =""
        callBack(true, name + " validated successfully!");
        return true;
    }
}

var addDynamicData = (callBack) => {
    // user contrls
    let inputStationName = document.getElementById("inputStationName");
    let textboxAddress = document.getElementById("textboxAddress");
    let inputFuelRate = document.getElementById("inputFuelRate");
    let inputAmount = document.getElementById("inputAmount");
    let billDate = document.getElementById("billDate");
    let billTime = document.getElementById("billTime");
    let inputCustomerName = document.getElementById("inputCustomerName");
    let inputVechical = document.getElementById("inputVechical");
    let inputVehcleType = document.getElementById("inputVehcleType");
    let inputPaymentType = document.getElementById("inputPaymentType");
    let inputInvoiceNumber = document.getElementById("inputInvoiceNumber");


    // validation error message Control
    let ErrorStationName = document.getElementById("ErrorStationName");
    let ErrorAdress = document.getElementById("ErrorAdress");
    let ErrorFuelRate = document.getElementById("ErrorFuelRate");
    let ErrorAmount = document.getElementById("ErrorAmount");
    let ErrorBillDate = document.getElementById("ErrorBillDate");
    let ErrorBillTime = document.getElementById("ErrorBillTime");
    let ErrorCustomerName = document.getElementById("ErrorCustomerName");
    let ErrorVechical = document.getElementById("ErrorVechical");
    let ErrorVechleType = document.getElementById("ErrorVechleType");
    let ErrorPaymentType = document.getElementById("ErrorPaymentType");
    let ErrorInvoiceNumber = document.getElementById("ErrorInvoiceNumber");


    checkValidation(inputStationName.value, "Empty", "Station name", function (nameSuc, nameMsg) {
        if (!nameSuc) {
            ErrorStationName.innerHTML = nameMsg;
            ErrorStationName.style.display = "block"
        }
        else {
            ErrorStationName.style.display = "none";
        }
    });

    checkValidation(textboxAddress.value, "Empty", "Address", function (nameSuc, nameMsg) {
        if (!nameSuc) {
            ErrorAdress.innerHTML = nameMsg;
            ErrorAdress.style.display = "block"
        }
        else {
            ErrorAdress.style.display = "none";
        }
    });

    checkValidation(inputFuelRate.value, "Empty", "Fuel rate", function (nameSuc, nameMsg) {
        if (!nameSuc) {
            ErrorFuelRate.innerHTML = nameMsg;
            ErrorFuelRate.style.display = "block"
        }
        else {
            ErrorFuelRate.style.display = "none";
        }
    });

    checkValidation(inputAmount.value, "Empty", "Amount", function (nameSuc, nameMsg) {
        if (!nameSuc) {
            ErrorAmount.innerHTML = nameMsg;
            ErrorAmount.style.display = "block"
        }
        else {
            ErrorAmount.style.display = "none";
        }
    });

    checkValidation(inputCustomerName.value, "Name", "Costomer name", function (nameSuc, nameMsg) {
        if (!nameSuc) {
            ErrorCustomerName.innerHTML = nameMsg;
            ErrorCustomerName.style.display = "block"
        }
        else {
            ErrorCustomerName.style.display = "none";
        }
    });

    checkValidation(inputVechical.value, "Empty", "Vechical number", function (nameSuc, nameMsg) {
        if (!nameSuc) {
            ErrorVechical.innerHTML = nameMsg;
            ErrorVechical.style.display = "block"
        }
        else {
            ErrorVechical.style.display = "none";
        }
    });

    let checkAllvalidation = document.getElementsByClassName("validation-message");
    isControlsValid = true;

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

            checkAllvalidation[k].previousElementSibling.focus()
            isControlsValid = false
            return true;
        }
    });

    if (isControlsValid) {
        // template controls
        let pumpname = document.querySelector('.pump-name');
        let pumpaddress = document.querySelector('.pump-address');
        let fuelrate = document.querySelector('.fuel-rate');
        let cstnumber = document.querySelector('.cst-number');
        let telenumber = document.querySelector('.tele-number');
        let fuelamount = document.querySelector('.fuel-amount');
        let billdate = document.querySelector('.bill-date');
        let billtime = document.querySelector('.bill-time');
        let customername = document.querySelector('.customer-name');
        let vehicalnumber = document.querySelector('.vehical-number');
        let vehicaltype = document.querySelector('.vehical-type');
        let cashtype = document.querySelector('.cash-type');


        // fill data from form to template
        pumpname.innerHTML = inputStationName.value;
        pumpaddress.innerHTML = textboxAddress.value;
        fuelrate.innerHTML = inputFuelRate.value;
        cstnumber.innerHTML = inputAmount.value;
        telenumber.innerHTML = inputStationName.value;
        fuelamount.innerHTML = inputAmount.value;
        billdate.innerHTML = billDate.value;
        billtime.innerHTML = billTime.value;
        customername.innerHTML = inputCustomerName.value;
        vehicalnumber.innerHTML = inputVechical.value;
        vehicaltype.innerHTML = inputVehcleType.value;
        cashtype.innerHTML = inputPaymentType.value;
        callBack(true, "Template ready");
    }
    else{
        callBack(false, "Template not ready");
    }
}

var resetPage = (callBack)=>{
    toggleSpinner.style.display = "none";
    toggleDownload.innerHTML = "Download";
};

// var generatePDF = ()=>{
//     addDynamicData((suc, msg)=>{
//             alert(suc);
//     })
// }

downloadPDF.addEventListener("click", () => {
    addDynamicData((suc, msg) => {
        
        if (suc) {
            toggleSpinner.style.display = "inline-block";
            toggleDownload.innerHTML = "PDF Generating...";


            const element = document.getElementById('billContainer');
            var options = {
                jsPDF: {
                    format: 'a4',
                    orientation: 'portrait'
                },
                html2canvas: { letterRendering: true, useCORS: true, logging: true, scrollX: 0, scrollY: 0 },
                margin: 0,
                image: { type: 'jpeg', quality: 0.50 }
            };


            html2pdf().set(options).from(element).toPdf().save("Fuel bill by Generate Receipt").then((data) => {
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
        else{
            console.log(msg)
        }
    })
});


