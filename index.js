const dotenv = require('dotenv')
const { ingest } = require('./ingestion')

/* .env file
DB_USERNAME=____
DB_PASSWORD=____
DB_SERVER_NAME=____
DB_PORT=____
*/

dotenv.config()
ingest({
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    serverName: process.env.DB_SERVER_NAME,
    port: process.env.DB_PORT,
    tableName: "bus_stop",
    csvFileName: "bus-stops-20190816-23-00.csv",
    maxInsertValuesChunkSize: 1000
})
