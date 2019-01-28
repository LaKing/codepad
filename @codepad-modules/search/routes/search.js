/*ßoilerplate */

const ejsfile = ß.get_module_path('search','public/results.ejs');
const errfile = ß.get_module_path('search','public/err.ejs');

const {
    spawn
} = require('child_process');

function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("&nbsp;") + '#' + num;
}
        
function ref(m) {return '<b><span class="cm-atom">' + m + '</span></b>';}

function form_response(data, search_term, replace_term) {
    data = data.replace(/^\s*$[\n\r]{1,}/gm, '');

    // you may use an absoulete path ... 
    var abspart = '';

    // we assemble the html here and send it directly. 
    var res_send = ''; //

    var lines = data.split('\n');
    if (lines.length === '0') res_send += "<b>" + search_term + " not found.</b>";
    var i_s = 0;

    //if (lines.length > 350) {
    //    i_s = lines.length - 250;
    //    res_send += lines.length + " matches. Truncated ...<br />";
    //}

    // current folder+file
    var current = '';
    var link = '';

    for (var i = i_s; i < lines.length; i++) {
        // current line
        var line = lines[i];

        if (line.length < 2) continue;
        // index of folder+file|#+text seperation
        var v = line.indexOf(':');
        // index of line-counter
        var w = line.substring(v + 1).indexOf(':');
        // index of folder|filename seperaion
        var g = line.substring(0, v).lastIndexOf('/');

        // skip binary files (where line number is NaN)
        if (isNaN(parseInt(line.substring(v + 1, v + w + 2)))) continue;

        // actual folder+file
        var fullpath = line.substring(0, v);
        // actual linenumber
        var no = parseInt(line.substring(v + 1, v + w + 2));

        // line indicator
        link = abspart + '/p/' + fullpath + '?line=' + no;
        var textline = '<b><a class="CodeMirror-guttermarker" href="' + link + '" style="text-decoration: none">' + zeroPad(no, 5) + '</a> </b>';

        //current text
        var re = new RegExp(search_term, 'g');
        var sw = '<b><span class="cm-atom">' + search_term + '</span></b>';
      
        var text = line.substring(v + w + 2, 250).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(re, ref);

        if (current !== fullpath) {
            link = abspart + '/p/' + fullpath;
            //onclick="JavaScript:top.document.getElementById(\'fileView\').src=\'' + link + '\'"
            res_send += '<br /><a href="' + link + '" class="CodeMirror-guttermarker">' + fullpath.substring(0, g) + '<b>' + fullpath.substring(g) + '</b></a> - ' + sw;

            // offer_term the replace action
            if (replace_term) res_send += ' - <a class="CodeMirror-guttermarker" href="' + abspart + '/replace/' + fullpath + '?&find=' + search_term + '&replace=' + replace_term + '">REPLACE ALL TO:</a> <span class="term">' + replace_term + '</span>';

            res_send += '<br /><br />' + textline + text + '<br />';
            current = fullpath;

        } else {
            res_send += textline + text + '<br />';
        }
    }

    res_send += "<br /><br /> " + (lines.length - 1) + " matches.";
    //if (lines.length > 350) {
    //    res_send += " Truncated.";
    //}

    return res_send;
}

function send_ahead() {
    var res_send = '';
    res_send += '<!doctype html>';
    res_send += '<title>Search results</title>';
    res_send += '<meta charset="utf-8" />';
    res_send += '<link rel="stylesheet" href="/codemirror/theme/' + ß.THEME + '.css">';
    res_send += '<link rel="stylesheet" type="text/css" href="/index.css" />';
    res_send += '<script type="text/javascript">';
    res_send += '    window.onload = toBottom;';
    res_send += '    function toBottom() {';
    res_send += '        window.scrollTo(0, document.body.scrollHeight);';
    res_send += '    }';
    res_send += '</script>';
    res_send += '<body class="cm-s-' + ß.THEME + ' CodeMirror" style="font-family: Monaco, \'Lucida Console\', monospace; margin: 20px;">';

    return res_send;
}

function express_search(req, res) {

    //Ł(req.query);
    var search_term = req.query.find; // req.params[0];
    var replace_term = req.query.replace;

    if (search_term === '' || typeof search_term === 'undefined') {
        res.send("Error. No search term.");
        return;
    }
    const options = {
        cwd: ß.projectdir,
        env: process.env
    };
    //grep --exclude-dir={node_modules,.git,log} -inrow -E ".{0,100}$arg.{0,100}"
    console.log('search: /bin/grep --exclude-dir=.git --exclude-dir=log --exclude-dir=node_modules --exclude-dir=var -InRowE ".{0,100}' + search_term + '.{0,100}"');
    //const x = spawn('/bin/grep', ['--exclude-dir={.git,log}', '-nrowE', '".{0,100}' + search_term + '.{0,100}"'], options);
    
  // grep switches
  /*
  	-I Ignore binary files
    -n line numbers
    -R dereference-recursive (recursive, following symlinks)
    -o only-matching
    -w whole word-regexp
    -E extended-regexp
    -F no regexp, fixed string
    .{0,100} limit displayed characters length
    
    LC_ALL='C'
    
  */

    const x = spawn('/bin/grep', ['--exclude-dir=.git', '--exclude-dir=log', '--exclude-dir=node_modules', '--exclude-dir=var', '-InRowE', '.{0,100}' + search_term + '.{0,100}'], options);

    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.write(send_ahead());
	res.write(ß.now() + '<p>Search <b>' + search_term + '</b> ' + ( replace_term || '') + '</p> <br><br>');
  
    for (var f in ß.projectfiles) {
        if (f.indexOf(search_term) >= 0 || (ß.projectfiles[f].at && ß.projectfiles[f].at[search_term]))
            res.write('<b><a class="CodeMirror-guttermarker" href="/p' + f + '" style="text-decoration: underline">' + f + '</a> </b><br>');

    }
    res.write('<br>');

    var stdout = '';
    var stderr = '';

    x.stdout.on('data', (data) => {
        stdout += `${data}`;
        res.write('[' + (stdout.split('\n').length - 1) + ']');
    });

    x.stderr.on('data', (data) => {
        stderr += `${data}`;
    });

    x.on('close', (code) => {
        if (code === 1) return res.end('<br>Nothing. Nix. Nincs. Nada. Null. <br></body>');
        if (code !== 0) return res.end('<br>Houston, we have a problem<br><pre>' + stderr + '</pre></body>');
        res.write('[end]<br><br>');

        //res.render(errfile, {
        //    theme: ß.THEME,
        //    code: stderr
        //});

        //res.render(ejsfile, {
        //    theme: ß.THEME,
        //    results: form_response(stdout, search_term)
        //});
        res.end(form_response(stdout, search_term, replace_term) + '</body>');
    });

    setTimeout(function() {
        stderr += 'Search-process timeout';
        x.kill();

    }, 15000);
}

ß.app.get('/search', function(req, res, next) {
    express_search(req, res);
});
ß.app.get('/replace', function(req, res, next) {
    res.end('replace uri should contain the filename');
});

ß.app.get('/replace/*', function(req, res, next) {
    var search_term = req.query.find; // req.params[0];
    var replace_term = req.query.replace;
    var replace_file = '/' + req.params[0];
    ß.lib.search.replace(replace_file, search_term, replace_term, function(err, success) {
        ß.lib.projectfiles.oplog(ß.lib.username_by_req(req), 'replaced ' + search_term + ' to ' + replace_term + ' in', replace_file);
        express_search(req, res);
    });

});