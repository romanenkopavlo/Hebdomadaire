let joursMatinDebut = document.getElementsByClassName("jmDebut");
let joursMatinFin = document.getElementsByClassName("jmFin");
let joursApremDebut = document.getElementsByClassName("japDebut");
let joursApremFin = document.getElementsByClassName("japFin");
let journeesCompletes = document.getElementsByClassName("journeecomplete");
let durees = document.getElementsByClassName("jd");
let errorsFields = document.getElementsByClassName("error");
let totalHoursField = document.getElementById("total");
let hoursValue = document.getElementById("heures");
let image = document.getElementById("imgheures");
let validationButton = document.getElementById("btValiderHeures");

let difference;
let differenceOfHours;
let differenceOfMinutes;

let duree = 0;
let totalHours = 0;
let totalMinutes = 0;
let maxHoursValue = hoursValue.valueAsNumber;

const milliSecondsInDay = 1000 * 3600 * 24;

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instance = M.Collapsible.init(elems, null);
});


validationButton.addEventListener('click', function () {
    maxHoursValue = hoursValue.valueAsNumber;
    calculerHebdomadaire();
});

for (let i = 0; i < 6; i++) {
    errorsFields[i].hidden = true;
}

for (let i = 0; i < 6; i++) {
    journeesCompletes[i].onclick = function () {
        if (journeesCompletes[i].checked) {
            joursMatinDebut[i].value = joursMatinDebut[i].min;
            joursMatinFin[i].value = joursMatinFin[i].max;
            joursApremDebut[i].value = joursApremDebut[i].min;
            joursApremFin[i].value = joursApremFin[i].max;
            joursMatinDebut[i].readOnly = true;
            joursMatinFin[i].readOnly = true;
            joursApremDebut[i].readOnly = true;
            joursApremFin[i].readOnly = true;
            dureeMatin(i);
            dureeAprem(i);
            calculerHebdomadaire();
        } else {
            joursMatinDebut[i].readOnly = false;
            joursMatinFin[i].readOnly = false;
            joursApremDebut[i].readOnly = false;
            joursApremFin[i].readOnly = false;
        }
    }
}

for (let i = 0; i < 6; i++) {
    joursMatinDebut[i].onchange = function () {
        if (matinStartError(i) || matinEndError(i) || apremStartError(i) || apremEndError(i)) {
            errorsFields[i].hidden = false;
            errorsFields[i].innerText = "Inappropriate value!";
        } else {
            errorsFields[i].hidden = true;
            if (joursMatinFin[i].valueAsDate != null) {
                dureeMatin(i);
                calculerHebdomadaire();
            }
        }
    }

    joursMatinFin[i].onchange = function () {
        if (matinStartError(i) || matinEndError(i) || apremStartError(i) || apremEndError(i)) {
            errorsFields[i].hidden = false;
            errorsFields[i].innerText = "Inappropriate value!";
        } else {
            errorsFields[i].hidden = true;
            if (joursMatinDebut[i].valueAsDate != null) {
                dureeMatin(i);
                calculerHebdomadaire();
            }
        }
    }

    joursApremDebut[i].onchange = function () {
        if (matinStartError(i) || matinEndError(i) || apremStartError(i) || apremEndError(i)) {
            errorsFields[i].hidden = false;
            errorsFields[i].innerText = "Inappropriate value!";
        } else {
            errorsFields[i].hidden = true;
            if (joursApremFin[i].valueAsDate != null) {
                dureeAprem(i);
                calculerHebdomadaire();
            }
        }
    }

    joursApremFin[i].onchange = function () {
        if (matinStartError(i) || matinEndError(i) || apremStartError(i) || apremEndError(i)) {
            errorsFields[i].hidden = false;
            errorsFields[i].innerText = "Inappropriate value!";
        } else {
            errorsFields[i].hidden = true;
            if (joursApremDebut[i].valueAsDate != null) {
                dureeAprem(i);
                calculerHebdomadaire();
            }
        }
    }
}

function differenceTimes(value1, value2) {
    if (value1 > value2) {
        difference = (milliSecondsInDay - value1) + value2;
    } else {
        difference = Math.abs(value2 - value1);
    }
    return difference;
}

function hoursMinutesCalculation(difference) {
    differenceOfHours = Math.floor(difference / (1000 * 60 * 60));
    differenceOfMinutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
}

function dureeMatin(dayOfWeek) {
    if (joursApremDebut[dayOfWeek].valueAsDate == null || joursApremFin[dayOfWeek].valueAsDate == null) {
        duree = 0 + differenceTimes(joursMatinDebut[dayOfWeek].valueAsDate.getTime(), joursMatinFin[dayOfWeek].valueAsDate.getTime());
    } else {
        duree = differenceTimes(joursMatinDebut[dayOfWeek].valueAsDate.getTime(), joursMatinFin[dayOfWeek].valueAsDate.getTime()) + differenceTimes(joursApremDebut[dayOfWeek].valueAsDate.getTime(), joursApremFin[dayOfWeek].valueAsDate.getTime());
    }
    hoursMinutesCalculation(duree);
    formatage(dayOfWeek);
}

function dureeAprem(dayOfWeek) {
    if (joursMatinDebut[dayOfWeek].valueAsDate == null || joursMatinFin[dayOfWeek].valueAsDate == null) {
        duree = differenceTimes(joursApremDebut[dayOfWeek].valueAsDate.getTime(), joursApremFin[dayOfWeek].valueAsDate.getTime());
    } else {
        duree = differenceTimes(joursMatinDebut[dayOfWeek].valueAsDate.getTime(), joursMatinFin[dayOfWeek].valueAsDate.getTime()) + differenceTimes(joursApremDebut[dayOfWeek].valueAsDate.getTime(), joursApremFin[dayOfWeek].valueAsDate.getTime());
    }
    hoursMinutesCalculation(duree);
    formatage(dayOfWeek);
}

function matinStartError(dayOfWeek) {
    if (joursMatinDebut[dayOfWeek].valueAsDate != null && joursMatinFin[dayOfWeek].valueAsDate != null) {
        return joursMatinDebut[dayOfWeek].value > joursMatinDebut[dayOfWeek].max || joursMatinDebut[dayOfWeek].value < joursMatinDebut[dayOfWeek].min;
    }
}

function matinEndError(dayOfWeek) {
    if (joursMatinDebut[dayOfWeek].valueAsDate != null && joursMatinFin[dayOfWeek].valueAsDate != null) {
        return joursMatinFin[dayOfWeek].value > joursMatinFin[dayOfWeek].max || joursMatinFin[dayOfWeek].value < joursMatinFin[dayOfWeek].min;
    }
}

function apremStartError(dayOfWeek) {
    if (joursApremDebut[dayOfWeek].valueAsDate != null && joursApremFin[dayOfWeek].valueAsDate != null) {
        return joursApremDebut[dayOfWeek].value > joursApremDebut[dayOfWeek].max || joursApremDebut[dayOfWeek].value < joursApremDebut[dayOfWeek].min;
    }
}

function apremEndError(dayOfWeek) {
    if (joursApremDebut[dayOfWeek].valueAsDate != null && joursApremFin[dayOfWeek].valueAsDate != null) {
        return joursApremFin[dayOfWeek].value > joursApremFin[dayOfWeek].max || joursApremFin[dayOfWeek].value < joursApremFin[dayOfWeek].min;
    }
}

function calculerHebdomadaire() {
    totalHours = 0;
    totalMinutes = 0;
    for (let i = 0; i < 6; i++) {
        if (durees[i].innerText !== "") {
            let tableau = [];
            tableau = durees[i].innerText.split(":");
            if (tableau[0].length === 2) {
                if (tableau[0].indexOf("0") === 0) {
                    totalHours += Number.parseInt(tableau[0].substring(1));
                } else {
                    totalHours += Number.parseInt(tableau[0]);
                }
            }

            if (tableau[1].length === 2) {
                if (tableau[1].indexOf("0") === 0) {
                    totalMinutes += Number.parseInt(tableau[1].substring(1));
                } else {
                    totalMinutes += Number.parseInt(tableau[1]);
                }
            }
        }
    }

    totalHours = totalHours + (Math.round(totalMinutes / 60));
    totalHoursField.innerText = totalHours;

    if (totalHours < maxHoursValue) {
        image.src = "images/bad.jpg";
    } else {
        image.src = "images/good.jpg";
    }
}

function formatage(dayOfWeek) {
    if (differenceOfHours < 10 && differenceOfMinutes < 10) {
        durees[dayOfWeek].innerText = "0" + differenceOfHours + ":" + "0" + differenceOfMinutes;
    } else if (differenceOfHours < 10) {
        durees[dayOfWeek].innerText = "0" + differenceOfHours + ":" + differenceOfMinutes;
    } else if (differenceOfMinutes < 10) {
        durees[dayOfWeek].innerText = differenceOfHours + ":" + "0" + differenceOfMinutes;
    } else {
        durees[dayOfWeek].innerText = differenceOfHours + ":" + differenceOfMinutes;
    }
}