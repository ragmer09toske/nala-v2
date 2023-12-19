import { initializeApp, cert, getApps, getApp } from 'firebase-admin/app';
import { getMessaging } from "firebase-admin/messaging";
import { UserLogin } from '../../data/models';
import { getConfigurationData } from '../getConfigurationData';

const pushNotificationRoutes = app => {

    app.post('/push-notification', async function (req, res) {

        const configData = await getConfigurationData({ name: ['fcmPushNotificationKey'] });

        let userId = req.body.userId;
        let content = req.body.content;
        let notificationId = Math.floor(100000 + Math.random() * 900000);
        let deviceId = [];
        content['notificationId'] = notificationId;

        const getdeviceIds = await UserLogin.findAll({
            attributes: ['deviceId'],
            where: {
                userId: userId
            },
            raw: true
        });

        if (getdeviceIds && getdeviceIds.length > 0) {
            getdeviceIds.map(async (item) => {
                deviceId.push(item.deviceId);
            })
        };

        !getApps().length ? initializeApp({ credential: cert(JSON.parse(configData.fcmPushNotificationKey)) }) : getApp();

        const message = {
            notification: {
                title: content.title,
                body: content.message
            },
            data: {
                content: JSON.stringify(content),
            },
            tokens: deviceId
        };

        if (deviceId.length > 0) {
            getMessaging().sendMulticast(message)
            .then((response) => {
                res.send({ status: response, errorMessge: null });
                console.log('Successfully sent message:', response);
            })
            .catch((error) => {
                console.log('Error sending message:', error);
                res.send({ status: null, errorMessge: error });
            });
        }

    });
};

export default pushNotificationRoutes;
