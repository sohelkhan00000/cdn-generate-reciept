// let xstartDate = "2013-01-01";
// let xendDate = "2013-02-28";

let xstartDate ;
let xendDate ;

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

function validate(){

}

function addDynamicData(){
    // user contrls
    let inputRenterName = document.getElementById("inputRenterName");
    let inputRent = document.getElementById("inputRent");
    let textboxAddress = document.getElementById("textboxAddress");
    let inputOwnerName = document.getElementById("inputOwnerName");
    let inputOwnerPan = document.getElementById("inputOwnerPan");
    let flexRadioMonthly = document.getElementById("flexRadioMonthly");
    let dataPickerFrom = document.getElementById("dataPickerFrom");
    let dataPickerTo = document.getElementById("dataPickerTo");

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
    today = today.slice(4,15)
    allDates.forEach((indexValue, index, array)=>{
        if(array.length == 1)
        {
           
            pdfDateFrom.innerHTML = indexValue.start;
            pdfDateTo.innerHTML = indexValue.end;
            pdfCurrentMonth.innerHTML = getMonthShortName( indexValue.start.slice(5, 7)) + " " + indexValue.start.slice(0, 4);
            pdfReceiptNumber.innerHTML = "1";
            pdfGenerateDate.innerHTML = today;
        }
        else{

            if(index == 0)
            {
                pdfDateFrom.innerHTML = indexValue.start;
                pdfDateTo.innerHTML = indexValue.end;
                pdfCurrentMonth.innerHTML = getMonthShortName( indexValue.start.slice(5, 7)) + " " + indexValue.start.slice(0, 4);
                pdfReceiptNumber.innerHTML = "1";
                pdfGenerateDate.innerHTML = today;
            }
            else
            {
                var mainContainer = document.getElementById('allSlips');
                var element = document.getElementById('invoice1');
                var element2 = element.cloneNode(true);
                element2.id = "invoice" + (index + 1);
                mainContainer.appendChild(element2);

                document.querySelector("#invoice"+(index + 1) + "  #pdfDateFrom").innerHTML = indexValue.start;
                document.querySelector("#invoice"+(index + 1) + "  #pdfDateTo").innerHTML = indexValue.end;
                document.querySelector("#invoice"+(index + 1) + "  #pdfCurrentMonth").innerHTML = getMonthShortName( indexValue.start.slice(5, 7)) + " " + indexValue.start.slice(0, 4);
                document.querySelector("#invoice"+(index + 1) + "  #pdfReceiptNumber").innerHTML = (index + 1);
                document.querySelector("#invoice"+(index + 1) + "  #pdfGenerateDate").innerHTML = today;

                if(index == 2)
                {
                    document.querySelector("#invoice"+(index + 1)).style.marginBottom = "100px";
                }
              

            }


           // document.querySelector("#invoice2 #receiptSartDate").style.color = "red";
        }


    })
    //generatePDF();
    console.log(allDates);
}

function generatePDF() {
    addDynamicData()
    // scroller related to generate pdf.
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
    // let scrollready = false;
    var scrollThread, scrollTimeout,
        scrollTimeout = 1000;

    


    const element = document.getElementById('allSlips');
    var options = {
        jsPDF: {
            format: 'a4'
        },
        html2canvas: { letterRendering: true, useCORS: true, logging: true },
        margin: 0,
        image: { type: 'jpeg', quality: 1 }
    };

    scrollThread = setInterval(() => {

        if (document.documentElement.scrollTop == 0 || document.body.scrollTop == 0) {
            //scrollready = true;
            html2pdf().set(options).from(element).toPdf().save("file").then((data)=>{
                    console.log("PDF success ");
                    const elements = document.getElementsByClassName("invoice");
                    while(elements.length > 1){
                        elements[1].parentNode.removeChild(elements[1]);
                    }

            }).catch((err)=>{
                console.log("PDF Error "+ err)
            })
            clearInterval(scrollThread)
        }

    }, scrollTimeout);

    // Choose the element that your content will be rendered to.
    //const element = document.getElementById('invoicetest');
    // Choose the element and save the PDF for your user.
    //html2pdf().from(element).save();
    //html2pdf().from(element).save('fileName');
    // <div class="html2pdf__page-break"></div>
}


const button = document.getElementById('downloadPDF');

button.addEventListener('click', generatePDF);
