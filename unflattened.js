exports.unflattened = (array, elementsPerGroup) => {
    return array.reduce(
        (total, currentValue) => {
            let result
            if (total.length === 0) {
                result = [[currentValue]]
            } else {
                const lastGroup = total[total.length - 1]
                if (lastGroup.length === elementsPerGroup) {
                    result = total.concat([[currentValue]])
                } else {
                    result = total.slice(0, total.length - 1)
                        .concat([lastGroup.concat([currentValue])])
                }
            }
            return result
        },
        []
    )
}
