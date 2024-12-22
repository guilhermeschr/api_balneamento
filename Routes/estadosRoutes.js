const express = require('express');
const router = express.Router();
const { getAllEstados, postEstado, deleteEstado, putEstado } = require('../controllers/estadosController');

// Rota para obter todos os usuários
router.get('/', getAllEstados);
router.post('/', postEstado);
router.delete('/:id', deleteEstado);
router.put('/:id', putEstado)

module.exports = router;
