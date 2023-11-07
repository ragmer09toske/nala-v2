// Fetch request
import fetch from '../core/fetch';

export async function getConfigData({ name }) {

	try {

		const query = `query getConfigSettings($name: String) {
            getConfigSettings(name: $name) {
                title
                name
                value
            }
        }`;

		const resp = await fetch('/graphql', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				query: query,
				variables: {
					name: JSON.stringify(name)
				}
			}),
			credentials: 'include'
		});

		const { data } = await resp.json();

		let settingsData = {};

		if (settingsData) {
			await Promise.all(data.getConfigSettings.map((item, key) => {
				settingsData[item.name] = item.value;
			}));
		}

		return settingsData;

	} catch (error) {
		return false;
	}

}
