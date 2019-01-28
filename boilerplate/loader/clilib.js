const fs = ß.fs;

// create a list of subdirectories from a directory - with an optional filter. Returns an array.
if (!ß.get_directory_list_by_filter)
    ß.get_directory_list_by_filter = function(dir, filterfn) {
        var list = [];
        if (filterfn === undefined)
            filterfn = function(a) {
                return true;
            };

        fs.inDirsSync(dir, function(entry) {
            if (filterfn(entry)) list.push(entry);
        });

        return list;
    };

// create a list of files from a directory - with an optional filter. Returns an array.
if (!ß.get_file_list_by_filter)
    ß.get_file_list_by_filter = function(dir, filterfn) {
        var list = [];
        if (filterfn === undefined)
            filterfn = function(a) {
                return true;
            };
        if (fs.isDirSync(dir)) {
            let f = fs.readdirSync(dir);
            for (let i = 0; i < f.length; i++) {
                if (fs.isFileSync(dir + "/" + f[i])) {
                    if (filterfn(f[i])) list.push(f[i]);
                }
            }
        }

        return list;
    };

if (!ß.uplink_with_filter)
    ß.uplink_with_filter = function(path, destination, list) {
        // the list is not an optional argument
        if (!list) return;
        if (fs.isDirSync(path)) {
            fs.mkdirpSync(destination);
            let a = fs.readdirSync(path);
            for (let i = 0; i < a.length; i++) {
                if (list.indexOf(a[i]) >= 0) ß.link(path + "/" + a[i], destination + "/" + a[i]);
            }
        }
    };

function is_factory_module_lib(a) {
    return a.charAt(0) === "@";
}

function is_module_list_json(a) {
    let arr = a.split(".");
    let ext = arr.pop();
    let tag = arr.pop();
    return tag === "modules" && ext === "json";
}

// procedure to process the uplink commands
if (!ß.cli_uplink)
    ß.cli_uplink = function() {
        // module liberary directory
        if (!ß.MLD) ß.MLD = "/usr/local/share/boilerplate";

        const stack_list = ß.get_directory_list_by_filter(ß.MLD, is_factory_module_lib);

        if (stack_list.length > 0) ß.cli_commands.push("uplink [ " + stack_list.join(" | ") + " ]");

        const app_list = ß.get_file_list_by_filter(ß.MLD, is_module_list_json);

        if (app_list.length > 0) ß.cli_commands.push("uplink [ " + app_list.join(" | ") + " ]");

        if (ß.CMD === "uplink") {
            var found = false;
            if (ß.ARG) {
                let path = ß.MLD + "/" + ß.ARG;
                if (ß.fs.existsSync(path)) {
                    ß.ntc("ß uplink " + ß.ARG);

                    if (fs.isDirSync(path) && is_factory_module_lib(ß.ARG)) {
                        ß.uplink(ß.MLD + "/" + ß.ARG, ß.CWD + "/" + ß.ARG);
                        found = true;
                    }
                    if (fs.isFileSync(path) && is_module_list_json(ß.ARG)) {
                        found = true;
                        let data = fs.readJsonSync(path, "utf-8");
                        for (let i in data) {
                            console.log(i);
                            ß.uplink_with_filter(ß.MLD + "/" + i, ß.CWD + "/" + i, data[i]);
                        }
                    }
                }
            } else {
                for (let i in stack_list) {
                    if (ß.fs.existsSync(ß.MLD + "/" + stack_list[i])) {
                        ß.ntc("ß uplink " + stack_list[i]);
                        ß.uplink(ß.MLD + "/" + stack_list[i], ß.CWD + "/" + stack_list[i]);
                        found = true;
                    }
                }
            }
            if (found) {
                process.exit();
                return;
            }
        }
    };
