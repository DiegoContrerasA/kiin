const CONFIG = {
    LATEST_POSTS_URL: process.env.LATEST_POSTS_URL,
    PMS_BASE_URL: process.env.PMS_BASE_URL,
    TRM_BASE_URL: process.env.TRM_BASE_URL,
    AUTO_CORE_BASE_URL: process.env.AUTO_CORE_BASE_URL,
    IMAGE_CDN_BASE_URL: process.env.NEXT_PUBLIC_IMAGE_CDN_BASE_URL,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_HOST: process.env.DB_HOST,
    ACCESS_KEY: process.env.ACCESS_KEY,
    SECRET_KEY: process.env.SECRET_KEY,
    PMS_KEY: process.env.PMS_KEY,
    PET_FEE: 30,
    TRANSFER_FEE: 100,
    SOURCE: 'Contravia',
    HOTEL_ID: 121,
    PUBLIC_URL: process.env.NEXT_PUBLIC_BASE_URL,
    LOG_FILES: process.env.NEXT_PUBLIC_LOG_FILES || false,
};

export default CONFIG;