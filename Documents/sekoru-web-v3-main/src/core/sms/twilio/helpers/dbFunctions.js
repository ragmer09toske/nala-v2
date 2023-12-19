import { UserProfile, Country, SiteSettings } from '../../../../data/models';

export async function updateVerificationCode(verificationCode, userId) {
    const verification = await UserProfile.update({
            verificationCode,
            codeUpdatedAt: new Date()
        },
        {
            where: {
                userId
            }
        });
    if (verification) {
        return {
          status: 'success'
        };
    } else {
        return {
          status: 'failed'
        }
    }
}

export async function getPhoneNumberStatus() {
    const phoneNumberStatus = await SiteSettings.findOne({
        attributes: ['value'],
        where: {
            name: 'phoneNumberStatus'
        },
        raw: true
    });
    if (phoneNumberStatus) {
        return phoneNumberStatus;
    } else {
        return {
            status: 'failed'
        }
    }
}

export async function getCountryCode(dialCode) {
    const country = await Country.findOne(
        {
            where: {
                dialCode
            },
            raw: true
        });

    if (country) {
        return country.countryCode;
    } else {
        return 'US';
    }
}

