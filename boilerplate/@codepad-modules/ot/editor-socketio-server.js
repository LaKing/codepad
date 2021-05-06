
      /*ßoilerplate */
/*jshint loopfunc: false */

// https://operational-transformation.github.io/ot-for-javascript.html

// @LAB add function wrapper for strict mode
(function() {
    "use strict";

    var node_module = "./node_modules/ot/lib/";

    var EventEmitter = require("events").EventEmitter;
    var TextOperation = require(node_module + "text-operation");
    var WrappedOperation = require(node_module + "wrapped-operation");
    var Server = require(node_module + "server");
    var Selection = require(node_module + "selection");
    var util = require("util");

    // a hackish way of server update
    // the proper way would be to apply the new docuemnt as operation ... maybe, one day.
      EditorSocketIOServer.prototype.updateDocServerOperation = function(content) {
		
      	// whatever operations we had, we will throw them away.
      	this.operations = [];
      	// and update the document
      	this.document = content;
            
		// send a message to pads so they reload themselves
      	for (let i in ß.io.of("/p").sockets) {
          	if (ß.io.of("/p").sockets[i].projectfile === this.docId) ß.io.of("/p").sockets[i].emit("reload");
        }
    };
  /*
    // another way of server update
    // the proper way would be to apply the new docuemnt as operation ... maybe, one day. This does not work.
    EditorSocketIOServer.prototype.updateDocServerOperation = function(content) {
        if (this.document === content) return ß.err("no-operation");
        //else Ł(this.document, content);

        ß.msg("ServerOperation");

        //Ł(this.operations);
        //this.operations = [];

        // and update the document
        //this.document = content;

        var oldlength = this.document.length;

        var revision = this.operations.length;

        var operation = [];
        if (content.length > 0) operation.push(content);
        if (oldlength > 0) operation.push(-oldlength);

        var selection = { ranges: [{ anchor: content.length, head: content.length }] };

        Ł("ARGUMENTS", revision, operation, selection);

        var wrapped;
        try {
            wrapped = new WrappedOperation(TextOperation.fromJSON(operation), selection && Selection.fromJSON(selection));
            this.operations.push(wrapped);
        } catch (exc) {
            console.error("Invalid operation received: " + exc);
            return;
        }
        Ł("WRAPPED:", wrapped);

        try {
            var clientId = null;
            var wrappedPrime = this.receiveOperation(revision, wrapped);
            for (let i in ß.io.of("/p").sockets) {
                if (ß.io.of("/p").sockets[i].projectfile === this.docId) ß.io.of("/p").sockets[i].emit("operation", clientId, wrappedPrime.wrapped.toJSON(), wrappedPrime.meta);
            }
            Ł("OPERATION", clientId, wrappedPrime, wrappedPrime.wrapped.toJSON(), wrappedPrime.meta);
            Ł("OPERATIONS", this.operations);
        } catch (exc) {
            console.error(exc);
        }

        // send a message to pads so they reload themselves
        //for (let i in ß.io.of("/p").sockets) {
        //  	if (ß.io.of("/p").sockets[i].projectfile === this.docId) ß.io.of("/p").sockets[i].emit("reload");
        //}
    };
    
    */
    
    EditorSocketIOServer.prototype.onOperation = function(socket, revision, operation, selection) {
        //*
        //ß.msg("onOperation");

        //Ł("ARGUMENTS", revision, operation, selection);
        /*  ┠─ /text.json
          ┠─ /p#WOFJDdKbwwHstJkfAAAD
          ┠─ 7
          ┠─ [ 38, 'h' ]
          ┠─ { ranges: [ { anchor: 39, head: 39 } ] }
        */

        var wrapped;
        try {
            wrapped = new WrappedOperation(TextOperation.fromJSON(operation), selection && Selection.fromJSON(selection));
        } catch (exc) {
            console.error("Invalid operation received: " + exc);
            return;
        }
        //Ł("WRAPPED:", wrapped);

        try {
            var clientId = socket.id;
            var wrappedPrime = this.receiveOperation(revision, wrapped);

            // @LAB dont flood the console

            this.getClient(clientId).selection = wrappedPrime.meta;
            // send back to sender socket
            socket.emit("ack");
            // send to other document sockets
            socket.broadcast["in"](this.docId).emit("operation", clientId, wrappedPrime.wrapped.toJSON(), wrappedPrime.meta);

            //Ł("OPERATION", clientId, wrappedPrime, wrappedPrime.wrapped.toJSON(), wrappedPrime.meta);
            //Ł("OPERATIONS", this.operations);

            // we define a hook, just in case .. although we don't use it yet.
            //ß.run_hook('edit', socket, this.docId);

            // @LAB Extended

            //Ł(socket.projectfile);
            if (socket.projectfile) {
                // autosave character-by-character
                ß.lib.projectfiles.save(socket.projectfile, this.document);
                ß.lib.projectfiles.operation(socket, revision, "edited");
            }
        } catch (exc) {
            console.error(exc);
        }
    };

    EditorSocketIOServer.prototype.updateSelection = function(socket, selection) {
        var clientId = socket.id;
        if (selection) {
            this.getClient(clientId).selection = selection;
        } else {
            delete this.getClient(clientId).selection;
        }
        socket.broadcast["in"](this.docId).emit("selection", clientId, selection);
    };

    EditorSocketIOServer.prototype.setName = function(socket, name) {
        var clientId = socket.id;
        this.getClient(clientId).name = name;
        socket.broadcast["in"](this.docId).emit("set_name", clientId, name);
    };

    EditorSocketIOServer.prototype.getClient = function(clientId) {
        return this.users[clientId] || (this.users[clientId] = {});
    };

    EditorSocketIOServer.prototype.onDisconnect = function(socket) {
        var clientId = socket.id;
        delete this.users[clientId];
        socket.broadcast["in"](this.docId).emit("client_left", clientId);
    };

    EditorSocketIOServer.prototype.addClient = function(socket) {
        var self = this;

        socket.join(this.docId);
        socket.emit("doc", {
            str: this.document,
            revision: this.operations.length,
            clients: this.users,
            pad: this.docId
        });

        ß.lib.projectfiles.operation(socket, this.operations.length, "opened");

        socket.on("operation", function(revision, operation, selection) {
            self.mayWrite(socket, function(mayWrite) {
                if (!mayWrite) {
                    console.log("User doesn't have the right to edit.");
                    return;
                }
                self.onOperation(socket, revision, operation, selection);
            });
        });

        socket.on("selection", function(obj) {
            self.mayWrite(socket, function(mayWrite) {
                if (!mayWrite) {
                    console.log("User doesn't have the right to edit.");
                    return;
                }
                self.updateSelection(socket, obj && Selection.fromJSON(obj));
            });
        });

        socket.on("disconnect", function() {
            socket.leave(self.docId);
            self.onDisconnect(socket);
            ß.lib.projectfiles.operation(socket, undefined, "closed");

            // @LAB add condition otherwise crashes server if undefined
            if (socket.manager)
                if (socket.manager.sockets.clients(self.docId).length === 0) {
                    self.emit("empty-room");
                }
        });
    };

    function EditorSocketIOServer(document, operations, docId, mayWrite) {
        EventEmitter.call(this);
        Server.call(this, document, operations);
        this.users = {};
        this.docId = docId;
        this.mayWrite =
            mayWrite ||
            function(_, cb) {
                cb(true);
            };
    }

    util.inherits(EditorSocketIOServer, Server);
    extend(EditorSocketIOServer.prototype, EventEmitter.prototype);

    function extend(target, source) {
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key];
            }
        }
    }

    module.exports = EditorSocketIOServer;
})();
