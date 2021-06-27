require('dotenv').config();

module.exports = {
    development: {
        client: 'mysql',
        connection: {
            "host": process.env.DB_HOST,
            "database": process.env.DB_DATABASE,
            "user": process.env.DB_USERNAME,
            "password": process.env.DB_PASSWORD,
            "charset": "utf8mb4",
        },
        migrations: {
            directory: './migrations'
        }
    },
    production: {
        client: 'mysql',
        connection: {
            "host": process.env.DB_HOST,
            "database": process.env.DB_DATABASE,
            "user": process.env.DB_USERNAME,
            "password": process.env.DB_PASSWORD,
            "charset": "utf8mb4",
        },
        migrations: {
            directory: './migrations'
        }
    }
}