<!--Nota: Tener en cuenta la manera en que esta establecido el modelo de datos-->

<template>
  <div class="container">
     <form @submit.prevent="editarEstudiante(estudianteEditar)" v-if='editar'>
        <h3>Edit Estudiante</h3>
        <input type="text" class="form-control my-2" placeholder="Nombre" v-model="estudianteEditar.nombre">
        <input type="text" class="form-control my-2" placeholder="Segundo Nombre" v-model="estudianteEditar.nombre2">
        <input type="text" class="form-control my-2" placeholder="Apellido" v-model="estudianteEditar.apellido">
        <input type="text" class="form-control my-2" placeholder="Segundo Apellido" v-model="estudianteEditar.apellido2">
        <input type="number" class="form-control my-2" placeholder="Edad" v-model="estudianteEditar.edad">
        <input type="text" class="form-control my-2" placeholder="Materia" v-model="estudianteEditar.materia"> 
        <button class="btn btn-dark sm my-2 mx-2" type="submit">Editar</button>
        <button class="btn btn-danger sm my-2" type='submit' @click='editar=false'>Cancelar</button>
     </form>
     <form @submit.prevent="newEstudiante()" v-if="!editar">
        <h3>Agregar Estudiante</h3>
        <input type="text" class="form-control my-2" placeholder="Nombre" v-model="estudiante.nombre">
        <input type="text" class="form-control my-2" placeholder="Segundo Nombre" v-model="estudiante.nombre2">
        <input type="text" class="form-control my-2" placeholder="Apellido" v-model="estudiante.apellido">
        <input type="text" class="form-control my-2" placeholder="Segundo Apellido" v-model="estudiante.apellido2">
        <input type="number" class="form-control my-2" placeholder="Edad" v-model="estudiante.edad">
        <input type="text" class="form-control my-2" placeholder="Materia" v-model="estudiante.materia">
        <button class="btn btn-success my-2 btn-block" type="submit" >Agregar</button>
     </form>
     <div class="table-responsive">
       <table class="table">
        <thead>
           <tr>
              <th>Nombre</th>
              <th>Segundo Nombre</th>
              <th>Apellido</th>
              <th>Segundo Apellido</th>
              <th>Edad</th>
              <th>Materia</th>
              <th>Opciones</th>
           </tr>
        </thead>
        <tbody>
           <tr v-for='(student,index) in estudiantes' :key='index'>
              <td>{{student.nombre}}</td>
              <td>{{student.nombre2}}</td>
              <td>{{student.apellido}}</td>
              <td>{{student.apellido2}}</td>
              <td>{{student.edad}}</td>
              <td>
                 {{student.materia}}<br>
                 <!--{{student.materia.nombre}}-->
                 <!-- {{student.materia.descripcion}} -->
              </td>
              <td>
                 <button class="btn-danger btn-sm mx-2" @click="Deletestudent(student._id)">Eliminar</button>
                 <button class="btn-warning btn-sm" @click="activarEdicion(student._id)">Editar</button>
              </td>
           </tr>
        </tbody>
        </table>
      </div>
  </div>
</template>
<script>
 export default {
    data(){
       return{
          estudiantes:[],
          estudiante: {nombre:'',nombre2:'',apellido:'',apellido2:'',edad:'',materia:''},
          editar:false,
          estudianteEditar:{}
       };
    },
    created(){
       this.mostrarEstudiantes();
    },
    methods: {
       mostrarEstudiantes(){
          this.axios.get('/estudiantes')
           .then(res=>{
              this.estudiantes=res.data.estudiantes;
           })
           .catch(err=>{
              console.log(`error ${err}`)
           })
       },
       newEstudiante(){
          this.axios.post('/estudiante',this.estudiante)
          .then(res=>{
             this.estudiantes.push(res.data.estudiante);
             this.estudiante.nombre='';
             this.estudiante.nombre2='';
             this.estudiante.apellido='';
             this.estudiante.apellido2='';
             this.estudiante.edad='';
             this.estudiante.materia='';
          })
          .catch(err=>{
              console.log(err.res)
          })
       },
       Deletestudent(id){
         console.log(id);
         this.axios.delete(`/estudiante/${id}`)
          .then(res=>{
             const index= this.estudiantes.findIndex(item=>item._id === res.data._id);
             this.estudiantes.splice(index,1);
          })
          .catch(err=>{
             console.log(`err ${err.res}`)
          })
       },
       activarEdicion(id){
          this.editar=true;
          console.log(id);
          this.axios.get(`/estudiante/${id}`)
           .then(res=>{
              this.estudianteEditar=res.data.estudiante;
           })
           .catch(err=>{
              console.log(err.res)
           })
       },
       editarEstudiante(item){
           this.axios.put(`/estudiante/${item._id}`,item)
            .then(res=>{
               const index=this.estudiantes.findIndex(est=>est._id === res.data.estudiante._id);
                this.estudiantes[index].nombre=res.data.estudiante.nombre;
                this.estudiantes[index].nombre2=res.data.estudiante.nombre2;
                this.estudiantes[index].apellido=res.data.estudiante.apellido;
                this.estudiantes[index].apellido2=res.data.estudiante.apellido2;
                this.estudiantes[index].edad=res.data.estudiante.edad;
                this.estudiantes[index].materia=res.data.estudiante.materia;
                this.editar=false
            })
       }
    }
 };
</script>