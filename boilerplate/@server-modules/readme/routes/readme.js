/*ßoilerplate */

const pre = '<meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="github-markdown.css"><style>.markdown-body {box-sizing: border-box;min-width: 200px;max-width: 980px;margin: 0 auto;padding: 45px;}@media (max-width: 767px) {.markdown-body {padding: 15px;}}</style><article class="markdown-body">';

const post = '</article>';

/* @DOC

	The README for the project is served under the `/README.html` url.

*/

ß.app.get('/README.html', function(req, res) {
    if (ß.MODE !== 'production')
        ß.fs.readFile(ß.CWD + '/README.html', 'utf8', function(err, data) {
            if (err) {
                console.log('ERROR could not serve README.html');
                res.send('ERROR');
                return;
            }

            // send the data, and apply some Cashe-control in production to these statically localized files
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Content-Type', req.is('*/*'));

            res.send(pre + data + post);

        });
    else res.send('/README.html not available in production.');
});