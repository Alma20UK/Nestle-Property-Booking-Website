/* 
Nav bar buttons 
*/

document.getElementById('bookButton').onclick = bookButton;
document.getElementById('bookButtonMobile').onclick = bookButton;
document.getElementById('contactButton').onclick = contactButton;
document.getElementById('contactButtonMobile').onclick = contactButton;
document.getElementById('spaceButton').onclick = spaceButton;
document.getElementById('spaceButtonMobile').onclick = spaceButton;

function bookButton() {
    document.getElementById("bookingSection").scrollIntoView();
}

function contactButton() {
    document.getElementById("contactSection").scrollIntoView();
}

function spaceButton() {
    document.getElementById("theSpaceSection").scrollIntoView();
}




/*
Hamburger menu adapted from https://www.youtube.com/watch?v=flItyHiDm7E
*/

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".mobileNav");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");

}
)





/* 
Calendar Adapated from: https://www.youtube.com/watch?v=o1yMqPyYeAo 
*/


const renderCalender = () => {

    date.setDate(1);

    const month = date.getMonth();

    const monthDays = document.querySelector('.days');

    const lastDay = new Date(date.getFullYear(),
        date.getMonth() + 1, 0).getDate();

    // Methodology used to get the last day of the previous month. 
    const prevLastDay = new Date(date.getFullYear(),
        date.getMonth(), 0).getDate();



    const firstDayIndex = date.getDay();

    // This gets the last day of the current of month
    const lastDayIndex = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDay();


    // Calculates the days of the following month to display
    const nextDays = 7 - lastDayIndex - 1;


    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];


    document.querySelector('.date h2').innerText = months[month];

    document.querySelector('.date p').innerHTML = date.toDateString();

    let days = "";

    // Gets the first day of the current month and then calculates the days to display from the previous month
    // The for loop is counting down to Zero from 6 essentially for all the days of the week. Sun- Mon
    for (let x = firstDayIndex; x > 0; x--) {
        days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
    }

    // For loop calculating the last day of the current month
    for (let i = 1; i <= lastDay; i++) {

        if (i === new Date().getDate() && date.
            getMonth() === new Date().getMonth()) {
            //days += `<div class="today">${i}</div>`;  
            // The line above is used to highlight the current day on the calendar. I have removed this so my booking functionality works properly.
            days += '<div id="' + i + '" onclick="selectedDays(this.id)">' + i + '</div>';
        } else {
            days += '<div id="' + i + '" onclick="selectedDays(this.id)">' + i + '</div>';
            /* I have re-written this line of Javascript and removed his ` and his $. 
            The line above is written in my preferred syntax.
            For my purposes I have added an id and an onclick functionality so the calendar can be interactive.
            'this.id' allows you to identify the specific ID that has been clicked.
            */

            monthDays.innerHTML = days;
        }
        // using backticks allows for easier concatination in javascript. the ${} is used to select something specifically from javascript, rather than just the string. In this instance the 'i' value.   
    }

    // For loop calculating which days from the following month that need to be displayed
    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="next-date">${j}</div>`;
        monthDays.innerHTML = days;
    }

}


const date = new Date(); // Using 'new' returns an instance of the date object which you can later call. Date() would simply return a string of the date.

renderCalender();


// Adding on-click functionality to the previous month arrow
document.querySelector(".previousArrow").
    addEventListener("click", () => {
        date.setMonth(date.getMonth() - 1);
        renderCalender();
    });

// Adding on-click functionality to the next month arrow
document.querySelector(".nextArrow").
    addEventListener("click", () => {
        date.setMonth(date.getMonth() + 1);
        renderCalender();
    });







/* 
My additional booking calender functionality 
*/

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

var checkedIn = false;
var checkedOut = false;
var checkInDate;
var checkOutDate;
var highlightedDays;
var nightsInbetween;
var startHighlight;
var endHighlight;
var range;


// This code taken from https://www.freecodecamp.org/news/javascript-range-create-an-array-of-numbers-with-the-from-method/#:~:text=from()%20method.,by%20the%20step%20plus%20one.
const arrayRange = (start, stop, step) => // This arrayRange equation is used to create an array bewtween a start and a stop. In my case Check in and check out.
    Array.from(
        { length: (stop - start) / step + 1 },
        (value, index) => start + index * step
    );


function selectedDays(clicked_id) { // This parameter is the id that has been clicked on the calendar and it is populated because of the this.id method used in the relevant function above


    if (checkedIn === false && checkedOut === false) {

        checkInDate = clicked_id; // updates the global check in date
        document.getElementById(clicked_id).style.backgroundColor = 'black';
        document.getElementById(clicked_id).style.color = 'white';
        document.getElementById(clicked_id).style.transition = '0.3s';
        document.getElementById('checkInDate').innerHTML = clicked_id + " " + months[date.getMonth()] + " " + date.getFullYear();

        setTimeout(function () {
            checkedIn = true;
        }, 50)

    } if (checkedIn === true && checkedOut === false) { // Will only work if a check in date has been selected first
        checkOutDate = clicked_id; //updates the global check out date

        if ((checkInDate <= checkOutDate - 1)) { // If the check out date is before the check in date it will deselect the highlighted dates.

            document.getElementById(clicked_id).style.backgroundColor = 'black';
            document.getElementById(clicked_id).style.color = 'white';
            document.getElementById(clicked_id).style.transition = '0.3s';
            document.getElementById('checkOutDate').innerHTML = clicked_id + " " + months[date.getMonth()] + " " + date.getFullYear(); // Updates the checkout date in the booking box next to the calender


            nightsInbetween = document.getElementById("pseudoContainer").innerHTML = checkOutDate - checkInDate;
            startHighlight = parseInt(checkInDate) + 1; // Start highlighting dates one day after check in
            endHighlight = startHighlight + parseInt(nightsInbetween) - 2; // Variable used to stop highlighting dates before checkout date

            range = arrayRange(startHighlight, endHighlight, 1); // Global variable that has the highlighted 'inbetween' days of check in and check out.
            console.log(range);

            for (let i = 0; i < range.length; i++) { // This for loop iteartes through the length of the array I created from, essentilly check out - check in
                highlightedDays = range[i] // this variable is created by getting the value of the 'range' array (which would give you the correct date to highlight) 
                document.getElementById(highlightedDays).style.backgroundColor = '#e6e6e6';
            }

            setTimeout(function () {
                checkedOut = true;
            }, 50)
        } else {
            console.log('Check out date is before check in date')
            document.getElementById(checkInDate).style.backgroundColor = 'white';
            document.getElementById(checkInDate).style.color = 'black';
            document.getElementById(checkInDate).style.transition = '0.3s';
            document.getElementById('checkInDate').innerHTML = ""; //clicked_id + " " + months[date.getMonth()] + " " + date.getFullYear();

            setTimeout(function () {
                checkedIn = false;
            }, 50)
        }

    } if (checkedOut === true) {

        document.getElementById(checkInDate).style.backgroundColor = 'white';
        document.getElementById(checkInDate).style.color = 'black';
        document.getElementById(checkOutDate).style.backgroundColor = 'white';
        document.getElementById(checkOutDate).style.color = 'black';
        document.getElementById('checkInDate').innerHTML = "";
        document.getElementById('checkOutDate').innerHTML = "";

        for (let i = 0; i < range.length; i++) {
            highlightedDays = range[i]
            document.getElementById(highlightedDays).style.backgroundColor = 'white';
            document.getElementById(highlightedDays).style.color = 'black';
        }

        setTimeout(function () {
            checkedOut = false;
            checkedIn = false;
        }, 50)

    }

}





/*
Functionality for validating the information provided for check-in, check-out and number of guests.
*/

function validateInput() {
    var x = document.getElementById("guestInput").value;
    var stayDuration = checkOutDate - checkInDate;
    var text;

    if (isNaN(x)) { // If x is Not a Number or less than one or greater than 10
        text = "Please select a number between 1 and 4.";
    } else if (x < 1 || x > 4) {
        text = "This property sleeps 1-4 adults, not including children.";
    } else if (checkedIn === false || checkedOut === false) {
        text = "Please select a check-in and check-out date.";
    } else {
        text = "";
        document.getElementById('guestSummary').innerHTML = x;
        document.getElementById('stayDuration').innerHTML = stayDuration + ' nights';
        document.getElementById('totalCost').innerHTML = '£' + stayDuration * 100;
        if (screen.width < 1000) {
            document.getElementById("summarySection").scrollIntoView();
        }
    }
    document.getElementById("validationText").innerHTML = text;

}




/*
Continue Button functionality
*/

document.getElementById('continueButton').onclick = continueButton;

function continueButton() {
    text = "This website is currently a work in progress but we really appreciate your interest. <br><br> If you would like to book this property please check our availibity on <a href='https://www.airbnb.co.uk/rooms/49279927?source_impression_id=p3_1672998121_G22jchonP%2BdlFIu5&check_in=2023-02-20&guests=1&adults=1&check_out=2023-02-23' target='_blank'>airbnb."

    document.getElementById("continueText").innerHTML = text;
}


