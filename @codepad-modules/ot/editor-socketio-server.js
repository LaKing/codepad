/*ßoilerplate */
/*jshint loopfunc: false */

// @LAB add function wrapper for strict mode
(function() {

    'use strict';

    var node_module = './node_modules/ot/lib/';

    var EventEmitter = require('events').EventEmitter;
    var TextOperation = require(node_module + 'text-operation');
    var WrappedOperation = require(node_module + 'wrapped-operation');
    var Server = require(node_module + 'server');
    var Selection = require(node_module + 'selection');
    var util = require('util');

    function EditorSocketIOServer(document, operations, docId, mayWrite) {
        EventEmitter.call(this);
        Server.call(this, document, operations);
        this.users = {};
        this.docId = docId;
        this.mayWrite = mayWrite || function(_, cb) {
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

    EditorSocketIOServer.prototype.addClient = function(socket) {
        var self = this;

        socket.join(this.docId);
        socket.emit('doc', {
            str: this.document,
            revision: this.operations.length,
            clients: this.users,
            pad: this.docId
        });

        ß.lib.projectfiles.operation(socket, this.operations.length, 'opened');

        socket.on('operation', function(revision, operation, selection) {
            self.mayWrite(socket, function(mayWrite) {
                if (!mayWrite) {
                    console.log("User doesn't have the right to edit.");
                    return;
                }
                self.onOperation(socket, revision, operation, selection);
            });
        });

        socket.on('selection', function(obj) {
            self.mayWrite(socket, function(mayWrite) {
                if (!mayWrite) {
                    console.log("User doesn't have the right to edit.");
                    return;
                }
                self.updateSelection(socket, obj && Selection.fromJSON(obj));
            });
        });

        socket.on('disconnect', function() {
            socket.leave(self.docId);
            self.onDisconnect(socket);
            ß.lib.projectfiles.operation(socket, undefined, 'closed');

            // @LAB add condition otherwise crashes server if undefined
            if (socket.manager)
                if (socket.manager.sockets.clients(self.docId).length === 0) {
                    self.emit('empty-room');
                }
        });
    };

    EditorSocketIOServer.prototype.onOperation = function(socket, revision, operation, selection) {
        var wrapped;
        try {
            wrapped = new WrappedOperation(
                TextOperation.fromJSON(operation),
                selection && Selection.fromJSON(selection)
            );
        } catch (exc) {
            console.error("Invalid operation received: " + exc);
            return;
        }

        try {
            var clientId = socket.id;
            var wrappedPrime = this.receiveOperation(revision, wrapped);

            // @LAB dont flood the console
            this.getClient(clientId).selection = wrappedPrime.meta;
            // send back to sender socket
            socket.emit('ack');
            // send to other document sockets
            socket.broadcast['in'](this.docId).emit(
                'operation', clientId,
                wrappedPrime.wrapped.toJSON(), wrappedPrime.meta
            );

            // we define a hook, just in case .. although we don't use it yet.
            ß.run_hook('edit', socket, this.docId);

            if (socket.projectfile) {
                // autosave character-by-character
                ß.lib.projectfiles.save(socket.projectfile, this.document);
                ß.lib.projectfiles.operation(socket, revision, 'edited');
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
        socket.broadcast['in'](this.docId).emit('selection', clientId, selection);
    };

    EditorSocketIOServer.prototype.sendServerUpdate = function(socket, wrappedPrime) {
        socket.emit('getCursor', function(data) {

            // update reflecting the changes
            socket.emit(
                'operation', ß.HOSTNAME,
                wrappedPrime.wrapped.toJSON(), wrappedPrime.meta
            );


            //if (data.line !== 0 && data.ch !== 0) 
            socket.emit('setCursor', data);

        });

    };


    EditorSocketIOServer.prototype.onServerOperation = function(revision, operation, selection) {
        var self = this;

        var wrapped;
        try {
            wrapped = new WrappedOperation(
                TextOperation.fromJSON(operation),
                selection && Selection.fromJSON(selection)
            );
            var wrappedPrime = this.receiveOperation(revision, wrapped);

            // broadcast operation to all sockets of this pad

            for (let i in ß.io.sockets.sockets) {
                let socket = ß.io.sockets.sockets[i];
                if (socket.projectfile !== this.docId) continue;

                self.sendServerUpdate(socket, wrappedPrime);
            }

        } catch (exc) {
            console.error("Invalid operation received: " + exc);
            return;
        }
    };

    EditorSocketIOServer.prototype.clearDocServerOperation = function() {

        var self = this;
        var revision = this.operations.length;
        var operation = [-this.document.length];
        var selection = {
            ranges: [{
                anchor: 0,
                head: 0
            }]
        };
        self.onServerOperation(revision, operation, selection);
    };


    EditorSocketIOServer.prototype.updateDocServerOperation = function(content) {

        // first of all, clear the document, then apply the content as edit.
        var self = this;
        self.clearDocServerOperation();

        var revision = this.operations.length;
        var operation = [content];
        var selection = {
            ranges: [{
                anchor: 0,
                head: 0
            }]
        };

        self.onServerOperation(revision, operation, selection);


    };

    EditorSocketIOServer.prototype.setName = function(socket, name) {
        var clientId = socket.id;
        this.getClient(clientId).name = name;
        socket.broadcast['in'](this.docId).emit('set_name', clientId, name);
    };

    EditorSocketIOServer.prototype.getClient = function(clientId) {
        return this.users[clientId] || (this.users[clientId] = {});
    };

    EditorSocketIOServer.prototype.onDisconnect = function(socket) {
        var clientId = socket.id;
        delete this.users[clientId];
        socket.broadcast['in'](this.docId).emit('client_left', clientId);
    };

    module.exports = EditorSocketIOServer;

}());