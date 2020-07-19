const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/attempt', userController.login);
router.get('/isauth', userController.isAuth);
router.get('/logout', userController.logOut);

module.exports = router;