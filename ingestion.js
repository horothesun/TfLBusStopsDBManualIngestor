const fs = require('fs')
const csvParser = require('csv-parser')
const { Client } = require('pg')
const { unflattened } = require('./unflattened')
const { clientConfigString } = require('./database/client-config')
const { deleteBusStopsTableSQLCommand } = require('./database/delete-bus-stops')
const { insertBusStopsSQLQuery } = require('./database/insert-bus-stops')
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
    const client = new Client(clientConfigString(username, password, serverName, port))
    const readStream = fs.createReadStream(csvFileName)
    client.connect()
        .then(() => client.query(deleteBusStopsTableSQLCommand(tableName)))
        .then(() =>
            fetchBusStops(readStream, csvParser)
                .then(busStops =>
                    chainAll(
                        unflattened(busStops, maxInsertValuesChunkSize)
                            .map(group => insertBusStopsSQLQuery(group, tableName))
                            .map(query => client.query(query))
                    )
                )
        )
        .catch(error => console.log(error))
        .finally(() => client.end())
}
