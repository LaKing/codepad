/*ßoilerplate */

/* @DOC
## ßoilerplate timestamp functions
Simple date functions  
`ß.now()` returns yyyy-mm-dd hh:mm:ss format  
`ß.date()` returns yyyy-mm-dd format  
`ß.time()` returns dd hh:mm:ss format  
`ß.DATE` and `ß.TIME` are constant stamps created at bootup  

*/
ß.now = function (now) {
    if (!now) now = new Date();

    var month = now.getMonth() + 1;
    if (month < 10) month = "0" + month;

    var day = now.getDate();
    if (day < 10) day = "0" + day;

    var hour = now.getHours();
    if (hour < 10) hour = "0" + hour;

    var min = now.getMinutes();
    if (min < 10) min = "0" + min;

    var sec = now.getSeconds();
    if (sec < 10) sec = "0" + sec;

    return now.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
};

// YYYY-MM-DD
ß.date = function (now) {
    if (!now) now = new Date();

    var month = now.getMonth() + 1;
    if (month < 10) month = "0" + month;

    var day = now.getDate();
    if (day < 10) day = "0" + day;

    return now.getFullYear() + "-" + month + "-" + day;
};

ß.time = function (now) {
    if (!now) now = new Date();

    var hour = now.getHours();
    if (hour < 10) hour = "0" + hour;

    var min = now.getMinutes();
    if (min < 10) min = "0" + min;

    var sec = now.getSeconds();
    if (sec < 10) sec = "0" + sec;

    return hour + ":" + min + ":" + sec;
};

ß.timestamp = function (date) {
    // a date argument is passed and used
    if (date) return  Math.floor((new Date(date)).getTime() / 1000);
    // current time
    return Math.floor(Date.now() / 1000);
};

ß.DATE = ß.now().split(" ")[0];
ß.TIME = ß.now().split(" ")[1];

//console.log("- Date functions ß.date ß.time and ß.now available. " + ß.now());
