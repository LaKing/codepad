// @DOC we create a `ß.vuex_modules` object, which is a subset of `ß.modules`.

// this is how we determine what modules we actually need for vue
var vuex_module_filter = function(module, dir) {
    // returns true if it is considered a vuex module

    let name = ß.get_modulefolder_name(dir);
    // we need vue modules that either are in a vuex-modules module folder
    if (name === "vuex-modules" || name === "@vuex-modules") return true;
    // or have a vuex folder
    return ß.fs.existsSync(dir + "/vuex");
};

ß.vuex_modules = ß.modules_subset_by_filter(vuex_module_filter);

ß.VUEX = {};