/*jshint esnext: true */

const fs = require('fs-extra');
//const recursive_readdirSync = require('recursive-readdir-sync');

// base ist most likely ß.CWD or ß.BPD
// dir is a directory in the modules or in the project itself -it is not recursive by default!
if (!ß.get_files_array)
    ß.get_files_array = function(base, dir) {

        var files = [];

        if (fs.existsSync(base + '/' + dir)) files = fs.readdirSync(base + '/' + dir);

        for (let m = 0; m < ß.modules.length; m++) {
            var mfiles = [];
            var path = base + '/modules/' + ß.modules[m] + '/' + dir;
            if (fs.existsSync(path)) mfiles = fs.readdirSync(path);
            files = [...new Set([...files, ...mfiles])];
        }
        return files;
    };

// find the full path of a file
if (!ß.find_file_path)
    ß.find_file_path = function(dir, file) {

        if (fs.existsSync(ß.CWD + '/' + dir + '/' + file)) return ß.CWD + '/' + dir + '/' + file;
        for (let m = 0; m < ß.modules.length; m++) {
            if (fs.existsSync(ß.CWD + '/modules/' + ß.modules[m] + '/' + dir + '/' + file)) return ß.CWD + '/modules/' + ß.modules[m] + '/' + dir + '/' + file;
        }
        if (fs.existsSync(ß.BPD + '/' + dir + '/' + file)) return ß.BPD + '/' + dir + '/' + file;
        for (let m = 0; m < ß.modules.length; m++) {
            if (fs.existsSync(ß.BPD + '/modules/' + ß.modules[m] + '/' + dir + '/' + file)) return ß.BPD + '/modules/' + ß.modules[m] + '/' + dir + '/' + file;
        }
        return '/tmp/point-of-no-return';
    };

// find files of a boilerplate directory 
if (!ß.get_dir_files)
    ß.get_dir_files = function(dir) {

        const cpfiles = ß.get_files_array(ß.CWD, dir);
        const bpfiles = ß.get_files_array(ß.BPD, dir);

        return [...new Set([...bpfiles, ...cpfiles])];
    };

if (!ß.select_by_extension)
    ß.select_by_extension = function(files, ext) {

        result = [];
        for (let f = 0; f < files.length; f++) {
            if (files[f].substring(files[f].length - ext.length, files[f].length) === ext) result.push(files[f]);
        }

        return result;
    };

if (!ß.select_by_prefix)
    ß.select_by_prefix = function(files, pre) {

        result = [];
        for (let f = 0; f < files.length; f++) {
            if (files[f].substring(0, pre.length) === pre) result.push(files[f]);
        }

        return result;
    };

if (!ß.get_frontend_files)
    ß.get_frontend_files = function() {

        const public_files = ß.get_dir_files('public');
        const static_files = ß.get_dir_files('static');

        return [...new Set([...public_files, ...static_files])];
    };


if (!ß.to_style_html)
    ß.to_style_html = function(files, type) {
        result = '';

        for (let f = 0; f < files.length; f++) {
            result += '    <link rel="stylesheet" href="' + files[f] + '">\n';
        }

        return result;
    };

if (!ß.to_script_html)
    ß.to_script_html = function(files, type) {
        result = '';

        for (let f = 0; f < files.length; f++) {
            result += '    <script src="/' + files[f] + '"></script>\n';
        }

        return result;
    };
