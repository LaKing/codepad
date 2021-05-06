/* @DOC

	To list a component group, place them in a prefixed-components folder, eg. hello-components
        Then, in the vue data :
    ```
    components: list_components("hello-components")
    ```
    and in the html template
    ```
    <div v-for="(path, name) in components">
        <component v-bind:is="name"></component>
    </div>
    ```
    Voila, each vue file in your component group is in the components array.

*/

function list_components(group) {
    var components = {};
    const files = Object.keys(ß.VUE_FILES).filter((path) => path.split("/")[1] === group);
    files.forEach(function (file) {
        if (file.split(".").pop() === "vue") {
            var name = file.split("/").pop().split(".")[0];
            components[name] = file;
        }
    });
    return components;
}

export default list_components;
