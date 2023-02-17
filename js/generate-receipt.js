let xstartDate;
let xendDate;
let isControlsValid = true;

const toggleSpinner = document.querySelector("#downloadPDF .spinner-grow");
const toggleDownload = document.querySelector("#downloadPDF .download-text");
const button = document.getElementById('downloadPDF');

const knuncleNumbers = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

function countMonths(d1, d2) {
    d1 = new Date(d1);
    d2 = new Date(d2);
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}

function getMonthShortName(monthNo) {
    const date = new Date();
    date.setMonth(monthNo - 1);
    return date.toLocaleString('en-US', { month: 'short' });
}

function getLastDate(currentDate) {
    // let currDate = currentDate;
    let startDateObj = new Date(currentDate);
    currentDate = currentDate.substring(0, 8);
    currentDate += knuncleNumbers[startDateObj.getMonth()];
    return currentDate
}

function countDays(firstDate, lastDate)
{
         // To set two dates to two variables
    var date1 = new Date(firstDate);
    var date2 = new Date(lastDate);
      
    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();
      
    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      
    //To display the final no. of days (result)
    //console.log( Difference_In_Days);

   return Difference_In_Days
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
    let inputRenterName = document.getElementById("inputRenterName");
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
            // set qwarterly
            monthSlot = 3;
        }

        let allDates = addMonths(xstartDate, xendDate, monthSlot);
        //let allDates = allDate(dateRange(xstartDate, xendDate));
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
                    var mainContainer = document.getElementById('allSlips');
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

                        const pageAdd = document.createElement("div");
                        pageAdd.setAttribute("class", "page-add");
                        pageAdd.innerHTML = "Generated by https://www.generatereceipt.blogspot.com"
                        mainContainer.appendChild(pageAdd);

                        const pageBreaker = document.createElement("div");
                        pageBreaker.setAttribute("class", "html2pdf__page-break");
                        mainContainer.appendChild(pageBreaker);
                        // document.querySelector("#invoice" + index).style.marginBottom = "100px";
                    }


                }


                // document.querySelector("#invoice2 #receiptSartDate").style.color = "red";
            }


        })
        //generatePDF();
        console.log(allDates);
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
    while (pageBreaker.length > 1) {
        pageBreaker[1].parentNode.removeChild(pageBreaker[1]);
    }
}

function generatePDF() {
    addDynamicData()

    if (isControlsValid) {

        toggleSpinner.style.display = "inline-block";
        toggleDownload.innerHTML = "PDF Generating...";

        //  document.body.scrollTop = 0; // For Safari
        // document.documentElement.scrollTop = 0;

        const element = document.getElementById('allSlips');
        var options = {
            jsPDF: {
                format: 'a4',
                orientation: 'portrait'
            },
            html2canvas: { letterRendering: true, useCORS: true, logging: true, scrollX: 0, scrollY: 0 },
            margin: 0,
            image: { type: 'jpeg', quality: 1 }
        };


        html2pdf().set(options).from(element).toPdf().save("Rent receipt by Generate Receipt").then((data) => {
            // console.log("PDF success");
            resetPage();


        }).catch((err) => {
            console.log("PDF Error " + err)
        })


    }

    // Choose the element that your content will be rendered to.
    //const element = document.getElementById('invoicetest');
    // Choose the element and save the PDF for your user.
    //html2pdf().from(element).save();
    //html2pdf().from(element).save('fileName');
    // <div class="html2pdf__page-break"></div>
}

button.addEventListener('click', generatePDF);


