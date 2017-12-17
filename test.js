const Config = require('./config.json')
const request = require('request')

var text = "btc idr"
var data = text.toUpperCase().split(" ")
console.log(data[0], data[1])
// request(Config.api + '/data/pricemulti?fsyms=BTC&tsyms=IDR,USD,EUR', function (error, response, body) {
//   console.log(typeof response.body)
//   var data = JSON.parse(body)
//   console.log(data.BTC)
// });
