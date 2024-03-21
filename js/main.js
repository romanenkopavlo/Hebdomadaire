let joursMatinDebut = document.getElementsByClassName("jmDebut");
let joursMatinFin = document.getElementsByClassName("jmFin");
let joursApremDebut = document.getElementsByClassName("japDebut");
let joursApremFin = document.getElementsByClassName("japFin");
let durees = document.getElementsByClassName("jd");

let valueMatinDebut;
let valueMatinFin;
let valueApremDebut;
let valueApremFin;
let difference;
let differenceOfHours;
let differenceOfMinutes;
let dayOfWeek;
const milliSecondsInDay = 1000 * 3600 * 24;

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instance = M.Collapsible.init(elems, null);
});

joursMatinDebut[0].onchange = function () {
    dayOfWeek = 0;
    valueMatinDebut = joursMatinDebut[0].valueAsDate.getTime();
    if (valueMatinFin != null) {
        differenceTimes(valueMatinDebut, valueMatinFin, dayOfWeek);
    }
}

joursMatinFin[0].onchange = function () {
    dayOfWeek = 0;
    valueMatinFin = joursMatinFin[0].valueAsDate.getTime();
    if (valueMatinDebut != null) {
        differenceTimes(valueMatinDebut, valueMatinFin, dayOfWeek);
    }
}

joursApremDebut[0].onchange = function () {
    dayOfWeek = 0;
    valueApremDebut = joursApremDebut[0].valueAsDate.getTime();
    if (valueApremFin != null) {
        differenceTimes(valueApremDebut, valueApremFin, dayOfWeek);
    }
}

joursApremFin[0].onchange = function () {
    dayOfWeek = 0;
    valueApremFin = joursApremFin[0].valueAsDate.getTime();
    if (valueApremDebut != null) {
        differenceTimes(valueApremDebut, valueApremFin, dayOfWeek);
    }
}

function differenceTimes(value1, value2, number) {
    if (value1 > value2) {
        difference = (milliSecondsInDay - value1) + value2;
    } else {
        difference = Math.abs(value2 - value1);
    }

    differenceOfHours = Math.floor(difference / (1000 * 60 * 60));
    differenceOfMinutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    durees[number].innerText = differenceOfHours + ":" + differenceOfMinutes;
}