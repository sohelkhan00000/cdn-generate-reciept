class formControls {
   
    constructor()
    {
        this['renter-name'] = document.getElementById('renter-name');
        this['rent'] = document.getElementById('rent');
        this['address'] = document.getElementById('address');
        this['landlord-name'] = document.getElementById('landlord-name');
        this['landlord-pan'] = document.getElementById('landlord-pan');
        this['date-from'] = document.getElementById('date-from');
        this['date-to'] = document.getElementById('date-to');
        this['receipt-month'] = document.querySelectorAll("[name='receipt-month']");
        this['download-pdf'] = document.getElementById("download-pdf");
        this['form-control'] = document.querySelectorAll('.form-control');
        this['spinner-grow'] = document.querySelector(".spinner-grow");
        this['download-text'] = document.querySelector(".download-text");
        this['select-template'] = document.querySelector(".select-template");
    
    }
}

let objFormControls = {};
let objErrorControls = {};
let objTemplateControls = {};

/*controls end */

let date = new Date();

var readyPage = () => {
    objTemplateControls = {
        'receipts': document.getElementById('receipts'),
        'generate-date' : document.querySelectorAll('.generate-date'),
        'current-month' : document.querySelectorAll('.current-month'),
        'receipt-number' : document.querySelectorAll('.receipt-number')
    };
    objFormControls = new formControls();
    for (let i in objFormControls) {
        if (document.querySelector("p[data-error=" + i + "]")) {
            objErrorControls[i] = document.querySelector("p[data-error=" + i + "]")
        }

        if (document.querySelector("[data-tm=" + i + "]") ) {
            objTemplateControls[i] = document.querySelectorAll("[data-tm=" + i + "]");
        }
    }
   
    objFormControls['date-from'].value = date.toISOString().substring(0, 10);
    objFormControls['date-to'].value = date.toISOString().substring(0, 10);
}
readyPage();

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

var getMonthShortName = (XDate) => {
    var today = new Date(XDate);
    return today.toLocaleString('default', { month: 'long', year: 'numeric' });
}

var addMonths = (paraStartDate, paraEndDate, monthSlot)=> {
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
    var options = { year: 'numeric', month: 'short', day: 'numeric' };
    dataObject.forEach((indexValue, i, array) => {

        array[i] = { start: indexValue.start.toLocaleDateString("en-US", options), end: indexValue.end.toLocaleDateString("en-US", options) }

    });

    return dataObject;
}

var checkValidation = (value, type, name, CB)=> {

    if (type == "Name") {
        var DisgitFinder = /\d/g;
        var NonWordCorrentorFinder = /\W/g;

        if (value == "") {
            CB(false, name + " cannot be  empty!");
            return false;
        }
        else if (value.length > 35) {
            CB(false, name + " cannot be more than 35 characters!");
            return false;

        }
        else if (DisgitFinder.test(value)) {
            CB(false, name + " cannot contain numbers and space!");
            return false;

        }

        CB(true, name + " validated successfull!");
        return true;
    }
    else if (type == "Empty") {
        if (value == "") {
            CB(false, name + " cannot be empty!");
            return false;
        }
        CB(true, name + " validated successfull!");
        return true;
    }

}

var addDynamicData = (CB)=> {
    let isControlsValid = true;
    let xstartDate;
    let xendDate;

    checkValidation(objFormControls['renter-name'].value, "Name", "Name", function (suc, msg) {
        if (!suc) {
          
            objErrorControls['renter-name'].innerHTML = msg;
            objErrorControls['renter-name'].style.display = "block"
         }
         else {
             objErrorControls['renter-name'].style.display = "none";
         }
    });

    checkValidation(objFormControls['rent'].value, "Empty", "Rent", function (suc, msg) {
        if (!suc) {
            objErrorControls['rent'].innerHTML = msg;
            objErrorControls['rent'].style.display = "block"
         }
         else {
             objErrorControls['rent'].style.display = "none";
         }
    });

    checkValidation(objFormControls['address'].value, "Empty", "Address", function (suc, msg) {
        if (!suc) {
            objErrorControls['address'].innerHTML = msg;
            objErrorControls['address'].style.display = "block"
         }
         else {
             objErrorControls['address'].style.display = "none";
         }
    });

    checkValidation(objFormControls['landlord-name'].value, "Name", "Owner's name", function (suc, msg) {
        if (!suc) {
            objErrorControls['landlord-name'].innerHTML = msg;
            objErrorControls['landlord-name'].style.display = "block"
         }
         else {
             objErrorControls['landlord-name'].style.display = "none";
         }
    });

    let checkAllvalidation = document.getElementsByClassName("validation-message");

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

    if (isControlsValid) {

        xstartDate =  objFormControls['date-from'].value;
        xendDate = objFormControls['date-to'].value;
        let monthlyCheck = document.getElementById("monthly");
        let monthSlot = 1;
        if (!monthlyCheck.checked) {
            monthSlot = 3;
        }

        let allDates = addMonths(xstartDate, xendDate, monthSlot);
        let today = new Date().toString()
        today = today.slice(4, 15)
        allDates.forEach((indexValue, index, array) => {
            if (array.length == 1) {

                objTemplateControls['date-from'][0].innerHTML = indexValue.start.toUpperCase();
                objTemplateControls['date-to'][0].innerHTML = indexValue.end.toUpperCase();
                objTemplateControls['current-month'][0].innerHTML = getMonthShortName(indexValue.start);
                objTemplateControls['receipt-number'][0].innerHTML = "1";
                objTemplateControls['generate-date'][0].innerHTML = getMonthShortName(today);
               
            }
            else {

                if (index == 0) {
                    objTemplateControls['date-from'][0].innerHTML = indexValue.start.toUpperCase();
                    objTemplateControls['date-to'][0].innerHTML = indexValue.end.toUpperCase();
                    objTemplateControls['current-month'][0].innerHTML = getMonthShortName(indexValue.start);
                    objTemplateControls['receipt-number'][0].innerHTML = "1";
                    objTemplateControls['generate-date'][0].innerHTML = getMonthShortName(today);
                }
                else {
                    
                    var element = document.getElementById('invoice1');
                    var element2 = element.cloneNode(true);
                    element2.id = "invoice" + (index + 1);
                  objTemplateControls['receipts'].appendChild(element2);

                    document.querySelector("#invoice" + (index + 1) + " [data-tm='date-from']").innerHTML = indexValue.start.toUpperCase();
                    document.querySelector("#invoice" + (index + 1) + " [data-tm='date-to']").innerHTML = indexValue.end.toUpperCase();
                    document.querySelector("#invoice" + (index + 1) + "  .current-month").innerHTML = getMonthShortName(indexValue.start);
                    document.querySelector("#invoice" + (index + 1) + "  .receipt-number").innerHTML = (index + 1);
                    document.querySelector("#invoice" + (index + 1) + "  .generate-date").innerHTML = getMonthShortName(today);;

                    if ((index + 1) % 3 == 0 && index != 0) {

                        generateAdd();

                        const pageBreaker = document.createElement("div");
                        pageBreaker.setAttribute("class", "html2pdf__page-break");
                        objTemplateControls['receipts'].appendChild(pageBreaker);

                    }


                }
                
            }

            if((index + 1) % 3 != 0 && (index + 1) == array.length)
            {
                generateAdd();
            }
        })

        CB(true, 'validation done.');
    }
    else
    {
        CB(false, 'validation not done.')
    }

}

var resetPage =(CB) =>{

    
    objFormControls['spinner-grow'].style.display = "none";
    objFormControls['download-text'].innerHTML = "Download";
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

var generateAdd = ()=>{
    const pageAdd = document.createElement("div");
    pageAdd.setAttribute("class", "page-add");
    pageAdd.innerHTML = "Generated by https://www.generatereceipt.blogspot.com";
    objTemplateControls['receipts'].appendChild(pageAdd);
}

var generatePDF = ()=> {
    addDynamicData((suc,msg)=>{
        if(suc)
        {
            objFormControls['spinner-grow'].style.display = "inline-block";
            objFormControls['download-text'].innerHTML = "PDF Generating...";
          
                const element = document.getElementById('receipts');
                var options = {
                    jsPDF: {
                        format: 'a4',
                        orientation: 'portrait'
                    },
                    html2canvas: {letterRendering: true, useCORS: true, logging: true, scrollX: 0, scrollY: 0 },
                    margin:[0, -3.5, 0, 0],
                    padding:0,
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
    })
}


objFormControls['download-pdf'].addEventListener('click', ()=>{
    generatePDF();
});



