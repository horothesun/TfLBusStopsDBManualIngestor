exports.fetchBusStops = (readStream, csvParser) => () =>
    new Promise((resolve, reject) =>
        fetchBusStopsCallbacks(readStream, csvParser)(resolve, reject)
    )

const fetchBusStopsCallbacks = (readStream, csvParser) => (onSuccess, onError) => {
    let busStops = []
    readStream
        .on("error", () => onError("Error loading CSV file"))
        .pipe(csvParser({ skip_empty_lines: true }))
        .on("data", row => busStops.push(row))
        .on("end", () => onSuccess(busStops))
}
