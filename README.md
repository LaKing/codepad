# Codepad is a collaborative online code editor and project manager running online in the browser

- manage the projectfiles on a webserver, collaborate with your co-developers in realtime
- codemirror with the most important features enabled, like syntax highlighting and linting
- realtime logging 
- search and replace within the current pad, and within the project
- js-beautifyer for html, css, js
- basic auth with hashed passwords
- command execution with logging to restart/push a project
- wetty for web based shell access to the project

# Demo

[codepad-demo](https://codepad-demo.d250.hu:9001)

# Installation

Codepad consist of a set of modules for our boilerplate module loader.
First of all, the working directory will need the boilerplate files, either in the folder, or symlinked,
[ßoilerplate](https://github.com/LaKing/boilerplate) replacing the boilerplate symlink.

```
git clone git@github.com:LaKing/boilerplate.git
```

Codepad shall not be run as root. I recommend a dedicated codepad user.
It is required to have node.js and npm installed. Midnight commander is optional - but highliy recommended. .)

You may run the scripts especially if you are on redhat based distro with systemd and dnf
The install script should:

- install mongodb mongodb-server
- create ssh keypair for codepad user
- create a profile file for codepad user
- create codepad.service
- create server.js and other files in the codepad folder
- start everything

You may create custmizations within your server.js, by creating the ß - boiler variable.
An example server.js:
```js
#!/bin/node

// to configure our server, we create the ß object now.
if (!global.ß) global.ß = {};

// @DOC To enter debug mode, pass debug as argument to server.js, then ß.DEBUG will be true.
// We will set it here and now.
ß.DEBUG = true;

ß.port = 443;
ß.theme = "idea";

// ß.hash_dir = '/var/codepad/users';

require("./boilerplate");

```

By default, codepad is running on port 9001. Use setcap to enable node to bind to port 443. 

# Usage

Once codepad is installed users can log in, by default if they have .hash file within a folder that equals the username case insensitive in the hash_dir. The hash is sha512 hex of their password.
The main page should contain:
- a few buttons on the top left
- a project-level search and replace input field on the top right 
- the project filetree on the left
- a pad on the right
- a statusbar on the bottom

When editing files, your changes on the pad are written permanently to the projectfiles on the server. However, projectfiles on the server are not monitored for changes, thus changes applied on the server will very likely be overwritten by users editing the files.

Files are accessed on the url /p/folder/file - where p stands for pad. Files should have an extension.
If the files or the folders do not exist, they will get created, and the filetree should be updated automatically.
The special urls /files, /logs, /shell are codepad components as pages.
Another url is /raw/folder/file - should display the file in a raw format.

The button F2 or the 5th button can be used to apply the code beautifyer.
The last button is the push button that can run the project's push.sh script. This script may be used to do various actions, like git push, restarting the project's node process, increase the version build number and similar.

# FAQ

Can I edit PHP/Java/go/whatever code with this codepad?
- Yes of course. Set the project root, and grant permissions. Additionally you may add your own beautifyer, or linter.

Do I need websockets?
- The ßoilerplate uses socket.io, with fallback functionality is websockets are not available.

Do I need other ports?
- No, codepad is running on a single https port.

I have an idea, what should I do?
- You can open an issue on github as feature request, and we can take a look, and guide you to the right direction.

How can I modify a certain functionality by code that is defined in a boilerplate module?
- You should create a modules folder and copy over the file with the folders structure you wish to modify. While the boilerplate boots up it will pick the customized file with a higher priority, thus override the default functionality. 

Why are there node_modules for each module? Why not in one folder?
- We want to keep a really modular structure, as clean as possible. ßoilerplate modules use node_modules, so it does not make sense to mix them into a big pool. node will load them and cash them so there is no performance penalty.

Is the collaborative workflow different from the traditional workflow?
- It can be. You can use the traditional workflow, and manage the project with git, and offline editors. Codepad is aware of server side changes, so you can push your stuff online anytime.
- The advantage of a collaborative editor is that you use continious integration by default. You should talk or chat with your co-editors while editing, to discuss what to do, and push once the code is in a stable state. Don't leave the code in an unstartable state if possible.
