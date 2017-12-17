const Config = require('./config.json')
const request = require('request')

request(Config.api + '/data/pricemulti?fsyms=BTC&tsyms=IDR,USD,EUR', function (error, response, body) {
  console.log(typeof response.body)
  var data = JSON.parse(body)
  console.log(data.BTC)
});
