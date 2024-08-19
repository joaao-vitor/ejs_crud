const express = require('express')
const router = express.Router()

const userController = require('../controllers/Api/V1/userController')
const { userValidationRules } = require('../validation/Api/V1/userValidation')

const articleController = require('../controllers/Api/V1/articleController')
const {
    articleValidationRules,
} = require('../validation/Api/V1/articleValidation')

router.get('/user', (req, res) => {
    userController.get(req, res)
})
router.post('/user/create', userValidationRules(), (req, res) => {
    userController.post(req, res)
})
router.put('/user/update/:id', userValidationRules(), (req, res) => {
    userController.update(req, res)
})
router.delete('/user/delete/:id', (req, res) => {
    userController.delete(req, res)
})

router.get('/article/:userId', (req, res) => {
    articleController.get(req, res)
})
router.post('/article/create', articleValidationRules(), (req, res) => {
    articleController.post(req, res)
})
router.put('/article/update/:id', (req, res) => {
    articleController.update(req, res)
})
router.delete('/article/delete/:id', (req, res) => {
    articleController.delete(req, res)
})

module.exports = router
