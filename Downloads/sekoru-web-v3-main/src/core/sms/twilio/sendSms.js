import twilio from 'twilio';
import moment from 'moment';

import { UserProfile } from '../../../data/models';

import { sitename } from '../../../config';
import { updateVerificationCode, getCountryCode, getPhoneNumberStatus } from './helpers/dbFunctions';
import { getConfigurationData } from '../../getConfigurationData';
const TwilioSms = app => {
    app.post('/send-verification-code', async function (req, res) {

        const twillioData = await getConfigurationData({ name: ['twillioAccountSid', 'twillioAuthToken', 'twillioPhone'] });

        let responseStatus = 200, errorMessage, client,
            phoneNumber = req.body.phoneNumber,
            dialCode = req.body.dialCode,
            userProfileNumber = req.body.userProfileNumber,
            verificationCode = Math.floor(1000 + Math.random() * 9000),
            userId = req.user.id,
            today = moment(),
            convertedNumber = dialCode + phoneNumber,
            text = sitename + ' security code: ' + verificationCode;
        text += '. Use this to finish verification.';

        try {

            let findUpdatedTime = await UserProfile.findOne({
                attributes: ['codeUpdatedAt'],
                where: {
                    userId
                },
                raw: true
            });


            if (findUpdatedTime && findUpdatedTime.codeUpdatedAt != null) {
                let codeUpdatedAt = moment(findUpdatedTime.codeUpdatedAt);
                let timeDiff = today.diff(codeUpdatedAt, 'minutes');
                if (timeDiff < 2 && userProfileNumber == convertedNumber) {
                    responseStatus = 400;
                    errorMessage = 'Please try again after 2 minutes to receive a new OTP.';
                }
            }

            if (responseStatus == 200) {
                await updateVerificationCode(verificationCode, userId);

                const phoneNumberStatus = await getPhoneNumberStatus();
                if (phoneNumberStatus.value === '1') {

                    client = new twilio(twillioData.twillioAccountSid, twillioData.twillioAuthToken);

                    const responseData = await client.messages
                        .create({
                            body: text,
                            from: twillioData.twillioPhone,
                            to: convertedNumber
                        });

                }
            }

        } catch (error) {
            responseStatus = 400;
            errorMessage = error.message;
        }



        res.send({ status: responseStatus, errorMessage });
    });
};




export default TwilioSms;