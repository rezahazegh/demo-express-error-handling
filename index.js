const express = require('express');
const app = express();
const port = 3000;

app.get('/test', (req, res) => {
  res.send('Test route works well!');
});

app.get('/sync', (req, res) => {
  throw new Error('Throw an error from sync');
});

app.get(
  '/async-not-handled',
  handler((req, res) => {
    throw new Error('Throw an error from async-not-handled');
  })
);

app.get('/async-handled-regular', async (req, res, next) => {
  try {
    throw new Error('Throw an error from async-handled-regular');
  } catch (e) {
    next(e);
  }
});

app.get(
  '/async-handled-using-handler',
  handler((req, res) => {
    throw new Error('Throw an error from async-handled-using-handler');
  })
);

function handler(func) {
  return async function (req, res, next) {
    try {
      await func();
    } catch (e) {
      next(e);
    }
  };
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
