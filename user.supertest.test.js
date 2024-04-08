const request = require('supertest')
const app = require('./app')

describe('GET /v1/user', function () {
    it('pegar todos os usuários', function (done) {
        request(app)
            .get('/v1/user')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)

                if (!(res.body instanceof Array)) {
                    return done(new Error('A resposta não é um array'))
                }
                done()
            })
    })
})
