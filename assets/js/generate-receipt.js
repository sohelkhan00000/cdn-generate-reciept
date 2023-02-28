let xstartDate;
let xendDate;
let isControlsValid = true;


const toggleSpinner = document.querySelector("#downloadPDF .spinner-grow");
const toggleDownload = document.querySelector("#downloadPDF .download-text");
const button = document.getElementById('downloadPDF');
const mainContainer = document.getElementById('allSlips');
const inputRenterName = document.getElementById("inputRenterName");



function getMonthShortName(monthNo) {
    const date = new Date();
    date.setMonth(monthNo - 1);
    return date.toLocaleString('en-US', { month: 'short' });
}

function addMonths(paraStartDate, paraEndDate, monthSlot) {
    Date.isLeapYear = function (year) {
        return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
    };

    Date.getDaysInMonth = function (year, month) {
        return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    };

    Date.prototype.isLeapYear = function () {
        return Date.isLeapYear(this.getFullYear());
    };

    Date.prototype.getDaysInMonth = function () {
        return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
    };

    Date.prototype.addMonths = function (value) {
        var n = this.getDate();
        this.setDate(1);
        this.setMonth(this.getMonth() + value);
        this.setDate(Math.min(n, this.getDaysInMonth()));
        return this;
    };

    var startDate = new Date(paraStartDate);
    var endDate = new Date(paraEndDate);
    var dataObject = [];
    var storeLastDate;
    var myDate = new Date(startDate);
    var isLoop = false;

    var result1 = myDate.addMonths(monthSlot);
    storeLastDate = new Date(result1)
    result1.setDate(result1.getDate() - 1);


    if (endDate <= storeLastDate) {
        dataObject[0] = { start: startDate, end: endDate }
        isLoop = false;
        // exit loop
    }
    else {
        dataObject[0] = { start: startDate, end: result1 }
        isLoop = true
        // loop continue
    }


    if (isLoop) {

        for (let i = 1; dataObject[dataObject.length - 1].end < endDate; i++) {

            let firstDate = new Date(storeLastDate)
            myDate = new Date(storeLastDate);
            var result1 = myDate.addMonths(monthSlot);
            storeLastDate = new Date(result1)
            result1.setDate(result1.getDate() - 1);


            if (endDate <= storeLastDate) {
                dataObject[i] = { start: firstDate, end: endDate }

                // exit loop
            }
            else {

                dataObject[i] = { start: firstDate, end: result1 }
                // loop continue
            }

        }

    }

    /* section 2 */

    // format all dates to YYYY-MM-DD
    dataObject.forEach((indexValue, i, array) => {

        array[i] = { start: indexValue.start.toLocaleDateString("af-ZA", { year: 'numeric', month: '2-digit', day: '2-digit' }), end: indexValue.end.toLocaleDateString("af-ZA", { year: 'numeric', month: '2-digit', day: '2-digit' }) }

    });

    return dataObject;
}

function checkValidation(value, type, name, callBack) {

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

function addDynamicData() {

    // user contrls
  
    let inputRent = document.getElementById("inputRent");
    let textboxAddress = document.getElementById("textboxAddress");
    let inputOwnerName = document.getElementById("inputOwnerName");
    let inputOwnerPan = document.getElementById("inputOwnerPan");
    let flexRadioMonthly = document.getElementById("flexRadioMonthly");
    let dataPickerFrom = document.getElementById("dataPickerFrom");
    let dataPickerTo = document.getElementById("dataPickerTo");


    // validation error message Control
    let pdfNameError = document.getElementById("pdfNameError");
    let pdfRentError = document.getElementById("pdfRentError");
    let pdfAddressError = document.getElementById("pdfAddressError");
    let pdfOwnerError = document.getElementById("pdfOwnerError");
    let pdfOwnerPanError = document.getElementById("pdfOwnerPanError");
    let pdfDateFromError = document.getElementById("pdfDateFromError");
    let pdfDateToError = document.getElementById("pdfDateToError");

    checkValidation(inputRenterName.value, "Name", "Name", function (nameSuc, nameMsg) {
        if (!nameSuc) {
            pdfNameError.innerHTML = nameMsg;
            pdfNameError.style.display = "block"
        }
        else {
            pdfNameError.style.display = "none";
        }
    });

    checkValidation(inputRent.value, "Empty", "Rent", function (nameSuc, nameMsg) {
        if (!nameSuc) {
            pdfRentError.innerHTML = nameMsg;
            pdfRentError.style.display = "block"
        }
        else {
            pdfRentError.style.display = "none"
        }
    });

    checkValidation(textboxAddress.value, "Empty", "Address", function (nameSuc, nameMsg) {
        if (!nameSuc) {
            pdfAddressError.innerHTML = nameMsg;
            pdfAddressError.style.display = "block"
        }
        else {
            pdfAddressError.style.display = "none"
        }
    });

    checkValidation(inputOwnerName.value, "Name", "Owner's name", function (nameSuc, nameMsg) {
        if (!nameSuc) {
            pdfOwnerError.innerHTML = nameMsg;
            pdfOwnerError.style.display = "block"
        }
        else {
            pdfOwnerError.style.display = "none"
        }
    });

    checkValidation(dataPickerFrom.value, "Empty", "Date", function (nameSuc, nameMsg) {
        if (!nameSuc) {
            pdfDateFromError.innerHTML = nameMsg;
            pdfDateFromError.style.display = "block"
        }
        else {
            pdfDateFromError.style.display = "none"
        }
    });

    checkValidation(dataPickerTo.value, "Empty", "Date", function (nameSuc, nameMsg) {
        if (!nameSuc) {
            pdfDateToError.innerHTML = nameMsg;
            pdfDateToError.style.display = "block"
        }
        else {
            pdfDateToError.style.display = "none"
        }
    });


    let checkAllvalidation = document.getElementsByClassName("validation-message");
    isControlsValid = true;

    Object.keys(checkAllvalidation).some(function (k) {
        if (checkAllvalidation[k].style.display == "block") {
            // do something
            // document.getElementsByClassName(k).scrollIntoView();

            var headerOffset;
            checkAllvalidation[k].id == "pdfAddressError" ? headerOffset = 130 : headerOffset = 80;

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

    //  pdf controls
    let pdfRenterName = document.getElementById("pdfRenterName");
    let pdfRent = document.getElementById("pdfRent");
    let pdfAddress = document.getElementById("pdfAddress");
    let pdfLandlordName = document.getElementById("pdfLandlordName");
    let pdfLandlordPan = document.getElementById("pdfLandlordPan");
    //let pdfFlexRadioMonthly = document.getElementById("flexRadioMonthly");
    let pdfDateFrom = document.getElementById("pdfDateFrom");
    let pdfDateTo = document.getElementById("pdfDateTo");

    let pdfCurrentMonth = document.getElementById("pdfCurrentMonth");
    let pdfReceiptNumber = document.getElementById("pdfReceiptNumber");
    let pdfGenerateDate = document.getElementById("pdfGenerateDate");


    pdfRenterName.innerHTML = inputRenterName.value;
    pdfRent.innerHTML = inputRent.value;
    pdfAddress.innerHTML = textboxAddress.value;
    pdfLandlordName.innerHTML = inputOwnerName.value;
    pdfLandlordPan.innerHTML = inputOwnerPan.value;

    xstartDate = dataPickerFrom.value
    xendDate = dataPickerTo.value;


    if (isControlsValid) {
        let monthlyCheck = document.getElementById("flexRadioMonthly");
        let monthSlot = 1;
        if (!monthlyCheck.checked) {
            monthSlot = 3;
        }

        let allDates = addMonths(xstartDate, xendDate, monthSlot);
        let today = new Date().toString()
        today = today.slice(4, 15)
        allDates.forEach((indexValue, index, array) => {
            if (array.length == 1) {

                pdfDateFrom.innerHTML = indexValue.start;
                pdfDateTo.innerHTML = indexValue.end;
                pdfCurrentMonth.innerHTML = getMonthShortName(indexValue.start.slice(5, 7)) + " " + indexValue.start.slice(0, 4);
                pdfReceiptNumber.innerHTML = "1";
                pdfGenerateDate.innerHTML = today;
            }
            else {

                if (index == 0) {
                    pdfDateFrom.innerHTML = indexValue.start;
                    pdfDateTo.innerHTML = indexValue.end;
                    pdfCurrentMonth.innerHTML = getMonthShortName(indexValue.start.slice(5, 7)) + " " + indexValue.start.slice(0, 4);
                    pdfReceiptNumber.innerHTML = "1";
                    pdfGenerateDate.innerHTML = today;
                }
                else {
                    
                    var element = document.getElementById('invoice1');
                    var element2 = element.cloneNode(true);
                    element2.id = "invoice" + (index + 1);
                    mainContainer.appendChild(element2);

                    document.querySelector("#invoice" + (index + 1) + "  #pdfDateFrom").innerHTML = indexValue.start;
                    document.querySelector("#invoice" + (index + 1) + "  #pdfDateTo").innerHTML = indexValue.end;
                    document.querySelector("#invoice" + (index + 1) + "  #pdfCurrentMonth").innerHTML = getMonthShortName(indexValue.start.slice(5, 7)) + " " + indexValue.start.slice(0, 4);
                    document.querySelector("#invoice" + (index + 1) + "  #pdfReceiptNumber").innerHTML = (index + 1);
                    document.querySelector("#invoice" + (index + 1) + "  #pdfGenerateDate").innerHTML = today;

                    if ((index + 1) % 3 == 0 && index != 0) {

                        generateAdd();

                        const pageBreaker = document.createElement("div");
                        pageBreaker.setAttribute("class", "html2pdf__page-break");
                        mainContainer.appendChild(pageBreaker);
                        // document.querySelector("#invoice" + index).style.marginBottom = "100px";

                    }


                }
                
            }

            if((index + 1) % 3 != 0 && (index + 1) == array.length)
            {
                generateAdd();
            }
        })
    }

}

function resetPage(callBack){

    toggleSpinner.style.display = "none";
    toggleDownload.innerHTML = "Download";
    const elements = document.getElementsByClassName("invoice");
    while (elements.length > 1) {
        elements[1].parentNode.removeChild(elements[1]);
    }

    const pageBreaker = document.getElementsByClassName("html2pdf__page-break");
    while (pageBreaker.length > 0) {
        pageBreaker[0].parentNode.removeChild(pageBreaker[0]);
    }
    const pageAdd = document.getElementsByClassName("page-add");
    while (pageAdd.length > 0) {
        pageAdd[0].parentNode.removeChild(pageAdd[0]);
    }
}

function generateAdd(){
    const pageAdd = document.createElement("div");
    pageAdd.setAttribute("class", "page-add");
    pageAdd.innerHTML = "Generated by https://www.generatereceipt.blogspot.com";
    mainContainer.appendChild(pageAdd);
}

function generatePDF() {
    addDynamicData()

    if (isControlsValid) {

        toggleSpinner.style.display = "inline-block";
        toggleDownload.innerHTML = "PDF Generating...";
        const element = document.getElementById('allSlips');
        var options = {
            jsPDF: {
                format: 'a4',
                orientation: 'portrait'
            },
            html2canvas: { letterRendering: true, useCORS: true, logging: true, scrollX: 0, scrollY: 0 },
            margin: 0,
            image: { type: 'jpeg', quality: 0.98 }
        };


        html2pdf().set(options).from(element).toPdf().save("Rent receipt by Generate Receipt").then((data) => {
            resetPage();
            gtag('event', 'PDF download', {
                'eventCategory': 'category_value',
                'dimension5': 'custom data'
            });

        }).catch((err) => {
            console.log("PDF Error " + err)
        })
    }
}

button.addEventListener('click', ()=>{
    generatePDF();
});



