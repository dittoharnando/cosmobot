const line = require('@line/bot-sdk');

const client = new line.Client({
  channelAccessToken: '26D2SnIthQ4cAFOCOXYZYCIbKIircrAmcx3vzw5lgUgRRURoSuy4XNrCivct7HQ65XPEgCTsjWSlWzeVusIxbIdsKybwC1BkEiOlS711irAed3HyFhxkEdnL4Kie/2FUWMtIOiXlwqNQTkYLMTuZkAdB04t89/1O/w1cDnyilFU='
});

const message = {
  type: 'text',
  text: 'Hello World!'
};

client.replyMessage('<replyToken>', message)
  .then(() => {
    ...
  })
  .catch((err) => {
    // error handling
  });