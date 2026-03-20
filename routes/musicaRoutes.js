const express = require('express'); 
const router = express.Router(); 
const musicaController = require('../controllers/musicaController');

router.get('/', musicaController.getMusicas); 
router.post('/', musicaController.createMusica); 
router.put('/:id', musicaController.updateMusica); 
router.delete('/:id', musicaController.deleteMusica); 

module.exports = router;