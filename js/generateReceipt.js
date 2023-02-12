// let xstartDate = "2013-01-01";
// let xendDate = "2013-02-28";

let xstartDate;
let xendDate;
let isControlsValid = true;

const toggleSpinner = document.querySelector("#downloadPDF .spinner-grow");
const toggleDownload = document.querySelector("#downloadPDF .download-text");
const button = document.getElementById('downloadPDF');

const knuncleNumbers = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

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

function dateRange(startDate, endDate) {
    var start = startDate.split('-');
    var end = endDate.split('-');
    var startYear = parseInt(start[0]);
    var endYear = parseInt(end[0]);
    var dates = [];

    for (var i = startYear; i <= endYear; i++) {
        var endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
        var startMon = i === startYear ? parseInt(start[1]) - 1 : 0;
        for (var j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
            var month = j + 1;
            var displayMonth = month < 10 ? '0' + month : month;
            dates.push([i, displayMonth, '01'].join('-'));
        }
    }
    return dates;
}

function allDate(monthList) {

    var startDateObject = new Date(xstartDate);
    var endDateObject = new Date(xendDate);

    let startKnuncle = knuncleNumbers[startDateObject.getMonth()];
    let endKnuncle = knuncleNumbers[endDateObject.getMonth()];

    let startDaysCount = startDateObject.getDate();
    let endDaysCount = endDateObject.getDate();

    var datesObject = [];
    // let isFirstMonthMerge = false;

    monthList.forEach(function (i, idx, array) {

        if (array.length == 1) {

            datesObject = [{ start: xstartDate, end: xendDate }]
            return true;
        }
        else if (array.length == 2) {

            if (startDaysCount > 1 || endDaysCount < endKnuncle) {

                datesObject = [{ start: xstartDate, end: xendDate }]
            }
            else {
                datesObject = [
                    { start: array[0], end: getLastDate(array[0]) },
                    { start: array[1], end: getLastDate(array[1]) },
                ]

            }
            return true;
        }
        else {

            // this is for date to date cycle for future
            // if( (startDaysCount == startKnuncle) && (endDaysCount == endKnuncle))
            // {
            //         console.log("date matched")
            // }
            // else if (startDaysCount == endDaysCount)
            // {
            //     console.log("date matched with same date")
            // }


            if (idx === 0) {
                datesObject[0] = { start: xstartDate, end: getLastDate(array[idx]) }
                return true
            } else

                if (idx === array.length - 1) {
                    datesObject[idx] = { start: array[idx], end: xendDate }
                    return true
                }
                else {
                    datesObject.push({ start: array[idx], end: getLastDate(array[idx]) });
                }
        }

    });

    return datesObject;

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
    xendDate = dataPickerTo.value
    // let xstartDate = "2013-01-01";
    // let xendDate = "2013-02-28";


    //pdfDateFrom.innerHTML = dataPickerFrom.value;
    //pdfDateTo.innerHTML = dataPickerTo.value;

    let allDates = allDate(dateRange(xstartDate, xendDate));
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
                    
                    const pageBreaker = document.createElement("div");
                    pageBreaker.setAttribute("class","html2pdf__page-break");
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

    // var scrollThread, scrollTimeout,
    //     scrollTimeout = 1000;
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
            image: { type: 'jpeg', quality: 2 }
        };

        // scrollThread = setInterval(() => {

        //  if (document.documentElement.scrollTop == 0 || document.body.scrollTop == 0 || true) {
        //scrollready = true;
        html2pdf().set(options).from(element).toPdf().save("Rent slip by Generate Receipt").then((data) => {
            // console.log("PDF success");
            resetPage();
       

        }).catch((err) => {
            console.log("PDF Error " + err)
        })
      //  clearInterval(scrollThread);
           //}

        //   }, scrollTimeout);

    }

    // Choose the element that your content will be rendered to.
    //const element = document.getElementById('invoicetest');
    // Choose the element and save the PDF for your user.
    //html2pdf().from(element).save();
    //html2pdf().from(element).save('fileName');
    // <div class="html2pdf__page-break"></div>
}




button.addEventListener('click', generatePDF);

