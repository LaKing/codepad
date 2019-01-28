# ßoilerplate

A modular framework for NodeJS based applications.

## What kind of sorcery is this?

On one hand the `ß` object, with the modular loader mechanism. The code is defined in the boilerplate/loader folder.  
On the other hand the boilerplate for your application - the stack you start with, that will be customized. Defined by modules that are loaded with the boilerplate loader.  

## What is it good for? Why should I need this? Why am I reading this?

On one hand this is a method to reduce complexity, to organize code, to put it to a reuseable form, to create your own modules, to have a structure.
On the other hand a starting point with some common features already implemented. Several stacks exist already, and it is not too difficoult to start a new stack.

You may need something like that if you have several projects that have some common code, and you don't want to re-implement everything all the time.

### ß - I usually say "the boiler-variable", or it can be called Eszett (IPA: [ɛsˈtsɛt]) or "Sharp S" - a global variable.

Yes, yes, I know, global variables are bad, and pollute the scope. Yes, so we pollute the scope with this special character, never used anywhere else as far as I know.
We attach functions and some objects to that variable, and this will run a modular structure to build up our project(s).

### The boilerplate itself is a modular structure to start a project with. 

The first implementation of a full stack, `@ng-modules` used MongoDB, Express, AngularJS, NodeJS, Passport, and some others. It is now outdated.
`@codepad-modules` implements codepad, a collaborative browser based online IDE that we use.
Frontend `@vue-modules` along with the `@server-modules` backend is a modern Vue based fullstack. `@vuekit-modules` is a minimal non-webpacked version to try things quickly.
The list goes on, so for the actual list you should check what 'factory' modules we provide. 

Take a look at the modules to get the idea how things can be achived. Once the whole thing is started you actually have something you can extend, override, and build further.
As a core concept, you can override any part of the code, by design its just a skeleton.

To explain the philosophy a bit better, a project get's unique as files are added and eventually re-defined.  
There are two kinds of modules, custom modules with priority and factory modules that have parent folders starting with the `@` character.
A project may have a module in both of these folders, in that case if a file is present in a custom module, it has priority over the factory module. 
It can even happen that functionality is split up in two stack folders. Functionality is then built up by the module loader system, honoring your priority modules.

Let me give you an example. In a project instance we have a `modules` folder containing the `app` module, which also has a symlinked file in `@vue-modules`, called `index.html`.
In that case this file defines the index page for the project, and the one from our project overrides the default. Every function, every hook, every frontend file, everything can be customized.

Note: CWD is a module itself as well.

## Getting Started

Download / mount / Clone the git repo into folder where you want to start your project. We usually use `/srv/codepad-project`, since we are working with codepad. 

You can make, no, you should make the boilerplate folder readonly, and create at least one `modules` folder to put your own modules and override existing modules or parts of existing modules.
It is not recommended to modify the boilerplate content in your project! Any file that is placed properly outside of the boilerplate folder in the project folder, will override the file while loading.

So, an example of the structure would be:
```
/srv/codepad-project  # the project folder (CWD)
/srv/codepad-project/boilerplate   # the readonly folder (BPD)
/srv/codepad-project/@somestack-modules   # contains symlinks to the readonly modules used
/srv/codepad-project/mycustom-modules   # the custom modules for the project (with priority over @-modules)
/srv/codepad-project/configs   # the project configuration files (initially generated automatically)
/srv/codepad-project/var/debug   # runtime files, and a debug folder where the boot process can be debugged
...
```

## Running the installer

Well, I use red Hat based systems so if you know what DNF is, you can run the installer.
You will need NodeJS and npm of course. There are some npm.sh files in the modules, these will install the node_modules of the ß-modules.
NOTE: `modules` are ßoilerplat modules, and `node_modules` are npm packaged modules. Unfortunatley npm has no standard for example for location of publicly visible files in a web project. Some npm modules use a `/dist` folder, while some others use some different folder, so we need to crate wrapper modules to define express routes, or our stack might use possibly webpack. The point is, `node_modules` are not to be confused with ß-modules.

You can start your project with `push.sh`, an advanced script that uses system scope, `ß start` or the most simple `node server.js` - pre-defined constants or variables can be added there.

## What modules are used.

In addition to the modules folder, all folders in the working directory that have 'modules' in their name will be considered as a set of modules. (Except `node_modules`)
They are processed sequentially, however if a modules folder is prefixed with `@` it will be considered a boilerplate factory module, and has lower priority as the other modules. 
A module-condition.js file if present, has to evalute to true. A list of modules is printed into `/var/boilerplate/debug` 

## Other special characters

if you see this:
```
ł(some_vairable, or_two_variables); // mostly same as console.log
Ł(that, or_what, something); // extended logs with info on where it happened
```
Don't panik. These two are just logging functions, mainly used in development.

```
đ(err); // not so fatal, log and continiue
Đ(error); // fatal error, log and throw
```

Don't panik either. These two are the determinator and the detonator functions, that handle errors.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
