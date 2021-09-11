const express = require('express')
const router =  express.Router()

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

const postCtrl = require('../controllers/post')

router.get('/', auth, postCtrl.getPosts)
router.post('/', auth, multer, postCtrl.createPost)
// router.get('/:id', auth, postCtrl.getPost)
// router.put('/:id', auth, multer, postCtrl.modifyPost)
// router.put('/:id', auth, postCtrl.deletePost)

module.exports = router