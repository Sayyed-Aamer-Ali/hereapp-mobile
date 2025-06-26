import {BASE_URL_FROM_ENV, WEB_SOCKET_URL_FROM_ENV} from '@env';

console.log(BASE_URL_FROM_ENV)
const BaseUrl = 'http://10.0.2.2:4000/';
// const BaseUrl = 'https://api.hereapp.io/'

// export const SocketUrl = 'http://167.114.144.249:5056';

export const SocketUrl = WEB_SOCKET_URL_FROM_ENV;

export default BaseUrl;
