require("dotenv").config();

const dev = {
    app: {
        PORT: process.env.PORT || 5000
    },
    // DB_URL = mongodb+srv://<username>:<password>@cluster0.g5ey8mr.mongodb.net/DatabaseName
    db: {
        url: process.env.DB_URL || "mongodb://127.0.0.1:27017/usslDB",
    }
}

module.exports = dev;