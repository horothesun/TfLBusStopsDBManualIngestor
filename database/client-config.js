exports.clientConfigString = (username, password, serverName, port) =>
    `postgres://${username}:${password}@${serverName}:${port}/${username}`