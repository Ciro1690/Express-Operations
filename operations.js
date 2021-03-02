const express = require('express');
const ExpressError = require('./expressError')

const app = express();

function calculateMean(arr) {
    let sum = 0

    for (let num of arr) {
        sum += parseInt(num)
    }
    return Math.round(sum / arr.length * 100) / 100
}

function calculateMode(arr) {
    let count = {}
    let numArr = arr.map(num => parseInt(num))
    let max = 0
    let modes = []
    // https://stackoverflow.com/questions/32648153/finding-the-modes-of-an-array-javascript    return modes

    for (let i in numArr) {
        count[numArr[i]] = (count[numArr[i]] || 0) + 1

        if (count[numArr[i]] > max)
            max = count[numArr[i]]
    }

    for (let key in count) {
        if (count[key] == max) {
            modes.push(parseInt(key))
        }
    }
    return modes
}

function calculateMedian(arr) {
    arr.sort((a, b) => a - b)

    let numArr = arr.map(num => parseInt(num))
    let median

    if (numArr.length % 2 === 0) {
        let midIdx = numArr.length / 2
        console.log(midIdx)
        let leftMid = numArr[midIdx - 1]
        let rightMid = numArr[midIdx]
        median = (leftMid + rightMid) / 2
    } else {
        let midIdx = numArr.length / 2
        median = numArr[midIdx - .5]
    }
    return median
}

function errorCheck(arr) {
    if (!arr) {
        throw new ExpressError('nums are required', 400)
    }
    let numArr = arr.split(",")
    const numbers = (num) => isNaN(num)
    if (numArr.some(numbers)) {
        throw new ExpressError('All elements must be numbers', 400)
    }
    return numArr
}

app.get('/mean', function (request, response, next) {
    try {
        let nums = request.query.nums
        let numArr = errorCheck(nums)
        let mean = calculateMean(numArr)

        return response.json({ operation: 'mean', value: mean });
    }
    catch (err) {
        return next(err);
    }
});

app.get('/mode', function (request, response, next) {
    try {
        let nums = request.query.nums
        let numArr = errorCheck(nums)
        let mode = calculateMode(numArr)

        return response.json({ operation: 'mode', value: mode });
    }
    catch (err) {
        return next(err);
    }
});

app.get('/median', function (request, response, next) {
    try {   
        let nums = request.query.nums
        let strArr = errorCheck(nums)
        let median = calculateMedian(strArr)

        return response.json({ operation: 'median', value: median });
    }
    catch (err) {
        return next(err);
    }
});

app.get('/all', function (request, response, next) {
    try {
        let nums = request.query.nums
        let numArr = errorCheck(nums)
        let mean = calculateMean(numArr)
        let mode = calculateMode(numArr)
        let median = calculateMedian(numArr)

        return response.json({ operation: 'all', mean: mean, mode: mode, median: median });
    }
    catch (err) {
        return next(err);
    }
})

app.use(function (err, req, res, next) {
    let status = err.status || 500;
    let message = err.message;

    return res.status(status).json({
        error: { message, status }
    });
});

app.listen(3000, function () {
    console.log('App on port 3000');
})

module.exports = { calculateMean, calculateMedian, calculateMode };