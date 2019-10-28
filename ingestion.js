const { unflattened } = require('./unflattened')
const { deleteBusStopsTableSQLCommand } = require('./database/delete-bus-stops')
const { insertBusStopsSQLQuery } = require('./database/insert-bus-stops')
const { chainAll } = require('./chain-all-promises')

exports.ingest = (
    client,
    fetchBusStops, 
    tableName, 
    maxInsertValuesChunkSize,
    onError
) => {
    client.connect()
        .then(() => client.query(deleteBusStopsTableSQLCommand(tableName)))
        .then(() =>
            fetchBusStops()
                .then(busStops =>
                    chainAll(
                        unflattened(busStops, maxInsertValuesChunkSize)
                            .map(group => insertBusStopsSQLQuery(group, tableName))
                            .map(query => client.query(query))
                    )
                )
        )
        .catch(error => onError(error))
        .finally(() => client.end())
}
