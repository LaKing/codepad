/*
	it is possible to create module objects representing a set of modules and their directories to be processed further.
    This file deals with functions that can operate on these modules objects, mmost likely derivatives of the primary `ß.modules` object represeinting all available modules.
*/


// `ß.module_subset_by_filter(filter)` will create an object from the `ß.modules` object, for each module directory a custom `filter(module, dir, priority)` function passed as argument has to return true.
if (!ß.modules_subset_by_filter)
    ß.modules_subset_by_filter = function(filter) {
        if (!filter)
            filter = function() {
                return true;
            };

        var result = {};
        for (let module in ß.modules) {
            for (let dir in ß.modules[module]) {
                if (filter(module, dir, ß.modules[module][dir])) {
                    if (!result[module]) result[module] = {};
                    result[module][dir] = ß.modules[module][dir];
                }
            }
        }
        return result;
    };


// `ß.priorized_modules_function(modules, process)` first argument is a modules object, second argument is a function to be called `process(module, dir, priority);` 
if (!ß.modules_process)
    ß.modules_process = function(modules, process) {
        for (let module in modules) {
            // priority
            for (let dir in modules[module]) {
                if (modules[module][dir] === true) process(module, dir, true);
            }
            // no priority
            for (let dir in modules[module]) {
                if (modules[module][dir] === false) process(module, dir, false);
            }
        }
    };

