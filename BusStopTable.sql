-- Create 'bus_stop' table
CREATE TABLE bus_stop(
    id serial PRIMARY KEY,
    stop_code_lbsl VARCHAR (100),
    bus_stop_code integer,
    naptan_atco VARCHAR (100),
    stop_name VARCHAR (200),
    location_easting integer,
    location_northing integer,
    heading integer,
    stop_area VARCHAR (100),
    virtual_bus_stop boolean
);

-- Clean all 'bus_stop' rows
DELETE FROM bus_stop;

-- Data insertion example
INSERT INTO bus_stop (
    stop_code_lbsl,
    bus_stop_code,
    naptan_atco,
    stop_name,
    location_easting,
    location_northing,
    heading,
    stop_area,
    virtual_bus_stop
) VALUES
    ('LRS102',91578,'9300MBK2','MILLBANK PIER. >R<',530283,178637,7,'1P12',true),
    ('LE146',49319,'490011477W','REDBRIDGE LANE WEST',541544,188307,278,'X913',false),
    ('BP3516',53282,'490015839P','SOMERSET ROAD / NORTH MIDDLESEX HOSPITAL',533706,192367,351,'U523',false),
    ('15347',53387,'490006192S','DRAYTON BRIDGE ROAD',515466,180917,170,'QR06',false)
;
