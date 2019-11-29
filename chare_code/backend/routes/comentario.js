const express=require('express');
const comentarioController=require('../controllers/ComentarioController');
const router=express.Router();

router.get('/comentarios',comentarioController.getComentarios);
router.get('/comentario/:id',comentarioController.getComentario);
router.post('/comentario',comentarioController.newComentario);
router.delete('/comentario/:id',comentarioController.deleteComentario);
router.put('/comentario/:id',comentarioController.updateComentario);
module.exports=router;