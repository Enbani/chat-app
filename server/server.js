require('./config/config.js');
const express = require('express');
const path = require('path');



const publicPath = path.join(__dirname, '../public');

const app = express();
const port = process.env.PORT;

app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`\n\nServer up and listening on port:${port}`);
});

// const path = require('path');
// const express = require('express');
//
// const publicPath = path.join(__dirname, '../public');
//
//
// app.use(express.static(publicPath));
//
//
// app.listen(3000, () => {
//   console.log('server is up on port 3000');
// })
