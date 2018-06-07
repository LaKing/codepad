/*jshint esnext: true */

process.on('unhandledRejection', (reason, p) => {
    console.log('@ Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
    console.trace(reason.stack);
});

process.on('SIGTERM', function() {
    console.log("SIGTERM recieved");
});

process.on('SIGUSR1', function() {
    console.log("SIGUSR1 recieved");
});
