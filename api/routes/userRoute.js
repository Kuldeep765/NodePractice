const exprees = require('express')
const { userRegister, userLogin, userList, getParticularUser, deleteUser, updateuser, updateProperty } = require('../controller/userCtrl')
const router = exprees.Router()
const { userValidation } = require('../validation/userValidation')
const { isAuthenticatedUser } = require('../middleware/authMiddleware')

router.post('/register', userValidation, userRegister)
router.post('/login', userLogin)
router.get('/userlist', isAuthenticatedUser, userList)
router.get('/user/:id', getParticularUser)
router.delete('/user/:id', deleteUser)
router.put('/user/:id', updateuser)
router.patch('/user/:id', updateProperty)

module.exports = router