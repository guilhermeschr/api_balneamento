const express = require('express');
const router = express.Router();
const { getAllPontosColetas, postPontosColeta, deletePontosColeta, putPontosColeta } = require('../controllers/pontosColetasController');

// Rota para obter todos os usuários
router.get('/', getAllPontosColetas);
router.post('/', postPontosColeta);
router.delete('/:id', deletePontosColeta);
router.put('/:id', putPontosColeta);

module.exports = router;
