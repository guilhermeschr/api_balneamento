const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, deleteUser, putUser } = require('../controllers/userController');

// Rota para obter todos os usuários
router.get('/', getAllUsers);

// Rota para criar um novo usuário
router.post('/', createUser);

router.delete('/:id', deleteUser);

router.put('/:id', putUser)

module.exports = router;
