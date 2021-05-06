/*ßoilerplate */

// tiny helper functions for frontend files

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
