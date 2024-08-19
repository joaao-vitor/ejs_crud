const Article = require('../../../models/article')
const User = require('../../../models/user')
const { validationResult } = require('express-validator')

module.exports = {
    // Create a new article
    post: async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({ message: errors.array() })
            }

            const { title, description, content, image, userId } = req.body

            const newArticle = await Article.create({
                title,
                description,
                content,
                image,
                userId: Number(userId),
            })

            res.status(201).json(newArticle)
        } catch (error) {
            console.error('Error creating article:', error)
            res.status(500).json({ message: 'Error creating article' })
        }
    },

    // Get all articles by user
    get: async (req, res) => {
        try {
            const { userId } = req.params
            if (!userId) {
                return res.status(400).json({ message: 'userId is missing' })
            }
            const user = await User.findOne({
                where: {
                    id: userId,
                },
            })

            if (!user) {
                return res.status(404).json({ message: 'user not found' })
            }
            const articles = await Article.findAll({
                where: {
                    userId,
                },
            })

            res.status(200).json(articles)
        } catch (error) {
            console.error('Error fetching articles:', error)
            res.status(500).json({ message: 'Error fetching articles from db' })
        }
    },

    // Update article
    update: async (req, res) => {
        try {
            const id = req.params.id
            const { title, description, content, image } = req.body

            if (!title || !description || !content || !image) {
                return res
                    .status(400)
                    .json({ message: 'Must provide all the fields' })
            }

            const checkArticles = await Article.findByPk(id)

            if (!checkArticles) {
                return res.status(404).json({ message: 'Article not found' })
            }

            await Article.update(
                { title, description, content, image },
                { where: { id } }
            )

            res.status(200).json({ message: 'Article updated successfully' })
        } catch (error) {
            console.error('Error updating article:', error)
            res.status(500).json({ message: 'Error updating article' })
        }
    },

    // Delete article
    delete: async (req, res) => {
        try {
            const articleId = req.params.id
            const checkArticle = await Article.findByPk(articleId)

            if (!checkArticle) {
                return res.status(404).json({ message: 'Article not found' })
            }

            await checkArticle.destroy()

            res.status(200).json({ message: 'Article deleted successfully' })
        } catch (error) {
            console.error('Error deleting Article:', error)
            res.status(500).json({ message: 'Error deleting Article' })
        }
    },
}
