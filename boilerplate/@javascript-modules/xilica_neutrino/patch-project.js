
const project_path = ""; //"../../";
const project_name = "Neutrino-project";


const project_ext = ".pjxml";
const project_tag = ".patched";
// project_path + project_name + project_tag + project_ext

/* @DOC

	This script will read in your project file, and add 3rd party controls to mute, gain, and RMS Meter elements on Neutrino devices.
    The modified project is saved, and one additional file will be vreated in JSON format, comntaining the 3rd party control names.

*/
/* @DOC

	This script will read in your project file, and add 3rd party controls to mute, gain, and RMS Meter elements on Neutrino devices.
    The modified project is saved, and one additional file will be vreated in JSON format, comntaining the 3rd party control names.

*/

function default_ctl_config(component) {
    let o = {
        $: {
            DEF_ID: "230003",
            MAX_CONFIG: "100"
        },
        DSP_3RD_PARTY: [
            {
                $: {
                    MT: "0",
                    C: "255",
                    A: "0",
                    P: "0",
                    N: component.$.NAME
                }
            }
        ]
    };

    component.DSP_3RDPARTY_LIST = [];
    component.DSP_3RDPARTY_LIST.push(o);

    console.log("===>", component.$.NAME);
    return 1;
}

function meter_ctl_config(component) {
    //console.log(component.LA_IN);
    var n = component.LA_IN.length;

    let o = {
        $: {
            DEF_ID: "230003",
            MAX_CONFIG: "100"
        },
        DSP_3RD_PARTY: []
    };

    for (i = 0; i < n; i++) {
        let p = {
            $: {
                MT: "1",
                C: i,
                A: "0",
                P: "0",
                N: component.$.NAME + "-" + (i + 1)
            }
        };
        o.DSP_3RD_PARTY.push(p);
    }

    component.DSP_3RDPARTY_LIST = [];
    component.DSP_3RDPARTY_LIST.push(o);

    console.log("===>", component.$.NAME);

    return n;
}

const fs = require("fs");

const xml2js = require("xml2js");
const parseString = xml2js.parseString;
const builder = new xml2js.Builder();

fs.readFile(project_path + project_name + project_ext, function(err, src) {
    if (err) return console.log(err);

    // The structure of a pjxml:
    // xml - object
    // XILICA - object
    // PROJECT - array of objects
    // NEUTRINO_DEVICE - array of objects
    // SCHEMATIC - array of objects
    // COMPONENT - array of objects
    // $, LA_IN, LA_OUT, ... - objects
    // $.NAME string

    parseString(src, function(err, obj) {
        if (err) return console.log(err);

        var ctl_params_json = {};
        var devices = {};

        obj.XILICA.PROJECT.forEach(function(project, project_index) {
            console.log("Processing", project.$.NAME);

            //console.log(JSON.stringify(device, 0, 4));

            project.NEUTRINO_DEVICE.forEach(function(device, device_index) {
                console.log("--", device.$.NAME);

                let json = {};
                devices[device.$.NAME] = "enter-ip-here";

                device.SCHEMATIC.forEach(function(schematic, schematic_index) {
                    console.log("---", schematic.$.NAME);

                    schematic.COMPONENT.forEach(function(component, schematic_index) {
                        let $ = component.$;

                        if ($.DEF_ID === "5") {
                            // Gain
                            $.COMP_COLOR = "chocolate";
                            default_ctl_config(component);
                            json[component.$.NAME] = "Gain";
                        }

                        if ($.DEF_ID === "6") {
                            // Mute
                            $.COMP_COLOR = "crimson";
                            default_ctl_config(component);
                            json[component.$.NAME] = "Mute";
                        }

                        if ($.DEF_ID === "1") {
                            // RMS Meter
                            $.COMP_COLOR = "navy";
                            let n = meter_ctl_config(component);
                            for (i = 1; i <= n; i++) {
                                json[component.$.NAME + "-" + i] = "RMS Meter";
                            }
                        }
                    });
                });

                ctl_params_json[device.$.NAME] = json;
            });
        });

        var xml = builder.buildObject(obj);
        fs.writeFile(project_path + project_name + project_tag + project_ext, xml, function(err) {
            if (err) return console.log(err);
            console.log("Wrote patched file: " + project_path + project_name + project_tag + project_ext);
        });

        fs.writeFile(project_path + project_name + ".json", JSON.stringify(ctl_params_json, null, 4), function(err) {
            if (err) return console.log(err);
            console.log("Wrote json file: " + project_path + project_name + ".json");
        });

        fs.writeFile(project_path + project_name + ".devices.json", JSON.stringify(devices, null, 4), function(err) {
            if (err) return console.log(err);
            console.log("Wrote json file: " + project_path + project_name + ".devices.json");
        });
    });
});
