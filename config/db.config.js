require('dotenv').config({path: __dirname + '/../.env'});

module.exports = {
    development: {
        username:  process.env.DB_USERNAME || "root",
        password: process.env.DB_PASSWORD || null,
        database: process.env.DB_DATABASE || "default",
        host: process.env.DB_HOST || "127.0.0.1",
        dialect: process.env.DB_DRIVE,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    },
    test: {
        username:  process.env.DB_USERNAME || "root",
        password: process.env.DB_PASSWORD || null,
        database: process.env.DB_DATABASE || "default",
        host: process.env.DB_HOST || "127.0.0.1",
        dialect: process.env.DB_DRIVE,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    },
    production: {
        username:  process.env.DB_USERNAME || "root",
        password: process.env.DB_PASSWORD || null,
        database: process.env.DB_DATABASE || "default",
        host: process.env.DB_HOST || "127.0.0.1",
        dialect: process.env.DB_DRIVE,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
}
