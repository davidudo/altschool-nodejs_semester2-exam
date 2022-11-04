const request = require('supertest');
const { connect } = require('./test.database');
const UserModel = require('../../src/models/user.model');
const app = require('../../index');

describe('Auth: Signup and Login', () => {
    let conn;

    beforeAll(async () => {
        conn = await connect();
    });

    afterEach(async () => {
        await conn.cleanup();
    });

    afterAll(async () => {
        await conn.disconnect();
    });
    
    it('should signup a user', async () => {
        const response = await request(app).post('/signup')
        .set('content-type', 'application/json')
        .send({ 
            firstName: 'Tobie',
            lastName: 'Augustina',
            email: 'tobi@mail.com',
            password: '123456',
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('user');
        expect(response.body.user).toHaveProperty('firstname', 'Tobie');
        expect(response.body.user).toHaveProperty('lastname', 'Augustina');
        expect(response.body.user).toHaveProperty('email', 'tobi@mail.com');        
    });


    it('should login a user', async () => {
        // create user in out db
        const user = await UserModel.create({ username: 'tobi', password: '123456'});

        // login user
        const response = await request(app)
        .post('/login')
        .set('content-type', 'application/json')
        .send({ 
            username: 'tobi', 
            password: '123456'
        });
    

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');      
    })
});
