/*jshint esnext: true */

ß.now = function() {
    var now = new Date();

    var month = (now.getMonth() + 1);
    if (month < 10) month = '0' + month;

    var day = now.getDate();
    if (day < 10) day = '0' + day;


    var hour = now.getHours();
    if (hour < 10) hour = '0' + hour;

    var min = now.getMinutes();
    if (min < 10) min = '0' + min;

    var sec = now.getSeconds();
    if (sec < 10) sec = '0' + sec;

    return now.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
};

ß.date = function() {
    var now = new Date();

    var month = (now.getMonth() + 1);
    if (month < 10) month = '0' + month;

    var day = now.getDate();
    if (day < 10) day = '0' + day;

    return now.getFullYear() + '-' + month + '-' + day;
};

ß.time = function() {
    var now = new Date();
    
    var hour = now.getHours();
    if (hour < 10) hour = '0' + hour;

    var min = now.getMinutes();
    if (min < 10) min = '0' + min;

    var sec = now.getSeconds();
    if (sec < 10) sec = '0' + sec;

    return day + ' ' + hour + ':' + min + ':' + sec;
};


ß.DATE = ß.now().split(' ')[0];
ß.TIME = ß.now().split(' ')[1];

console.log(" - Date functions ß.date ß.time and ß.now available.");
