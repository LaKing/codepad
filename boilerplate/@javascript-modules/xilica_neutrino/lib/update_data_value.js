const LOG_VALUE_THRESHOLD = 0;

module.exports = function update_data_value(name, data) {
    //console.log("DATA RAW: ", data);

    if (data.substring(0, 2) === "OK") return; // console.log(data);

    var val;
    var tag = data.split("=")[0];

    if (tag === "ERROR") return console.log(data);


    var value = data.split("=")[1];
    val = Math.floor(value.split(".")[0]);

    if (value.substring(0, 1) === "T") val = true;
    if (value.substring(0, 1) === "F") val = false;


    //console.log("DATA PAR: ", typ, tag, value, val);
    if (val > LOG_VALUE_THRESHOLD) console.log(data);

};
