// const Estudiante = require('../models/estudiante');
import Estudiante from '../models/estudiante';

let getEstudiantes = (req, res) => {
    Estudiante.find()
    .populate('materia')
    .exec((err,estudiantes)=>{
        if (err) {
            res.status(500).send({
                message: `Error ${err}`
            })
        }
        if (!estudiantes) {
            res.status(404).send({
                message: 'No existen estudiantes'
            })
        }
        res.status(200).send({
            estudiantes
        })
    })
    // Estudiante.find({}, (err, estudiantes) => {
    //     if (err) {
    //         res.status(500).send({
    //             message: `Error ${err}`
    //         })
    //     }
    //     if (!estudiantes) {
    //         res.status(404).send({
    //             message: 'No existen estudiantes'
    //         })
    //     }
    //     res.status(200).send({
    //         estudiantes
    //     })
    // })
}
let getEstudiante = (req, res) => {
    let {id}=req.params;
    Estudiante.findById(id,(err,estudiante)=>{
        if(err){
            res.status(500).json({
                menssage:`Error al mostrar el estudiante ${err}`
            })
        }
        if(!estudiante){
            res.status(404).json({
                menssage: 'No existe el estudiante'
            })
        }else{
            res.status(200).json({
                estudiante
            })
        }
    })
}

let newEstudiante=(req,res)=>{
    let estudiante=new Estudiante({
        nombre:req.body.nombre,
        nombre2:req.body.nombre2,
        apellido:req.body.apellido,
        apellido2:req.body.apellido2,
        edad:req.body.edad,
        materia:req.body.materia
    })
    estudiante.save((err,estudiante)=>{
        if(err){
            res.status(500).send({
                message:`Ocurrio un error ${err}`
            })
        }
        else{
            res.status(200).send({estudiante})
        }
    })
}
// async-await
// let newEstudiante = async (req, res) => {
//     const estudiante=new Estudiante(req.body);
//     await estudiante.save();
//     res.json({
//         status:'Estudiante guardado'
//     })
// }
let deleteEstudiante = (req, res) => {
    let {id} = req.params;
    Estudiante.findByIdAndDelete(id, (err) => {
        if (err) {
            res.status(500).send({
                message: `Error ${err}`
            })
        }else{
            res.status(200).send({
                message:'Estudiante eliminado'
            })
        }
    })
};

let updateEstudiante = (req, res) => {
    let { id } = req.params;
    let update = req.body;
    Estudiante.findByIdAndUpdate(id, update, { new: true }, (err, estudianteUpdated) => {
        if (err) {
            res.status(500).json({
                ok: false,
                message: `Error al actualizar el estudiante ${err}`
            })
        }
        res.status(200).json({
            estudiante:estudianteUpdated
        })
    })
}

module.exports = {
    getEstudiantes,
    getEstudiante,
    newEstudiante,
    deleteEstudiante,
    updateEstudiante
}