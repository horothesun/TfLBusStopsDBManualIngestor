exports.clientConfig = (username, password, serverName, port) =>
    `postgres://${username}:${password}@${serverName}:${port}/${username}`

exports.deleteBusStopsTable = (tableName, client) =>
    client.query(`DELETE FROM ${tableName};`)

exports.insertBusStops = (busStops, tableName, client) => {
    const valuesToInsert = busStops.map(sqlValueToInsert).join(",\n")
    const insertString = `\
        INSERT INTO ${tableName} (\
            stop_code_lbsl,\
            bus_stop_code,\
            naptan_atco,\
            stop_name,\
            location_easting,\
            location_northing,\
            heading, stop_area,\
            virtual_bus_stop\
        ) VALUES ${valuesToInsert};`
    return client.query(insertString)
}

const sqlValueToInsert = (busStop) =>
    `(\
        '${cleanedStopCodeLBSL(busStop)}',\
        ${cleanedNumber(busStop.Bus_Stop_Code)},\
        '${busStop.Naptan_Atco}',\
        '${duplicatedSingleQuote(busStop.Stop_Name)}',\
        ${busStop.Location_Easting},\
        ${busStop.Location_Northing},\
        ${cleanedNumber(busStop.Heading)},\
        '${busStop.Stop_Area}',\
        ${booleanValue(busStop.Virtual_Bus_Stop)}\
    )`

function cleanedStopCodeLBSL(busStop) {
    const bomChar = "\uFEFF"
    const stopCodeLBSLString = "Stop_Code_LBSL"
    return busStop[stopCodeLBSLString]
        || busStop[`${bomChar}${stopCodeLBSLString}`]
}

const duplicatedSingleQuote = (string) => string.replace(/'/g, "''")

function cleanedNumber(string) {
    const parsed = parseInt(string)
    return isNaN(parsed) ? "-1" : `${parsed}`
}

const booleanValue = (string) => string === "1" ? "true" : "false"
