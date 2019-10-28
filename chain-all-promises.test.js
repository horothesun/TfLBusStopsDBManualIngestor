const { chainAll } = require('./chain-all-promises')

test("returns [] fulfilling promise from no promises", () => {
    const promises = [].map(x => Promise.resolve(x))
    return chainAll(promises).then(result => expect(result).toStrictEqual([]))
})

test("returns fulfilling [1, 2, 3] promise from promises fulfilling with 1, 2 and 3", () => {
    const promises = [1, 2, 3].map(x => Promise.resolve(x))
    return chainAll(promises).then(result => expect(result).toStrictEqual([1, 2, 3]))
})
