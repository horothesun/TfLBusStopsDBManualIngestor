const fs = require('fs')
const csvParser = require('csv-parser')
const { Client } = require('pg')
const { unflattened } = require('./unflattened')
const { clientConfig, deleteBusStopsTable, insertBusStops } = require('./database')
const { fetchBusStops } = require('./csv-parsing')
const { chainAll } = require('./chain-all-promises')

exports.ingest = ({
    username,
    password,
    serverName,
    port,
    tableName,
    csvFileName,
    maxInsertValuesChunkSize
}) => {
    const client = new Client(clientConfig(username, password, serverName, port))
    const readStream = fs.createReadStream(csvFileName)
    client.connect()
        .then(() => deleteBusStopsTable(tableName, client))
        .then(() =>
            fetchBusStops(readStream, csvParser)
                .then(busStops =>
                    chainAll(
                        unflattened(busStops, maxInsertValuesChunkSize)
                            .map(group => insertBusStops(group, tableName, client))
                    )
                )
        )
        .catch(error => console.log(error))
        .finally(() => client.end())
}
