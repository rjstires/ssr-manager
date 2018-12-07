const withTypescript = require('@zeit/next-typescript');
const dotenv = require('dotenv');

dotenv.config();

module.exports = withTypescript({
  publicRuntimeConfig: {
    clientId: process.env.CLIENT_ID,
    appRoot: process.env.APP_ROOT,
    apiRoot: process.env.API_ROOT,
    loginRoot: process.env.LOGIN_ROOT,
  },
});
