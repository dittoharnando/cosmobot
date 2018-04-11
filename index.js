'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const Config = require('./config.json')
const rp = require('request-promise')
const Humanize = require('humanize-plus')

// create LINE SDK config from env variables
const config = {
  channelAccessToken: Config.accessToken,
  channelSecret: Config.secretKey
};

// create LINE SDK client
const client = new line.Client(config);

const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

// event handler
async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }


  var params = event.message.text.toUpperCase().split(' ');
  var opts = { method: "GET",uri: Config.api + '/data/pricemulti?fsyms='+params[0]+'&tsyms=IDR,USD,EUR',resolveWithFullResponse: true}
  var result = await rp(opts).then(result=> {
    return result.body;
  });
  var text = JSON.parse(result)

  var reply = `
  ${params[0]} Now
  IDR : Rp. ${Humanize.formatNumber(text[params[0]].IDR,0)}
  USD : USD ${Humanize.formatNumber(text[params[0]].USD,0)}
  EUR : EUR ${Humanize.formatNumber(text[params[0]].EUR,0)}
  `


  const echo = { type: 'text', text: reply };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}


// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});