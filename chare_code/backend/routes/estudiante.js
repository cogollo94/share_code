const express=require('express');
const estudianteController=require('../controllers/EstudianteController');
const router=express.Router();

router.get('/estudiantes',estudianteController.getEstudiantes);
router.get('/estudiante/:id',estudianteController.getEstudiante);
router.post('/estudiante',estudianteController.newEstudiante);
router.delete('/estudiante/:id',estudianteController.deleteEstudiante);
router.put('/estudiante/:id',estudianteController.updateEstudiante);
module.exports=router;