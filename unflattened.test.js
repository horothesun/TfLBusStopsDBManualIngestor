const { unflattened } = require('./unflattened');

test("unflattened must return [] from [] array and 0 elementsPerGroup", () => {
    const result = unflattened([], 0)
    expect(result).toStrictEqual([])
})

test("unflattened must return [] from [] array and 1 elementsPerGroup", () => {
    const result = unflattened([], 1)
    expect(result).toStrictEqual([])
})

test("unflattened must return [['a']] from ['a'] array and 3 elementsPerGroup", () => {
    const result = unflattened(['a'], 3)
    expect(result).toStrictEqual([['a']])
})

test("unflattened must return [[1, 2], [3, 4]] from [1, 2, 3, 4] array and 2 elementsPerGroup", () => {
    const result = unflattened([1, 2, 3, 4], 2)
    expect(result).toStrictEqual([[1, 2], [3, 4]])
})

test("unflattened must return [[1, 2], [3, 4], [5]] from [1, 2, 3, 4, 5] array and 2 elementsPerGroup", () => {
    const result = unflattened([1, 2, 3, 4, 5], 2)
    expect(result).toStrictEqual([[1, 2], [3, 4], [5]])
})
