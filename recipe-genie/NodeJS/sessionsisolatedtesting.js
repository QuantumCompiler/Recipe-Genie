const request = require('supertest');
const assert = require('assert');
const app = require('./UserSessionsIsolated'); 

describe('User Sessions', function() {
    // Using agent to maintain session
    let agent = request.agent(app); 

    // Test for login route
    it('should login a user and set a session', function(done) {
        agent
            .post('/login')
            .send({ username: 'testuser', password: 'testpass' })
            .expect(200)
            .expect((res) => {
                assert.strictEqual(res.body.message, 'Login successful');
            })
            .end(done);
    });

    // Test for checking login status
    it('should return login status as true after login', function(done) {
        agent
            .get('/login-status')
            .expect(200)
            .expect((res) => {
                assert.strictEqual(res.body.isLoggedIn, true);
            })
            .end(done);
    });

    // Test for logout route
    it('should logout a user and destroy the session', function(done) {
        agent
            .get('/logout')
            .expect(200)
            .expect((res) => {
                assert.strictEqual(res.body.message, 'Logged out successfully');
            })
            .end(done);
    });

    // Test for checking login status after logout
    it('should return login status as false after logout', function(done) {
        agent
            .get('/login-status')
            .expect(200)
            .expect((res) => {
                assert.strictEqual(res.body.isLoggedIn, false);
            })
            .end(done);
    });
});
