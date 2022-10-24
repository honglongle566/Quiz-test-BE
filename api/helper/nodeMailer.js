const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: `lehonglong307@gmail.com`,
    pass: `LEHONGLONG566`,
    clientId: `832646059385-j3nhimreusra534imkkg2a2hi2tmjamq.apps.googleusercontent.com`,
    clientSecret: `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`,
    refreshToken: `1//04Ofu39WXpMIDCgYIARAAGAQSNwF-L9IrNyWN8hkzxT7Bnhv4hqUCYC22146S-3StR4bgSt0FXRfOOhh7mhwySnoC-A2S6OY6H_0`
  }
});
transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
});

module.exports = transporter;
  