const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendPasswordResetEmail = (email, token) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Redefinição de senha',
        text: `Você solicitou uma redefinição de senha. Use o seguinte token para redefinir sua senha: ${token}\n\nSe você não solicitou isso, ignore este e-mail.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('E-mail enviado: ' + info.response);
    });
};

module.exports = {
    sendPasswordResetEmail
};
