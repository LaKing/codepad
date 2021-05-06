// the devices and the json should be consistent, the consistency has to be maintained manually - by name
// should be fine as long as the device names dont change.

// we create these three objects automatically

if (!ß.NEUTRINO_DEVICES) {
    ß.NEUTRINO_DEVICES = {};
    if (ß.fs.existsSync(ß.CWD + '/config/Neutrino-project.devices.json')) ß.NEUTRINO_DEVICES = ß.fs.readJsonSync(ß.CWD + '/config/Neutrino-project.devices.json');
    else ß.err("Missing Neutrino Devices json file");
}

if (!ß.NEUTRINO_PROJECT) {
    ß.NEUTRINO_PROJECT = {};
    if (ß.fs.existsSync(ß.CWD + '/config/Neutrino-project.json')) ß.NEUTRINO_PROJECT = ß.fs.readJsonSync(ß.CWD + '/config/Neutrino-project.json');
    else ß.err("Missing Neutrino Project json file");
}

if (!ß.NEUTRINO_CURRENT) {
    ß.NEUTRINO_CURRENT = {};
    if (ß.fs.existsSync(ß.CWD + '/config/Neutrino-project.json')) ß.NEUTRINO_CURRENT = ß.fs.readJsonSync(ß.CWD + '/config/Neutrino-project.json');
    else ß.err("Missing Neutrino Project json file");
}

//ß.NEUTRINO_PROJECT = ß.fs.readJsonSync("Neutrino-project.json");
//ß.NEUTRINO_CURRENT = ß.fs.readJsonSync("Neutrino-project.json");
ß.NEUTRINO_CONNECTIONS = {};

/*
Object.keys(ß.NEUTRINO_PROJECT).forEach(function(device) {
    Object.keys(ß.NEUTRINO_PROJECT[device]).forEach(function(control) {
       let value = ß.NEUTRINO_CURRENT[device][control];
        Ł(device, control);
    });
});
*/

Object.keys(ß.NEUTRINO_CURRENT).forEach(function(device) {
    Object.keys(ß.NEUTRINO_CURRENT[device]).forEach(function(control) {
        let value = ß.NEUTRINO_CURRENT[device][control];
        if (value === "Gain") ß.NEUTRINO_CURRENT[device][control] = -100;
        if (value === "Mute") ß.NEUTRINO_CURRENT[device][control] = false;
        if (value === "RMS Meter") ß.NEUTRINO_CURRENT[device][control] = -100;
    });
});
