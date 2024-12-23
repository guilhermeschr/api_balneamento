const express = require('express');
const router = express.Router();
const { getAllPontosColetas } = require('../controllers/pontosColetasController');
//, postPontosColetas, deletePontosColetas, putPontosColetas
// Rota para obter todos os usuários
router.get('/', getAllPontosColetas);
// router.post('/', postPontosColetas);
// router.delete('/:id', deletePontosColetas);
// router.put('/:id', putPontosColetas);

module.exports = router;
