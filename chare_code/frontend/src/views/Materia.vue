  <!--Materia-->
<template>
  <div class="container">
     <form @submit.prevent="editarMateria(materiaEditar)" v-if='editar'>
        <h3>Edit Materia</h3>
        <input type="text" class="form-control my-2" placeholder="Nombre" v-model="materiaEditar.nombre">
        <input type="text" class="form-control my-2" placeholder="Descripción" v-model="materiaEditar.descripcion">
        <button class="btn btn-success sm my-2 mx-2" type="submit" >Editar</button>
        <button class="btn btn-danger sm my-2" type='submit' @click='editar=false'>Cancelar</button>
     </form>
     <form @submit.prevent="newMateria()" v-if="!editar">
        <h3>Agregar Materia</h3>
        <input type="text" class="form-control my-2" placeholder="Nombre" v-model="materia.nombre">
        <input type="text" class="form-control my-2" placeholder="Descripción" v-model="materia.descripcion">
        <button class="btn btn-success my-2 btn-block" type="submit" >Agregar</button>
     </form>
     <div class="table-responsive">
       <table class="table">
        <thead>
           <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Opciones</th>
           </tr>
        </thead>
        <tbody>
           <tr v-for='(matter,index) in materias' :key='index'>
              <td>{{matter.nombre}}</td>
              <td>{{matter.descripcion}}</td>
              <td>
                 <button class="btn-danger sm my-2 mx-2" @click="Deletemateria(matter._id)">Eliminar</button>
                 <button class="btn-warning sm my-2" @click="activarEdicion(matter._id)">Editar</button>
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
          materias:[],
          materia: {nombre:'',descripcion:''},
          editar:false,
          materiaEditar:{}
       };
    },
    created(){
       this.mostrarMaterias();
    },
    methods: {
       mostrarMaterias(){
          this.axios.get('/materias')
           .then(res=>{
              this.materias=res.data.materias;
           })
           .catch(err=>{
              console.log(`error ${err}`)
           })
       },
       newMateria(){
          this.axios.post('/materia',this.materia)
          .then(res=>{
             this.materias.push(res.data.materia);
             this.materia.nombre='';
             this.materia.descripcion='';
          })
          .catch(err=>{
              console.log(e.res)
          })
       },
       Deletemateria(id){
         console.log(id);
         this.axios.delete(`/materia/${id}`)
          .then(res=>{
             const index= this.materias.findIndex(item=>item._id === res.data._id);
             this.materias.splice(index,1);
          })
          .catch(err=>{
             console.log(`err ${err.res}`)
          })
       },
       activarEdicion(id){
          this.editar=true;
          console.log(id);
          this.axios.get(`/materia/${id}`)
           .then(res=>{
              this.materiaEditar=res.data.materia;
           })
           .catch(err=>{
              console.log(err.res)
           })
       },
       editarMateria(item){
           this.axios.put(`/materia/${item._id}`,item)
            .then(res=>{
               const index=this.materias.findIndex(mat=>mat._id === res.data.materia._id);
                this.materias[index].nombre=res.data.materia.nombre;
                this.materias[index].descripcion=res.data.materia.descripcion;
                this.editar=false
            })
       }
    }
 };
</script>