/* @DOC

	To dynamically load a component group, place them in a prefixed-components folder, eg. hello-components
    Then, in the vue file use:
    ```components: {
		// ...
        ...load_components("hello-components"),
		// ...
    },```
    
    Voila, each vue file in your component group is loaded and ready to use via filename.

*/


function load_components(group) {
    var components = {};
    const files = Object.keys(ß.VUE_FILES).filter((path) => path.split("/")[1] === group);
    files.forEach(function (file) {
        if (file.split(".").pop() === "vue") {
            var name = file.split("/").pop().split(".")[0];
            components = { ...components, ...{
                [name]: () => System.import(`.${file}`),
            } };
        }
    });
    return components;
}

export default load_components;