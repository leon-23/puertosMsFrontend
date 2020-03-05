<template>
  <v-container id="data-tables" tag="section">
      <v-card
        class="mx-auto"
        max-width="1000"
      >
      <v-card-title>
          Listado de Puertos
      </v-card-title>

      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        class="ml-auto"
        label="Search"
        hide-details
        single-line
        style="max-width: 250px;"
      />

      <v-divider class="mt-3" />

        <v-fab-transition>
        <v-btn
          fab
          dark
          relative
          color="primary"
          rigth
          top
          @click="toggleDialog"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-fab-transition>


      <v-data-table
        :headers="$store.state.headers"
        :items="$store.state.items"
        :search.sync="search"
        :sort-by="['name', 'office']"
        :sort-desc="[false, true]"
        :loading="$store.state.loading"
        multi-sort
        class="elevation-1"
      >
        <template v-slot:item.actions="{ item }">
          <v-btn
            :key="1"
            color="primary"
            fab
            class="px-1 ml-1"
            x-small
            @click="showUser(item)"
          >
            <v-icon small v-text="'mdi-eye'" />
          </v-btn>
          <v-btn
            :key="2"
            color="secondary"
            fab
            class="px-1 ml-1"
            x-small
            @click="editPuerto(item)"
          >
            <v-icon small v-text="'mdi-pencil'" />
          </v-btn>
          <v-btn
            :key="3"
            color="danger"
            fab
            class="px-1 ml-1"
            x-small
            @click="deletePuerto(item.puerto._id)"
          >
            <v-icon small v-text="'mdi-delete'" />
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    
    <v-container id="modal-puertos" tag="section">
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="800">
        <v-card>
          <v-card-title class="headline">
            Crear Puerto
          </v-card-title>
            
          <v-form
              ref="form"
              lazy-validation
              max-width="600"
              max-heigth="400"
              padding="50"
              class="modal-form"
          >

            <v-text-field
              v-model="$store.state.puerto.nombre"
              label="Nombre"
              required
            ></v-text-field>

            <v-text-field
              v-model="$store.state.puerto.puerto"
              label="Puerto"
              :counter="4"
              :maxlength="4"
              required
              @blur="findPuerto($event)"
            ></v-text-field>
            
            <v-text-field
              v-model="$store.state.puerto.dominio"
              label="Dominio"
              required
            ></v-text-field>

            <v-text-field
              v-model="$store.state.puerto.servidor"
              label="Servidor"
              required
            ></v-text-field>

            <v-btn class="mr-4" @click="savePuerto"> Guardar</v-btn>
            <v-btn @click="$store.commit('resetPuerto')">Clear</v-btn>
          </v-form>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="toggleDialog()">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    </v-container>
  </v-container>


</template>

<script>
import puertoService from '../services/puertoService';

export default {
  name: "PuertosDataTables",

  computed: {

  },

  data: () => ({
    dialog: false,
    search: undefined,
    loading: true,
  }),
  
  async mounted() {
    this.loadData(); 
  },

  methods: {
    async loadData() {

      try{
        const response = await puertoService.getPuertos();
        const data = response.
                      data.
                      data.
                      map( puerto =>{
                        return {
                          puerto: {
                            ...puerto
                          }
                        }
                      })

        this.$store.commit('setItems', data);
        this.$store.commit('setLoading');
        
    }catch(error){
      console.error(error);
      this.errorMsj();
    }

    },
    toggleDialog(){
      this.dialog = !this.dialog;

      if(!this.dialog)
        this.$store.commit('resetPuerto')
    },
    async savePuerto() {
     
      const msj = this.validPuerto()

      if(!msj){
        const puerto = { ...this.$store.state.puerto };

        console.log("save puerto", puerto)

        puerto._id
        ? await this.updatePuerto(puerto)
        : await this.crearPuerto(puerto)

         this.toggleDialog();
      }
      else{
        alert(msj)
      }

    },
    async crearPuerto(puerto){
      console.log("crearPuerto");
      try{
        const response = await puertoService.save(puerto)
        console.log(response);

        this.$store.commit('addPuerto', response.data.data);

        this.successMsj(`Se creo el Puerto ${puerto.nombre}`)
        

      }catch(error){
        console.error(error);
        this.errorMsj();
      }
    },
     async updatePuerto(puerto){

      try{
        const response = await puertoService.update(puerto)
        console.log(response);

        this.$store.commit('updatePuerto', puerto)

        this.successMsj(`Se edito el Puerto ${puerto.nombre}`)

      }catch(error){
        console.error(error);
        this.errorMsj();
      }
    },
    showUser(item) {
       console.log(item);
       //this.$swal('Hello Vue world!!!');
       this.$swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500,
        showClass: {
          popup: 'animated fadeInDown faster'
        },
        hideClass: {
          popup: 'animated fadeOutUp faster'
        }
      })
    },
    editPuerto(item) {
      console.log(item.puerto);
      this.$store.commit('setPuerto', item.puerto);

      this.toggleDialog();
    },
    deletePuerto(id) {
      
        this.$swal.fire({
          title: 'Está Seguro?',
          text: "No se puede revertir esto!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, Eliminalo!'
        }).then( async (result) => {
          if (result.value) {

            try{
              const response = await puertoService.deletePuerto(id);
              const puerto = {...response.data.data };

              this.$store.commit('deletePuerto', puerto._id);

              this.$swal.fire(
                'Eliminado!',
                `El puerto ${puerto.nombre} ha sido eliminado`,
                'success'
              ) 
            }catch(error){
                console.error(error);
                this.errorMsj();
              }            
          }
        })
    },
    validPuerto(){
      const puerto = {...this.$store.state.puerto};
      let msj = ""

      if(!puerto.nombre)
        msj += "* El nombre del puerto es requerido! \n";
      if(!puerto.puerto)
        msj += "* El numero del puerto es requerido! \n";
      if(puerto.puerto.length !== 4)
        msj += "* El puerto debe tener 4 caracteres! \n";
      if(!parseInt(puerto.puerto))
        msj += "* El puerto solo debe poseer numeros! \n"
      if(!puerto.dominio)
        msj += "* El dominio es requerido! \n";
      if(!puerto.servidor)
        msj += "* El servidor  es requerido! \n";
      
      return msj;
    },
    async findPuerto(event){
      console.log(event.target.value)
      const puerto = event.target.value;

      if(puerto.length === 4 && parseInt(puerto)){
        const response = await puertoService.findByPort(puerto);

        if(!response.data.data){
            alert(`El puerto ${puerto} no esta disponible`)
            event.target.focus();
        }
      }
    },
    successMsj(title){
      this.$swal.fire({
          position: 'center',
          icon: 'success',
          title,
          showConfirmButton: false,
          timer: 1500,
          showClass: {
            popup: 'animated fadeInDown faster'
          },
          hideClass: {
            popup: 'animated fadeOutUp faster'
          }
        })
    },
    errorMsj(){
      this.$swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ups hemos cometido un error',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }
};
</script>

<style>
  form.modal-form {
    padding-top: 10px;
    padding-left: 50px;
    padding-right: 50px;
    padding-bottom: 10px;
  }
</style>