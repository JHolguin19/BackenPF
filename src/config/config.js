import 'dotenv/config'


export default{
    SECRET_KEY_JWT: process.env.SECRET_COOKIES,
    MONGO_URL: process.env.MONGO_URL,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    CLIENT_ID: process.env.CLIENT_ID,
    CALLBACK_URL: process.env.CALLBACK_URL,
    CLIENT_SECRET_GOOGLE: process.env.CLIENT_ID_GOOGLE,
    CLIENT_ID_GOOGLE: process.env.CLIENT_ID_GOOGLE,
    CALLBACK_URL_GOOGLE :process.env.CALLBACK_URL_GOOGLE,
    PERSISTENCE: process.env.PERSISTENCE,
    EMAIL_ADMIN :process.env.EMAIL_ADMIN,
    PASS_ADMIN: process.env.PASS_ADMIN,
    PORT: process.env.PORT,
    SECRET_COOKIES: process.env.SECRET_COOKIES,
    EMAIL: process.env.EMAIL,
    PASSWORD: process.env.PASSWORD,
    SECRET_KEY: process.env.SECRET_KEY,
    EMAIL_PREMIUM: process.env.EMAIL_PREMIUM,
    PASSP: process.env.PASSP_ADMIN
    

}