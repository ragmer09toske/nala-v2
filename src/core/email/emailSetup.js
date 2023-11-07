'use strict';
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
import { getConfigurationData } from '../getConfigurationData';

const sendEmail = (app) => {

    app.post('/sendEmail', async function (req, res, next) {
        const configData = await getConfigurationData({ name: ['smtpHost', 'smtpPort', 'smptEmail', 'smtpSender', 'smtpSenderEmail', 'smtpPassWord'] })
        const transporter = nodemailer.createTransport(smtpTransport({
            host: configData.smtpHost,
            port: configData.smtpPort,
            auth: {
                user: configData.smptEmail,
                pass: configData.smtpPassWord
            },
            tls: {
                // do not fail on invalid certs
                rejectUnauthorized: configData.tls == 'true' ? 1 : 0
            }
        }));
        let mailOptions = req.body.mailOptions;
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.send({ status: 400, response: error });
            }
            res.send({ status: 200, response: 'email send successfully' });
        });
    });

};

export default sendEmail;  