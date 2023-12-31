const dotenv = require("dotenv");

const config = {
    server: {
        serverport: process.env.MYSQL_PRIMARY_HOST || "3333",
        servername: process.env.SERVER_NAME || "nodeTest",
        serverdis: process.env.SERVER_DIS || "nodeTest",
    },
    db: {
        host: process.env.MYSQL_PRIMARY_HOST || "3.34.197.5",
        port: process.env.MYSQL_PRIMARY_PORT || "3380",
        username:
            process.env.MYSQL_PRIMARY_USERNAME ||
            "jiho",
        password:
            process.env.MYSQL_PRIMARY_PASSWORD ||
            "1111",
        database:
            process.env.MYSQL_PRIMARY_DATABASE ||
            "portfolio",
    }
};

module.exports = config;