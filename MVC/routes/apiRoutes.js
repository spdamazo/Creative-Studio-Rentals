// MVC/routes/apiRoutes.js
const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.get('/data', apiController.getData);
router.post('/data', apiController.addData);
router.put('/data/:id', apiController.updateData);
router.delete('/data/:id', apiController.deleteData);

module.exports = router;