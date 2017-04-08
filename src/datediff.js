
/**
 * datediff
 * Copyright(c) 2017 Kevin Jiang
 */


var daysInMonth = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var daysInMonthInLeapyear = [ 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


function isLeapyear(year) {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}


function validateDate(day, month, year) {
    var errMsg = [];
    var daysEveryMonth = isLeapyear(year) ? daysInMonthInLeapyear : daysInMonth;

    if( year < 1900 || year > 2010 ) errMsg.push('Year should be between 1900 and 2010.');
    if( month < 1 || month > 12 ) errMsg.push('Month should be between 1 and 12.');
    if( year >= 1900 && year <= 2010 && month >= 1 && month <= 12) {
        if( day < 1 || day > daysEveryMonth[month-1] ) errMsg.push('Day should be between 1 and ' + daysEveryMonth[month-1] + '.');
    }
    return errMsg;
}


function daysToEndOfYear(day, month, year){
    if(validateDate(day, month, year).length != 0) return null;

    var days = 0;
    var daysEveryMonth = isLeapyear(year) ? daysInMonthInLeapyear : daysInMonth;

    days = days + (daysEveryMonth[month-1] - day + 1);
    for( var i=month; i<12; i++ ) {
        days = days + daysEveryMonth[i];
    }

    return days;
}


function daysFromBeginningOfYear(day, month, year){
    if(validateDate(day, month, year).length != 0) return null;

    var days = 0;
    var daysEveryMonth = isLeapyear(year) ? daysInMonthInLeapyear : daysInMonth;

    for( var i=0; i<month-1; i++) {
        days = days + daysEveryMonth[i];
    }
    days = days + day;

    return days;
}


function parseUserInput(val) {
    var date, errMsg;
    var d, m, y, validateMsg;

    if(val.replace(/\s+/g,' ').trim().split(' ').length != 3) {
        errMsg = 'Must be 3 fields in format of DD MM YYYY.';
    }
    else {
        d = parseInt(val.replace(/\s+/g,' ').trim().split(' ')[0]);
        m = parseInt(val.replace(/\s+/g,' ').trim().split(' ')[1]);
        y = parseInt(val.replace(/\s+/g,' ').trim().split(' ')[2]);

        validateMsg = validateDate(d, m, y);

        if(validateMsg.length != 0) {
            errMsg = validateMsg.join('\n');
        }
        else {
            date = { day: d, month: m, year: y }
        }
    }

    return { validationMessage: errMsg, date: date };
}


function dateDiff(d1, d2){
    var earliestDate, latestDate, daydiff;

    if(d1.year > d2.year) {
        earliestDate = d2;
        latestDate = d1;
    } 
    else if(d1.year < d2.year) {
        earliestDate = d1;
        latestDate = d2;
    } 
    else if(d1.month > d2.month) {
        earliestDate = d2;
        latestDate = d1;
    } 
    else if(d1.month < d2.month) {
        earliestDate = d1;
        latestDate = d2;
    }
    else if(d1.day < d2.day) {
        earliestDate = d1;
        latestDate = d2;
    }
    else {
        earliestDate = d2;
        latestDate = d1;
    }

    if(latestDate.year - earliestDate.year == 0) {
        daydiff = daysFromBeginningOfYear(latestDate.day, latestDate.month, latestDate.year) 
                    - daysFromBeginningOfYear(earliestDate.day, earliestDate.month, earliestDate.year);
    }
    else if(latestDate.year - earliestDate.year == 1) {
        daydiff = daysFromBeginningOfYear(latestDate.day, latestDate.month, latestDate.year) 
                    + daysToEndOfYear(earliestDate.day, earliestDate.month, earliestDate.year) - 1;
    } 
    else {
        daydiff = daysFromBeginningOfYear(latestDate.day, latestDate.month, latestDate.year) 
                    + daysToEndOfYear(earliestDate.day, earliestDate.month, earliestDate.year) - 1;

        for(var i=earliestDate.year+1; i<latestDate.year; i++) {
            daydiff = daydiff + (isLeapyear(i) ? 366 : 365 );
        }
    } 

    return [earliestDate.day+' '+earliestDate.month+' '+earliestDate.year, latestDate.day+' '+latestDate.month+' '+latestDate.year, daydiff];
}


module.exports = {
    parseUserInput: parseUserInput,
    dateDiff: dateDiff
}


