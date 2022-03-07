'use strict';
const express = require ('express');
const routers = express.Router();
const basicAuth = require('../middleware/basicAuth');

routers.post('/signin',basicAuth,(req,res)=>{

    res.status(200).json(req.User);
})



module.exports = routers;