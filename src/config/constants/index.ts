const ENV = process.env.NODE_ENV;
const front_URL = process.env.FRONTEND_URL;

export const origin = ENV === 'PROD' ? front_URL : 'http://localhost:5174';