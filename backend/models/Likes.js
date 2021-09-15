'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, Datatypes) => { // EDIT THE getPost()?  
    class Likes extends Model {
        static associate (models) {
            Likes.belongsTo(models.User, { foreignKey: 'userId' })
            Likes.belongsTo(models.Post, { foreignKey: 'postId '})
        }
    }

    Likes.init({
        postId: Datatypes.INTEGER,
        userId: Datatypes.INTEGER
    },
    {
        sequelize, modelName: "Likes"
    })

    Likes.afterCreate(async like => {
        const post = await like.getPost()
        await post.update({
            likesCount: post.likesCount + 1
        })
    })

    Likes.afterDestroy(async like => {
        const post = await  like.getPost()
        await  post.update({
            likesCount: post.likesCount - 1
        })
    })
    
    Likes.afterCreated(async like => {
        const post = await like.getPost()
        const user = await like.getUser()

        if (user.id == post.userId) return

        const notification = await sequelize.models.Notification.create
    })
}