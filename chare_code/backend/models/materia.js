const mongoose=require('mongoose');
const {Schema}=mongoose;
const MateriaSchema=new Schema({
    nombre:{type:String},
    descripcion:{type:String}
},{versionKey:false})
const Materia=mongoose.model('Materia',MateriaSchema);
module.exports=Materia;