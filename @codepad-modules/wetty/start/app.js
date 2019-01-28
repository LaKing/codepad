/*ßoilerplate */


//var express = require('express');
const express = ß.express;
//const http = require('http');
const https = require('https');
const path = require('path');
const server = require('socket.io');
const pty = require('pty.js');
const fs = ß.fs;
const os = require('os');


// We need the id_rsa file
// We need the user to be able to connect
// - home dir
// - login shell
// - .profile file
// execute-right, 700 on .ssh folder
// read-right 600 on id_rsa

var sshport = 22;
var sshhost = 'localhost';
var sshauth = 'publickey';
var sshuser = 'codepad';
var id_file = os.homedir() + '/.ssh/id_rsa';

var app = ß.app;



ß.wio.on('connection', function(socket) {

    var request = socket.request;

    var term;
    if (process.getuid() == 0) {
        console.log(' - shell: no terminal for root');
    } else {
        //console.log('ssh ' + sshuser + '@' + sshhost + ' -p ' + sshport + ' -o  PreferredAuthentications=' + sshauth + ' -i ' + id_file);
        term = pty.spawn('ssh', [sshuser + '@' + sshhost, '-p', sshport, '-o', 'PreferredAuthentications=' + sshauth, '-i', id_file], {
            name: 'xterm-256color',
            cols: 80,
            rows: 30
        });
    }
    //console.log((new Date()) + " PID=" + term.pid + " STARTED on behalf of user=" + sshuser);
    term.on('data', function(data) {
        socket.emit('output', data);
    });
    term.on('exit', function(code) {
        //console.log((new Date()) + " PID=" + term.pid + " ENDED");
    });
    socket.on('resize', function(data) {
        term.resize(data.col, data.row);
    });
    socket.on('input', function(data) {
        term.write(data);
    });
    socket.on('disconnect', function() {
        term.end();
    });
});

console.log('- shell available');