const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();

// Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');


const path_public = path.resolve(__dirname, 'public');
app.use(express.static(path_public));

server.listen(process.env.PORT, (e) => {
  if (e) throw new Error(e);
  console.log('Server is running on port', process.env.PORT);
})