'use strict';

require('dotenv').config();

const server = require('./auth/server');

const {databaseexported} = require('./auth/models/index')

    databaseexported.sync().then(()=>{
    server.start(process.env.PORT || 3008);})

.catch(console.error) 