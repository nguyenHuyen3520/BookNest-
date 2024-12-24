const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const config = require('../config/database.js');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
});

const db = {};

// Đọc tất cả các file model trong thư mục hiện tại (trừ index.js)
const modelsDirectory = __dirname;
fs.readdirSync(modelsDirectory)
    .filter((file) => {
        return (
            file.indexOf('.') !== 0 &&
            file !== path.basename(__filename) && // Loại trừ index.js
            file.slice(-3) === '.js' // Chỉ lấy các file .js
        );
    })
    .forEach((file) => {
        const model = require(path.join(modelsDirectory, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

// Thiết lập các liên kết (nếu model có hàm associate)
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
