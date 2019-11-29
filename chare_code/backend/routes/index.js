const express=require('express');
const comentarioRouter=require('./comentario');
const estudianteRouter=require('./estudiante');
const postRouter=require('./post');
const materiaRouter=require('./materia');

const router=express.Router();

router.use(comentarioRouter);
router.use(estudianteRouter);
router.use(postRouter);
router.use(materiaRouter);

module.exports=router;