const CONFIG = {
    LATEST_POSTS_URL: 'https://kiinliving.com/wp-json/wp/v2/posts',
    PMS_BASE_URL: 'https://api.kiinliving.com/api/v1',
    TRM_BASE_URL: 'https://co.dolarapi.com/v1/trm',
    AUTO_CORE_BASE_URL: 'https://api-dev.autocore.pro/v2',
    IMAGE_CDN_BASE_URL: 'https://cdn.kiinliving.com/images/lg',
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_HOST: process.env.DB_HOST,
    ACCESS_KEY: process.env.ACCESS_KEY,
    SECRET_KEY: process.env.SECRET_KEY,
    PMS_KEY: process.env.PMS_KEY,
};

export default CONFIG;