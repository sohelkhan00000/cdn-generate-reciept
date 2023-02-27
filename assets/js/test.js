// function monthDiff(d1, d2) {
//     var months;
//     months = (d2.getFullYear() - d1.getFullYear()) * 12;

//     if(months == 0)
//     {
//         let date1months = d1.getMonth() ;
//         let date2months =  d2.getMonth();
//         months -= date1months
//         months += date2months
//     }
//     else
//     {
//         console.log("months connot be more then year.");
//     }

//     return months <= 0 ? 0 : months;
// }

// var d1 = new Date("2021-01-01");
// var d2 = new Date("2021-02-10");
// var months = monthDiff(d1, d2);

// //let tempMonths = months();
// if(months == 0 )
// {
//     console.log(months); 
// }



// function monthDiff(d1, d2) {
//     var months;
//     var day;
//     months = (d2.getFullYear() - d1.getFullYear()) * 12;
//     months -= d1.getMonth() + 1;
//     months += d2.getMonth();
//    // months += d2.getDate() > d1.getDate()? 1 : (months -1);

//     return months <= 0 ? 1 : (months + 1);
// }

// var d1 = new Date("2021-01-05");
// var d2 = new Date("2021-02-04");
// var months = monthDiff(d1, d2);
// console.log(months); 




// var date1 = new Date("01/01/2019");
// var date2 = new Date("02/01/2019");
// var Difference_In_Time = date2.getTime() - date1.getTime();
// var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
// Difference_In_Days += 1;

// //To display the final no. of days (result)
// console.log(Difference_In_Days);

const knuncleNumbers = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
let xstartDate = "2013-02-28";
let xendDate = "2013-05-31";

var startDateObject = new Date(xstartDate);
var endDateObject = new Date(xendDate);

let startKnuncle = knuncleNumbers[startDateObject.getMonth()];
let endKnuncle = knuncleNumbers[endDateObject.getMonth()];

let startDaysCount = startDateObject.getDate();
let endDaysCount = endDateObject.getDate();

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


            if(idx === 0){
                datesObject[0] = {start: xstartDate, end: getLastDate(array[idx]) }
                return true
            } else
        
            if (idx === array.length - 1) {
                datesObject[idx] = {start: array[idx], end: xendDate }
                return true
            }
            else
            {
                    datesObject.push({ start: array[idx], end: getLastDate(array[idx]) });
            }
        }

    });

    return datesObject;

}



//let tempArray = dateRange(xstartDate, xendDate);

let allDates = allDate(dateRange(xstartDate, xendDate));




console.log("start : " +  xstartDate + " end : " + xendDate) ;
console.log(tempArray);
console.log(allDates);



//console.log("arra : " + tempArray[tempArray.length - 1])


  //dateRange('2013-01-01', '2013-02-28')


