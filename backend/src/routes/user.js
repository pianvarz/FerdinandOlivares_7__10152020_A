const express = require('express');
const router = express.Router()

const multer = require('../middleware/multer-config')
const auth =  require('../middleware/auth')

const userCtrl = require('../controllers/user.js')

router.get('/', userCtrl.getUsers)
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/edit', auth, multer, userCtrl.editUser)

module.exports = router