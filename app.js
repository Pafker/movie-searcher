const express = require('express');
const http = require('http');
const bodyparser = require('body-parser');
const apiRouter = require ('./src/routes/api');

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.use('/api', apiRouter);

http.createServer(app).listen(app.get('port'), () => {
    console.log(`== Express server running on port ${app.get('port')} ==`);
});