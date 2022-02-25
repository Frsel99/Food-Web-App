const supertest = require('supertest');
const assert = require('assert');
const app = require('../../src/routes/typesDiet')

// describe('Get Types Of Diet', () => {
//     it('Should response with status 200 if OK', (done) => {
//         supertest(app)
//             .get('/')
//             .expect(200)
//             .end(function (err, res) {
//                 if (err) done(err);
//                 done(res);
//             })
//     })
// })