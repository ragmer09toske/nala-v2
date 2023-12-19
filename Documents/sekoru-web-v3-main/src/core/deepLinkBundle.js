import { getConfigurationData } from "./getConfigurationData";

const deepLinkBundle = app =>{
    app.get('/apple-app-site-association', function (req, res, next) {
        next();
      }, async (req, res) => {
        
        const configData = await getConfigurationData({ name: ['deepLinkBundleId'] });
        let responseJson = {
          applinks: {
            apps: [],
            details: [
              {
                appID: configData.deepLinkBundleId,
                'paths': ['/password/verification/', '/user/verification']
              }
            ]
          }
        };
        res.json(responseJson);
      });
    
      app.get('/.well-known/assetlinks.json', async function (req, res) {
    
        const configData = await getConfigurationData({ name: ['deepLinkContent'] });
        res.json(JSON.parse(configData.deepLinkContent));
        return;
    
    });
}

export default deepLinkBundle;