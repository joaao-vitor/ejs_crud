const { DataTypes } = require('sequelize')
const db = require('../config/database') // Configure your database
const User = require('./user')

const Article = db.define(
    'Article',
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id',
            },
            allowNull: false,
        },
    },
    {
        tableName: 'articles', // Specify your custom table name here
    }
)
User.hasMany(Article, { foreignKey: 'userId' })
Article.belongsTo(User, { foreignKey: 'userId' })
db.sync()
    .then(() => {
        console.log('Articles table created successfully')
    })
    .catch((error) => {
        console.error('Unable to create table : ', error)
    })

module.exports = Article
