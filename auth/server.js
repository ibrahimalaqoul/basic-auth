
'use strict';
const express = require('express');
const cors = require('cors');
const errorhandler = require('./error-handler/errorHandler');
const  notFound = require('./error-handler/404');
const signinRoute = require('./routes/signin');
const signUpRoute = require('./routes/signup');
const app = express();

app.use(express.json());
app.use(cors());
app.use(signUpRoute);
app.use(signinRoute);

app.get('/',(req,res)=>{
    res.status(200).send('HOME Page');
});

app.use(errorhandler);
app.use('*',notFound);

function start(port) {
    app.listen(port,()=>{
        console.log(`running on port ${port}`)
    })
}

module.exports = {
    app: app,
    start: start
}