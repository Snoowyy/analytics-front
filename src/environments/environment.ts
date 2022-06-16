
export const environment = {
    production: false,
    urls: {
        cvn: '/api/cvn',
        cvn_calc: '/api/cvn_calc',
        stockoutApi: '/api/stockout'
    },
    gatewayUrl: '/api/cvn',
    authRestApiRoot: 'https://apiauthenticationssodev.azurewebsites.net/api/Token',
    urlApi: 'http://localhost:8001/',
    insightsApi: '/insights-api/'
};

export const validUrls = [environment.urlApi, environment.insightsApi];
