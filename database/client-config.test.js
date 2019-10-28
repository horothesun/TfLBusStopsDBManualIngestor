const { clientConfigString } = require('./client-config')

test("returns 'postgres://username:password@serverName:port/username'", () => {
    expect(clientConfigString("username", "password", "serverName", "port"))
        .toBe("postgres://username:password@serverName:port/username")
})
