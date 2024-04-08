const supertest = require('supertest')
const chai = require('chai')
const request = supertest('http://localhost:3000')
const { expect } = chai

let lastUserAdded = null

describe('Testes da API com dados corretos', () => {
    describe('GET /v1/user', () => {
        it('retornar todos usuários', (done) => {
            request
                .get('/v1/user')
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err)
                    expect(res.body).to.be.an('array')
                    done()
                })
        })
    })

    describe('POST /v1/user/create', () => {
        it('criar um novo usuário', (done) => {
            const newUser = {
                name: 'Fulano',
                address: 'Rua do Fulano',
                age: 21,
            }
            request
                .post('/v1/user/create')
                .send(newUser)
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err)
                    expect(res.body).to.have.property('id')
                    lastUserAdded = res.body.id
                    done()
                })
        })
    })

    describe('PUT /v1/user/:id', () => {
        it('atualizar um usuário existente', (done) => {
            const userId = lastUserAdded // Se existir usuário com esse id
            const updatedUser = {
                name: 'Ciclano',
                address: 'Rua do Ciclano',
                age: 21,
            }
            request
                .put(`/v1/user/update/${userId}`)
                .send(updatedUser)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        console.log(err)
                        return done(err)
                    }
                    expect(res.body)
                        .to.have.property('message')
                        .to.equal('User updated successfully')
                    done()
                })
        })
    })

    describe('DELETE /v1/user/:id', () => {
        it('excluir um usuário existente', (done) => {
            const userId = lastUserAdded // Se existir usuário com esse id
            request
                .delete(`/v1/user/delete/${userId}`)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err)
                    expect(res.body)
                        .to.have.property('message')
                        .to.equal('User deleted successfully')
                    done()
                })
        })
    })
})

describe('Testes da API com dados incorretos', () => {
    describe('POST /v1/user/create', () => {
        it('criar um novo usuário incompleto', (done) => {
            const newUser = {
                name: 'Fulano',
                address: 'Rua do Fulano',
            }
            request
                .post('/v1/user/create')
                .send(newUser)
                .expect(500)
                .end((err, res) => {
                    done()
                })
        })
    })

    describe('PUT /v1/user/:id', () => {
        it('atualizar um usuário inexistente', (done) => {
            const userId = 5165156 // Se existir usuário com esse id
            const updatedUser = {
                name: 'Ciclano',
                address: 'Rua do Ciclano',
                age: 21,
            }
            request
                .put(`/v1/user/update/${userId}`)
                .send(updatedUser)
                .expect(404)
                .end((err, res) => {
                    if (err) {
                        return done(err)
                    }
                    expect(res.body)
                        .to.have.property('message')
                        .to.equal('User not found')
                    done()
                })
        })
    })

    describe('DELETE /v1/user/:id', () => {
        it('excluir um usuário inexistente', (done) => {
            const userId = 5165156 // Se existir usuário com esse id
            request
                .delete(`/v1/user/delete/${userId}`)
                .expect(404)
                .end((err, res) => {
                    if (err) return done(err)
                    expect(res.body)
                        .to.have.property('message')
                        .to.equal('User not found')
                    done()
                })
        })
    })
})
