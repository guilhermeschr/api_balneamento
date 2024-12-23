const express = require('express');
const router = express.Router();
const { getAllBoletins, postBoletim, deleteBoletim, putEstado } = require('../controllers/boletinsController');

router.get('/',getAllBoletins);
router.post('/',postBoletim);
router.delete('/:id',deleteBoletim);
router.put('/:id', putEstado);

module.exports = router;