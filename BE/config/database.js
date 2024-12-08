module.exports = {
    development: {
        username: 'root',
        password: 'Huyen3520@',  // Thay bằng mật khẩu
        database: 'booknest',
        host: 'localhost',
        dialect: 'mysql',
    },
    test: {
        username: 'root',
        password: 'Huyen3520@',
        database: 'booknest_test',
        host: 'localhost',
        dialect: 'mysql',
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'mysql',
    },
};
