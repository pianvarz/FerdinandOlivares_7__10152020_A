const db = require('../../models')
const jwt = require('jsonwebtoken')
const { Post } = db.sequelize.models
const fs = require('fs')

// router.post('/', postCtrl.createPost)
// router.get('/:id', auth, postCtrl.getPost)
// router.put('/:id', auth, multer, postCtrl.modifyPost)
// router.put('/:id', auth, postCtrl.deletePost)
exports.getPosts = (req, res, next ) => {
    const limit = 4
    const page = parseInt(req.query.page) || 1

    const options = {
        include: [
          {
            model: db.User
          }
        ],
        limit,
        offset: limit * (page - 1),
        order: [['createdAt', 'DESC']]
    }

    if (req.query.userId) {
        options.where = {
            userId: parseInt(req.query.userId)
        }
    }
    db.Post.findAll(options)
    .then(posts => res.status(200).json({ posts }))
    .catch(error => res.status(400).json({ error }))

}

exports.createPost = async (req, res, next) => {  //Create Post
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')
    const userId = decodedToken.userId
    let postObject = req.body

    if (req.file) {
        postObject = JSON.parse(req.body.post)
        postObject.imageUrl = `${req.protocol}://${req.get('host')}/public/${ req.file.filename }`
    } 
    try {
        let post = await db.Post.create({
            ...postObject,
            userId: userId,
        })
        post = await Post.findOne({ where: { id: post.id }, include: db.User })
        res.status(201).json({ post })
    }
    catch (error) {
        console.log(error)
        res.status(400).json(error)
    }

}

exports.getPost = async (req, res, next) => { //Get one post
    db.Post.findOne({
        where: { id: params.id },
        include: [
            {
                model: db.User
            }
        ]
    })
    .then((post) => req.status(201).json({ post }))
    .catch((error) => res.status(500).json(error))
};

exports.updatePost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')
    const userId = decodedToken.userId

    db.Post.update(
        { content: req.body.content } || {
            ...req.body,
            imageUrl: `${req.protocol}://${req.get('host')}/public/${req.file.filename}`
        },
        {
            where: {
                userId: userId,
                postId: req.params.id 
            }
        })
    .then((post) => res.status(201).json({ post }))
    .catch((error) => res.status(500).json(error))
}