const requestData = require('request');
import { environment } from '../environments/environment';


export const stockApiRequest = (path: string) => {
  const url = `${environment.apiURL}${path}?token=${environment.apiKey}`;
  return new Promise((resolve) => {
    requestData(url, (error, response, body) => {
      if (!!response && !!response.statusCode) {
        if (response.statusCode === 200) {
          console.log('No cache.....')
          resolve(body);
        }
      }
    });
  });
};

