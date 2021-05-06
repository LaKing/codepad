/*ßoilerplate */

// @DOC The nodemailer module allows to send mail from the backend, via localhost port 25 by default.

const nodemailer = require('nodemailer');

// expose the function that will be acessed by consuming apps.
ß.transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 25
});