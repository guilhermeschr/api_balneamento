const express = require('express');
const router = express.Router();
const { getAllCampanhas, postCampanha, deleteCampanha, putCampanha } = require('../controllers/campanhasBalneamentoController');

router.get('/', getAllCampanhas);
router.post('/', postCampanha);
router.delete('/:id', deleteCampanha);
router.put('/:id', putCampanha);

module.exports = router;