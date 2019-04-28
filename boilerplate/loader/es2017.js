/* @DOC
	In async functions we can `await` for `ß` variables to be defined.
    `await ß.isDefined('boilerplate_variable');`
*/

// note, await is is supported after node 7.10.1

if (!ß.isdefined)
    ß.isDefined = function(arg) {
        return new Promise(resolve => {
            if (ß[arg] !== undefined) return resolve();
            var interval = setInterval(() => {
                if (ß[arg] !== undefined) {
                    clearInterval(interval);
                    resolve();
                }
            }, 100);
        });
    };
