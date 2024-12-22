const express = require('express');
const router = express.Router();
const { getAllCidades, postCidade, deleteCidade, putCidade } = require('../controllers/cidadesController');

router.get('/', getAllCidades);
router.post('/', postCidade);
router.delete('/:id', deleteCidade);
// router.put('/:id', putCidade);

module.exports = router;
