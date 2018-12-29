require('dotenv').config();
require('./postgres').createConnection();
require('./express').createServer();