const express = require('express')
const router = express.Router()
const {Signup , Signin , UserDetails} = require('../controllers/userController')
const auth = require('../middleware/userAuth')

router.post('/signup', Signup )
router.post('/signin' , Signin)
router.get('/userdetails' , auth , UserDetails)


module.exports = router