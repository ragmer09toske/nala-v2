import { SiteSettings } from '../data/models';

export async function getConfigurationData({ name }) {

    try {
        const results = await SiteSettings.findAll({
            attributes: [
                'id',
                'name',
                'value',
            ],
            where: {
                name: {
                    $in: name
                }
            },
            raw: true
        });
    
        let settingsData = {};
    
        if (results) {
            await Promise.all(results.map((item, key) => {
                settingsData[item.name] = item.value;
            }));
        }
    
        return await settingsData;
    } catch (error) {
        return false;
    }


}