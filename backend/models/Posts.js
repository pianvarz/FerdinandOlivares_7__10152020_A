'use strict'
const db = require('../models')
const { Model } = require('sequelize')
const moment = require('moment')

//  Requires a program to delete/remove files

module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate (models) {
            Post.belongsTo(models.User, { foreignKey: 'userId' })
            // Post.hasMany(models.Comments)
            // Post.hasMany(models.Likes)
        }

        timeStamp(){
            return moment(this.createdAt)
            .locale('en-gb')
            .format('l')
        }
    }

    Post.init({
        content: DataTypes.STRING,
        imageUrl: DataTypes.STRING,
        // likesCount: DataTypes.INTEGER
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: db.User,
                key: 'id'
            },
            allowNull: false
        },
    },
    { 
        sequelize, 
        validate: { 
            noPost () {
                if (!this.content) {
                    throw new Error('Cannot Post as there is no content! ')
                }
            }
        },
        modelName: 'Post'
    })

    // Post.removed(async post => {
    //     if(post.imageUrl) {
    //         await deleteFile(post.imageUrl)
    //     }
    // })

    // Post.updated(async post => {
    //     if (post.dataValues.imageUrl !== post._previousDataValues.imageUrl) {
    //         await deleteFile(post._previousDataValues.imageUrl)
    //     }
    // })

    return Post
}