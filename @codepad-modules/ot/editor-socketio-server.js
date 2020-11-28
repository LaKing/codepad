/*ßoilerplate */
/*jshint loopfunc: false */

// https://operational-transformation.github.io/ot-for-javascript.html

// @LAB add function wrapper for strict mode
(function () {
    "use strict";

    var node_module = "./node_modules/ot/lib/";

    var EventEmitter = require("events").EventEmitter;
    var TextOperation = require(node_module + "text-operation");
    var WrappedOperation = require(node_module + "wrapped-operation");
    var Server = require(node_module + "server");
    var Selection = require(node_module + "selection");
    var util = require("util");

    EditorSocketIOServer.prototype.compareDocServerOperation = function (content) {
        return this.document === content;
    };
    
    EditorSocketIOServer.prototype.getDocServerOperation = function () {
        return this.document;
    };
    
    // a hackish way of server update
    // the proper way would be to apply the new docuemnt as operation ... maybe, one day.
    EditorSocketIOServer.prototype.updateDocServerOperation = function (content) {
        // whatever operations we had, we will throw them away.
        this.operations = [];
        // and update the document
        this.document = content;
        // send relaod to clients
        ß.lib.projectfiles.reload(this.docId);
    };
    
    EditorSocketIOServer.prototype.onOperation = function (socket, revision, operation, selection) {
        let projectfile = socket.projectfile;

        var wrapped;
        try {
            wrapped = new WrappedOperation(TextOperation.fromJSON(operation), selection && Selection.fromJSON(selection));
        } catch (exc) {
            if (ß.DEBUG) return console.error(projectfile, "WrappedOperation: ", exc);
            return console.error(projectfile, "WrappedOperation: error");
        }

        var wrappedPrime;
        try {
            wrappedPrime = this.receiveOperation(revision, wrapped);

            // ...
        } catch (exc) {
            if (ß.DEBUG) return console.error(projectfile, revision, wrapped, "receiveOperation: ", exc);
            return console.error(projectfile, revision, "receiveOperation: error");
        }

        // @LAB dont flood the console
        var clientId = socket.id;

        this.getClient(clientId).selection = wrappedPrime.meta;
        // send back to sender socket
        socket.emit("ack");
        // send to other document sockets
        socket.broadcast["in"](this.docId).emit("operation", clientId, wrappedPrime.wrapped.toJSON(), wrappedPrime.meta);

        // @LAB Extended

        // autosave character-by-character
        ß.lib.projectfiles.save(socket, this.document);
        ß.lib.projectfiles.operation(socket, revision, "edited");
    };

    EditorSocketIOServer.prototype.updateSelection = function (socket, selection) {
        var clientId = socket.id;
        if (selection) {
            this.getClient(clientId).selection = selection;
        } else {
            delete this.getClient(clientId).selection;
        }
        socket.broadcast["in"](this.docId).emit("selection", clientId, selection);
    };

    EditorSocketIOServer.prototype.setName = function (socket, name) {
        var clientId = socket.id;
        this.getClient(clientId).name = name;
        socket.broadcast["in"](this.docId).emit("set_name", clientId, name);
    };

    EditorSocketIOServer.prototype.getClient = function (clientId) {
        return this.users[clientId] || (this.users[clientId] = {});
    };

    EditorSocketIOServer.prototype.onDisconnect = function (socket) {
        var clientId = socket.id;
        delete this.users[clientId];
        socket.broadcast["in"](this.docId).emit("client_left", clientId);
    };

    EditorSocketIOServer.prototype.addClient = function (socket) {
        var self = this;

        socket.join(this.docId);
        socket.emit("doc", {
            str: this.document,
            revision: this.operations.length,
            clients: this.users,
            pad: this.docId,
        });

        ß.lib.projectfiles.operation(socket, this.operations.length, "opened");

        socket.on("operation", function (revision, operation, selection) {
            self.mayWrite(socket, function (mayWrite) {
                if (!mayWrite) {
                    return;
                }
                self.onOperation(socket, revision, operation, selection);
            });
        });

        socket.on("selection", function (obj) {
            self.mayWrite(socket, function (mayWrite) {
                if (!mayWrite) {
                    return;
                }
                self.updateSelection(socket, obj && Selection.fromJSON(obj));
            });
        });

        socket.on("disconnect", function () {
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
            function (_, cb) {
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
