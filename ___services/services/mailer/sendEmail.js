// Load the SDK for JavaScript
const AWS = require('aws-sdk');

// Set the region
AWS.config.update({ region: 'us-west-2' });

const params = {
  Destination: { /* required */
    CcAddresses: [
      'qz-0010@mail.ru',
      /* more items */
    ],
    ToAddresses: [
      'qz0010dev@gmail.com',
      /* more items */
    ]
  },
  Message: { /* required */
    Body: { /* required */
      // Html: {
      //   Charset: "UTF-8",
      //   Data: ""
      // },
      Text: {
        Charset: "UTF-8",
        Data: "TEXT_FORMAT_BODY"
      }
    },
    Subject: {
      Charset: 'UTF-8',
      Data: 'Test email'
    }
  },
  Source: 'qz-0010@mail.ru', /* required */
  // ReplyToAddresses: [
  //   'EMAIL_ADDRESS',
  //   /* more items */
  // ],
};

// Create the promise and SES service object
const sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();

sendPromise.then((data) => {
  console.log(data);
}).catch((err) => {
  console.error(err, err.stack);
});
