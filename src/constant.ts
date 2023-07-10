require('dotenv').config()

module.exports.BOT_TOKEN = process.env["BOT_TOKEN"]
module.exports.CLIENT_ID = process.env["CLIENT_ID"]
module.exports.DB_PATH = "./datas.sqlite3"
module.exports.SCHEMA_PATH = "./schema.sql"
