'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const Config = require('./config.json')
const request = require('request')

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


  var text = event.message.text.toUpperCase().split(' ');


  var result = await request(Config.api + '/data/pricemulti?fsyms='+text[0]+'&tsyms='+text[1],(error, response, body) => {
    return body
  });
  // create a echoing text message
  console.log(result)
  // var data = JSON.parse(result);
  //
  // var reply = ` ${data.text[0]} | ${data.text[0].data.text[1]}`

  var reply = "test"
  // const echo = { type: 'text', text: reply };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}


// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
