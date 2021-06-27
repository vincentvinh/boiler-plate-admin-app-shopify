import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

export const Configs = {
    AdminHTMLPath: path.resolve(__dirname + "/../../index.html"),
    MySQL: {
        "host": process.env.DB_HOST,
        "database": process.env.DB_DATABASE,
        "user": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "charset": "utf8mb4",
        "port": process.env.DB_PORT || "3306"
    },
    Shopify: {
        Key: process.env.SHOPIFY_API_KEY,
        Secret: process.env.SHOPIFY_API_SECRET,
        Scopes: process.env.SHOPIFY_SCOPES,
        AppURL: process.env.APP_URL
    }
}