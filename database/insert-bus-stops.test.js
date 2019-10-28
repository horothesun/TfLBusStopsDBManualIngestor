const { insertBusStopsSQLQuery } = require('./insert-bus-stops')

test("Stop_Code_LBSL w/o BOM character", () => {
    const busStops = [{
        Stop_Code_LBSL: "LE146",
        Bus_Stop_Code: "49319",
        Naptan_Atco: "490011477W",
        Stop_Name: "REDBRIDGE LANE WEST",
        Location_Easting: "541544",
        Location_Northing: "188307",
        Heading: "278",
        Stop_Area: "X913",
        Virtual_Bus_Stop: "0"
    }]
    expect(insertBusStopsSQLQuery(busStops, "tableName")).toBe(
        "INSERT INTO tableName ("
            + "stop_code_lbsl,bus_stop_code,naptan_atco,stop_name,location_easting,location_northing,heading,stop_area,virtual_bus_stop"
            + ") VALUES\n"
            + "('LE146',49319,'490011477W','REDBRIDGE LANE WEST',541544,188307,278,'X913',false)"
            + ";"
    )
})

test("Stop_Code_LBSL with BOM character", () => {
    const busStops = [{
        "\uFEFFStop_Code_LBSL": "LE146",
        Bus_Stop_Code: "49319",
        Naptan_Atco: "490011477W",
        Stop_Name: "REDBRIDGE LANE WEST",
        Location_Easting: "541544",
        Location_Northing: "188307",
        Heading: "278",
        Stop_Area: "X913",
        Virtual_Bus_Stop: "0"
    }]
    expect(insertBusStopsSQLQuery(busStops, "tableName")).toBe(
        "INSERT INTO tableName ("
            + "stop_code_lbsl,bus_stop_code,naptan_atco,stop_name,location_easting,location_northing,heading,stop_area,virtual_bus_stop"
            + ") VALUES\n"
            + "('LE146',49319,'490011477W','REDBRIDGE LANE WEST',541544,188307,278,'X913',false)"
            + ";"
    )
})

test("NaN Bus_Stop_Code converted to -1", () => {
    const busStops = [{
        Stop_Code_LBSL: "LE146",
        Bus_Stop_Code: "NONE",
        Naptan_Atco: "490011477W",
        Stop_Name: "REDBRIDGE LANE WEST",
        Location_Easting: "541544",
        Location_Northing: "188307",
        Heading: "278",
        Stop_Area: "X913",
        Virtual_Bus_Stop: "0"
    }]
    expect(insertBusStopsSQLQuery(busStops, "tableName")).toBe(
        "INSERT INTO tableName ("
            + "stop_code_lbsl,bus_stop_code,naptan_atco,stop_name,location_easting,location_northing,heading,stop_area,virtual_bus_stop"
            + ") VALUES\n"
            + "('LE146',-1,'490011477W','REDBRIDGE LANE WEST',541544,188307,278,'X913',false)"
            + ";"
    )
})

test("NaN Heading converted to -1", () => {
    const busStops = [{
        Stop_Code_LBSL: "LE146",
        Bus_Stop_Code: "49319",
        Naptan_Atco: "490011477W",
        Stop_Name: "REDBRIDGE LANE WEST",
        Location_Easting: "541544",
        Location_Northing: "188307",
        Heading: "",
        Stop_Area: "X913",
        Virtual_Bus_Stop: "0"
    }]
    expect(insertBusStopsSQLQuery(busStops, "tableName")).toBe(
        "INSERT INTO tableName ("
            + "stop_code_lbsl,bus_stop_code,naptan_atco,stop_name,location_easting,location_northing,heading,stop_area,virtual_bus_stop"
            + ") VALUES\n"
            + "('LE146',49319,'490011477W','REDBRIDGE LANE WEST',541544,188307,-1,'X913',false)"
            + ";"
    )
})

test("Stop_Name single quotes are doubled", () => {
    const busStops = [{
        Stop_Code_LBSL: "BP4140",
        Bus_Stop_Code: "57631",
        Naptan_Atco: "490003918E",
        Stop_Name: "ST JOHN'S ROAD / ST GEORGE'S ROAD",
        Location_Easting: "544973",
        Location_Northing: "167172",
        Heading: "130",
        Stop_Area: "F924",
        Virtual_Bus_Stop: "0"
    }]
    expect(insertBusStopsSQLQuery(busStops, "tableName")).toBe(
        "INSERT INTO tableName ("
            + "stop_code_lbsl,bus_stop_code,naptan_atco,stop_name,location_easting,location_northing,heading,stop_area,virtual_bus_stop"
            + ") VALUES\n"
            + "('BP4140',57631,'490003918E','ST JOHN''S ROAD / ST GEORGE''S ROAD',544973,167172,130,'F924',false)"
            + ";"
    )
})

test("'1' Virtual_Bus_Stop converted to 'true'", () => {
    const busStops = [{
        Stop_Code_LBSL: "LE146",
        Bus_Stop_Code: "49319",
        Naptan_Atco: "490011477W",
        Stop_Name: "REDBRIDGE LANE WEST",
        Location_Easting: "541544",
        Location_Northing: "188307",
        Heading: "278",
        Stop_Area: "X913",
        Virtual_Bus_Stop: "1"
    }]
    expect(insertBusStopsSQLQuery(busStops, "tableName")).toBe(
        "INSERT INTO tableName ("
            + "stop_code_lbsl,bus_stop_code,naptan_atco,stop_name,location_easting,location_northing,heading,stop_area,virtual_bus_stop"
            + ") VALUES\n"
            + "('LE146',49319,'490011477W','REDBRIDGE LANE WEST',541544,188307,278,'X913',true)"
            + ";"
    )
})

test("multiple bus stops", () => {
    const busStops = [
        {
            Stop_Code_LBSL: "LE146",
            Bus_Stop_Code: "49319",
            Naptan_Atco: "490011477W",
            Stop_Name: "REDBRIDGE LANE WEST",
            Location_Easting: "541544",
            Location_Northing: "188307",
            Heading: "278",
            Stop_Area: "X913",
            Virtual_Bus_Stop: "1"
        },
        {
            Stop_Code_LBSL: "BP4140",
            Bus_Stop_Code: "57631",
            Naptan_Atco: "490003918E",
            Stop_Name: "ST JOHN'S ROAD / ST GEORGE'S ROAD",
            Location_Easting: "544973",
            Location_Northing: "167172",
            Heading: "130",
            Stop_Area: "F924",
            Virtual_Bus_Stop: "0"
        },
        {
            Stop_Code_LBSL: "26925",
            Bus_Stop_Code: "74299",
            Naptan_Atco: "490013921S",
            Stop_Name: "UPLANDS",
            Location_Easting: "537122",
            Location_Northing: "169002",
            Heading: "192",
            Stop_Area: "FJ17",
            Virtual_Bus_Stop: "0"
        }
    ]
    expect(insertBusStopsSQLQuery(busStops, "tableName")).toBe(
        "INSERT INTO tableName ("
            + "stop_code_lbsl,bus_stop_code,naptan_atco,stop_name,location_easting,location_northing,heading,stop_area,virtual_bus_stop"
            + ") VALUES\n"
            + "('LE146',49319,'490011477W','REDBRIDGE LANE WEST',541544,188307,278,'X913',true),\n"
            + "('BP4140',57631,'490003918E','ST JOHN''S ROAD / ST GEORGE''S ROAD',544973,167172,130,'F924',false),\n"
            + "('26925',74299,'490013921S','UPLANDS',537122,169002,192,'FJ17',false)"
            + ";"
    )
})
