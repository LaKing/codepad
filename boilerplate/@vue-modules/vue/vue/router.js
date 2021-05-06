import Vue from "vue";
import VueRouter from "vue-router";

var routes = [];

//We will have two methods for automatically creating routes
// from module x.routes.js files
// from components custom route definitions

// module-routes are user defined in each module vue/[custom-name].router.js
import routers from "@/componentgroup/router.js";

Object.keys(routers).forEach(function (name) {
	routes = routes.concat(routers[name]);
});

// app components contain every component of the app named with the filename (space and minus is renamed to underscore)
// this can be used to statically load all components we can see, that are enabled in the boilerplate module system.
import components from "@/boilerplate/components.js";

// we will check the components, and add each of them that has a route section
Object.keys(components).forEach(function (name) {
    if (components[name].route) {
        const component = components[name];
        var route = {};
      
      	// we accept route to be string
        if (typeof components[name].route === "string") {
          	if (components[name].route.charAt(0) === '/') route.path = components[name].route;
            else route.path = "/" + components[name].route;
        }
      	// but it's better to use an object
      	if (typeof components[name].route === "object") {
           route = components[name].route;
        }
       
        // by default the component on the route should be the component itself
        if (!route.component) route.component = component;
        // if the route is not named, we will use the component name
        if (!route.name) route.name = component.name;
        // if the route does not have a path, we will use the component name delivered from the filename
        if (!route.path) route.path = "/" + name;
        routes.push(route);
    }
});

Vue.use(VueRouter);

// to access the routes in vue refer to $router.options.routes

const router = new VueRouter({
    mode: "history",
    routes,
});

export default router;
