exports.clientConfig = (username, password, serverName, port) =>
    `postgres://${username}:${password}@${serverName}:${port}/${username}`

exports.deleteBusStopsTable = (tableName, client) =>
    client.query(`DELETE FROM ${tableName};`)

exports.insertBusStops = (busStops, tableName, client) => {
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
        ) VALUES ${sqlValuesToInsert(busStops)};`
    return client.query(insertString)
}

const sqlValuesToInsert = (busStops) =>
    busStops
        .map(bs =>
            `(\
                '${cleanedStopCodeLBSL(bs)}',\
                ${cleanedNumber(bs.Bus_Stop_Code)},\
                '${bs.Naptan_Atco}',\
                '${duplicatedSingleQuote(bs.Stop_Name)}',\
                ${bs.Location_Easting},\
                ${bs.Location_Northing},\
                ${cleanedNumber(bs.Heading)},\
                '${bs.Stop_Area}',\
                ${sqlBooleanValue(bs.Virtual_Bus_Stop)}\
            )`
        )
        .join(",\n")

function cleanedStopCodeLBSL(busStop) {
    const bomChar = "\uFEFF"
    const stopCodeLBSLString = "Stop_Code_LBSL"
    return busStop[stopCodeLBSLString] === undefined
        ? busStop[`${bomChar}${stopCodeLBSLString}`]
        : busStop[stopCodeLBSLString]
}

const duplicatedSingleQuote = (string) => string.replace(/'/g, "''")

function cleanedNumber(string) {
    const parsed = parseInt(string)
    return isNaN(parsed) ? "-1" : `${parsed}`
}

const sqlBooleanValue = (string) => string === "1" ? "true" : "false"
