const mongoose=require('mongoose');
const {Schema}=mongoose
const EstudianteSchema=new Schema({
   nombre:{type:String},
   nombre2:{type:String},
   apellido:{type:String},
   apellido2:{type:String},
   edad:{type:String},
   materia:{type:Schema.Types.ObjectId,ref:'Materia'}
},{versionKey:false});

const Estudiante=mongoose.model('Estudiante',EstudianteSchema);
module.exports=Estudiante;