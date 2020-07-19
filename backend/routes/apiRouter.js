const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemController');
router.post('/getItemById', itemController.findItemByID);
router.get('/getItems', itemController.getAllItems);
router.post('/getCart', itemController.getCart);
router.post('/addToCart', itemController.addToCart);

const serverController = require('../controllers/server');
router.post('/handleReqEhsas', serverController.handleReqEhsas);
router.post('/handleReqKholase', serverController.handleReqKholase);

module.exports = router;