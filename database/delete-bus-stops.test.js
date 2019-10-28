const { deleteBusStopsTableSQLCommand } = require('./delete-bus-stops')

test("returns 'DELETE FROM tableName;'", () => {
    expect(deleteBusStopsTableSQLCommand("tableName")).toBe("DELETE FROM tableName;")
})
