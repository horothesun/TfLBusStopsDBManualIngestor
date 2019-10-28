const dotenv = require('dotenv')
const fs = require('fs')
const csvParser = require('csv-parser')
const { Client } = require('pg')
const { clientConfigString } = require('./database/client-config')
const { fetchBusStops } = require('./csv-parsing')
const { ingest } = require('./ingestion')


const tableName = "bus_stop"
const csvFileName = "bus-stops-20190816-23-00.csv"
const maxInsertValuesChunkSize = 1000

dotenv.config()
const client = new Client(
    clientConfigString(
        process.env.DB_USERNAME,
        process.env.DB_PASSWORD,
        process.env.DB_SERVER_NAME,
        process.env.DB_PORT
    )
)
const readStream = fs.createReadStream(csvFileName)
ingest(
    client,
    fetchBusStops(readStream, csvParser),
    tableName,
    maxInsertValuesChunkSize,
    (error) => console.log(error)
)
