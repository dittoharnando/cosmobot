const Config = require('./config.json')
const rp = require('request-promise')
const Humanize = require('humanize-plus')


// var data = text.toUpperCase().split(" ")
// console.log(data[0], data[1])
async function prima (){
  var coin = "btc"
  var params = coin.toUpperCase().split(" ")
  var opts = { method: "GET",uri: Config.api + '/data/pricemulti?fsyms='+params[0]+'&tsyms=IDR,USD,EUR',resolveWithFullResponse: true}
  var result = await rp(opts).then(result=> {
    return result.body;
  });
  var text = JSON.parse(result)


  var echo = `
  ${params[0]} Now
  IDR : Rp. ${Humanize.formatNumber(text[params[0]].IDR,0)}
  USD : USD ${Humanize.formatNumber(text[params[0]].USD,0)}
  EUR : EUR ${Humanize.formatNumber(text[params[0]].EUR,0)}
  `
  console.log(echo)
}

prima();
