// @DOC component group routes can be created based on active modules, so that all components in group folders are getting a router entry.

import load_components from "@/load_components.js";
import list_components from "@/list_components.js";

// group is a folder in @/ ...
function componentgroup_routes(group) {
  	var routes = [];
    const components = load_components(group);
    Object.keys(list_components(group)).forEach(function (name) {
        var route = components[name];
        // we add routes based on the component name
      	routes.push({
            path: "/" + name,
            component: components[name],
          	// convert to uppercase
            name: name.toUpperCase(),
        });
    });

    return routes;
}

export default componentgroup_routes;