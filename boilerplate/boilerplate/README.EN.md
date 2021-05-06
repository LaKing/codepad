# ßoilerplate

A modular framework for NodeJS based applications.
It has a concept of stacks, and goes fullstack. 
We have a couple of videos on [D250 Laboratories Channel](https://www.youtube.com/channel/UCFHJ_2K77kzJxD077wt6-8g)

## What kind of sorcery is this?

On one hand the `ß` object, and the modular loader mechanism. The code is defined in the boilerplate/loader folder.  
On the other hand the boilerplate for your application - the stack you can start with, that will be customized. Defined by boilerplate-modules that are loaded with the boilerplate loader.  

## What is it good for? Why should I need this? Why am I reading this?

On one hand this is a method to reduce complexity, to organize code, to put it to a reuseable form, to create your own modules, to have a structure.
On the other hand a starting point with some common features already implemented. Several stacks exist already, and it is not too difficoult to start a new stack.

You may need something like that if you have several projects that have some common code, and you don't want to re-implement everything all the time.

### ß - I usually say "the boiler-variable", but you can call it Beta if you like.

That special character is part of the German alphabet, it is called Eszett (IPA: [ɛsˈtsɛt]) or "Sharp S".
Yes, yes, I know, global variables are bad, and pollute the scope. Yes, so we pollute the scope with this special character, never used anywhere else as far as I know.
We attach functions and some objects to that variable, and this will run a modular structure to build up our project(s).
Okay, to be honest, we have a couple of those special characters. Yes, we are stupid hungarians and use our stupid hungarian keyboard.

### The boilerplate itself is a modular structure to start a project with. 

The first implementation of a full stack, `@ng-modules` used MongoDB, Express, AngularJS, NodeJS, Passport, and some others. It is now outdated.
`@codepad-modules` implements codepad, a collaborative browser based online IDE that we use.
Frontend `@vue-modules` along with the `@server-modules` backend is a modern Vue based fullstack. `@vuekit-modules` is a minimal non-webpacked version to try things quickly.
The list goes on, so for the actual list you should check what 'factory' modules we provide. They reside in a folder that starts with the `@` character. 

Take a look at the modules to get the idea how things can be achived. Once the whole thing is started you actually have something you can extend, override, and build further.
As a core concept, you can override any part of the code, by design its just a skeleton.

To explain the philosophy a bit better, a project get's unique as files are added and eventually re-defined.  
There are two kinds of modules, custom modules with priority and factory modules that have parent module collection folders starting with the `@` character.
A project may have a module in both of these folders, in that case if a file is present in a custom module, it has priority over the factory module. 
It can even happen that functionality is split up in two stack folders. Functionality is then built up by the module loader system in a boot process, honoring your priority modules.

Let me give you an example. In a project instance we have a custom `project-modules` folder containing the `app` boilerplate module, in which we have a file `vue/index.html`.
We also have one from the factory, located in `@vue-modules/app/index.html` and in that case `project-modules/app/index.html` overrides the default factory index. 
Every function, every hook, every frontend file, everything can be customized. this is our concept. Write as minimal as possible in a file, and that can be then customized in each project instance.

Note: CWD is treated as a module itself, but organize your code into modules, and the betetr you name then, the better you separate them, the more reusable they will be.

## Getting Started

Download / mount / Clone the git repo into folder where you want to start your project. We usually use `/srv/codepad-project`, since we are working with codepad. 

You can make, no, you should make the boilerplate folder readonly, and create at least one `custom-modules` folder to put your own modules and override existing modules or parts/files of existing modules.
It is not recommended to modify the boilerplate content in your project! Any file that is placed properly outside of the boilerplate folder in the project folder, will override the file while loading.
We actively develop the framework, maintain it as good as we can, and you should keep your custom code on a minimal level. Also, feel free to suggest us modifications.

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
A module-condition.js file if present, has to evalute to true. A list of modules is printed into `var/boilerplate.log/modules.log` and you can see a couple of log files here from the boot process. 

## Other special characters

if you see this:
```
Ł(that, or_what, something); // extended development logs with info on where it happened
```
Don't panik. These two are just logging functions, mainly used in development.

```
ł(obj, string); // my fetish for handy functions, i call it leadnull function
đ(err); // not so fatal, log and continiue
Đ(error); // fatal error, log and prevent further disasters by exiting
```

Don't panik either. These are the leadnull, the determinator and the detonator functions, that handle errors. My crazy shit. Love it or hate it.

## License

Product of [D250 Laboratories](https://d250.hu/).
This is collaborativeware. That means if you use it, you must let me know, and you should collaborate.
Licensed under the MIT License for now - see the [LICENSE.md](LICENSE.md) file for details.
