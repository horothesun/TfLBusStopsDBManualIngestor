exports.chainAll = (promises) =>
    promises.reduce(
        (promiseChain, currentTask) =>
            promiseChain.then(chainResults =>
                currentTask.then(currentResult => [...chainResults, currentResult])
            ),
        Promise.resolve([])
    )
