let groups = {};

Object.keys(ß.VUE_FILES).forEach(function (filename, ix) {
    if (filename.split(".").pop() !== "js") return;
    if (filename.split("/").pop().split(".").length !== 3) return;
    let group = filename.split("/").pop().split(".")[1];
    groups[group] = true;
});

Object.keys(groups).forEach(function (group, ix) {

  ß.lib.vue.build_componentgroup(group);

});
