'use strict';
const server = require('../auth/server')
const supertest = require('supertest')
const request = supertest(server.app);
const {databaseexported}= require('../auth/models/index.js');
beforeAll( async () =>{
    await databaseexported.sync();
})
afterAll( async () =>{
    await databaseexported.drop();
})

describe('testing the server',()=>{
    it('testing 404 bad route',async()=>{
        const response = await request.get('/wrongpath');
        expect(response.status).toBe(404) 
    })
    it('testing 404',async()=>{
        const response = await request.post('/');
        expect(response.status).toBe(404) 
    })
});

describe('testing post requests ',()=>{
    it('for sign up',async()=>{
       const response = await request.post('/signup').send({
            username : "ibrahim",
            password : "class6"
       })
       expect(response.status).toBe(201);
    })
    it('for sign in',async()=>{
        const response = await request.post('/signin').auth('ibrahim','class6');
        expect(response.status).toBe(200);
    })
    it('testing wrong pass (status 500)',async()=>{
        const response = await request.post('/signin').auth('ibrahim','wrongpass');
        expect(response.status).toBe(500);
    })
    it('testing wrong username (status 500)',async()=>{
        const response = await request.post('/signin').auth('wrongusername','class6');
        expect(response.status).toBe(500);
    })
    
})