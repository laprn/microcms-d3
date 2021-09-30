const {createClient} = require('microcms-js-sdk');
require('dotenv').config();
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
// Load the full build.
var _ = require('lodash');
// Load the core build.
var _ = require('lodash/core');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
var fp = require('lodash/fp');
 
// Load method categories.
var array = require('lodash/array');
var object = require('lodash/fp/object');
 
// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
var at = require('lodash/at');
var curryN = require('lodash/fp/curryN');


dayjs.extend(utc);
dayjs.extend(timezone);

const client = createClient({
    serviceDomain: 'laprn',
    apiKey: process.env.API_KEY,
})

const data = client.get({
    endpoint: 'english',
    queries: {fields: 'createdAt'}
})
data.then((res) => {
    // const data2 = fixTime(res.contents)
    // console.log(data2)
    // console.log(res.contents.length)
    for(var key in res.contents){
        var val = res.contents[key];
        // console.log(val.createdAt)
        res.contents[key].createdAt = dayjs(val.createdAt).format('YYYY-MM-DD')
    }
    // console.log(res.contents)
    const reducer = (prev, curr) => {
        var count = 1
        if(prev.createdAt == curr.createdAt){
            count += 1
        }
    }
    for(key in res.contents) {
        console.log(res.contents[key].createdAt)
        
    }
});

data.catch((err) => err)

const fixTime = (datelist) => {
    return datelist.map((date) => dayjs.utc(date.createdAt).tz('Asia/Tokyo').format('YYYY-MM-DD'))
}

// d3jsに渡すオブジェクトの形
// const data = [
//     { createdAt: '2021-09-30', value: 1},
//     { createdAt: '2021-09-29', value: 2},
//     { createdAt: '2021-09-28', value: 3},
//     { createdAt: '2021-09-27', value: 5},
//     { createdAt: '2021-09-26', value: 2},
//     { createdAt: '2021-09-25', value: 1},
// ]