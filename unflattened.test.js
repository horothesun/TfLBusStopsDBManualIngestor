const { unflattened } = require('./unflattened');

test("returns [] from [] and 0 group size", () => {
    const result = unflattened([], 0)
    expect(result).toStrictEqual([])
})

test("returns [] from [] and 1 group size", () => {
    const result = unflattened([], 1)
    expect(result).toStrictEqual([])
})

test("returns [['a']] from ['a'] and 3 group size", () => {
    const result = unflattened(['a'], 3)
    expect(result).toStrictEqual([['a']])
})

test("returns [[1, 2], [3, 4]] from [1, 2, 3, 4] and 2 group size", () => {
    const result = unflattened([1, 2, 3, 4], 2)
    expect(result).toStrictEqual([[1, 2], [3, 4]])
})

test("returns [[1, 2], [3, 4], [5]] from [1, 2, 3, 4, 5] and 2 group size", () => {
    const result = unflattened([1, 2, 3, 4, 5], 2)
    expect(result).toStrictEqual([[1, 2], [3, 4], [5]])
})
