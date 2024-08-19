const { body } = require('express-validator')

const articleValidationRules = () => {
    return [
        // Validate name
        body('title')
            .notEmpty()
            .isLength({ min: 3, max: 200 })
            .withMessage('title must be between 3 and 200 characters'),

        body('description')
            .notEmpty()
            .isLength({ min: 50, max: 300 })
            .withMessage('description must be between 50 and 300 characters'),

        body('content')
            .notEmpty()
            .isLength({ min: 300 })
            .withMessage('content must be at least 300 characters'),

        body('image').notEmpty().withMessage('image is not optional'),

        body('userId').notEmpty().withMessage('userId is not optional'),
    ]
}

module.exports = {
    articleValidationRules,
}
