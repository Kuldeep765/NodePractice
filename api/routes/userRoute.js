const exprees = require('express')
const { userRegister, userLogin, userList, getParticularUser, deleteUser } = require('../controller/userCtrl')
const router = exprees.Router()
const { userValidation } = require('../validation/userValidation')

router.post('/register', userValidation, userRegister)
router.post('/login', userLogin)
router.get('/userlist', userList)
router.get('/user/:id', getParticularUser).delete(deleteUser)


module.exports = router