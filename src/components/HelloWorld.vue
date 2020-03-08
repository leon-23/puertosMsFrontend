<template>
  <v-container
     id="data-tables"
      tag="section"
      class="mt-10"
  >

      <MaterialCard
        color="primary"
        icon="mdi-wifi"
        inline
        class="px-5 py-3"
      >
        <template v-slot:after-heading>
          <div class="display-1 font-weight-light">        
              Listado de Puertos
          </div>
        </template>

      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        class="ml-auto"
        label="Search"
        hide-details
        single-line
        style="max-width: 250px;"
      />

      <v-divider class="mt-2 mb-5" />

        <v-fab-transition class="mt-5">
        <v-btn
          outlined
          dark
          color="primary"
          @click="toggleDialog"
        >
          Agregar 
        </v-btn>
      </v-fab-transition>


      <v-data-table
        :headers="$store.state.headers"
        :items="$store.state.items"
        :search.sync="search"
        :sort-by="['puerto.nombre', 'puerto.puerto']"
        :sort-desc="[false, true]"
        :loading="$store.state.loading"
        multi-sort
        class="mt-5"
      >
        <template v-slot:item.actions="{ item }">
          <v-btn
            :key="1"
            color="primary"
            fab
            class="px-1 ml-1"
            x-small
            @click="showPuerto(item)"
          >
            <v-icon small v-text="'mdi-eye'" />
          </v-btn>
          <v-btn
            :key="2"
            color="secondary"
            fab
            class="px-1 ml-1"
            x-small
            @click="setPuerto(item)"
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
    </MaterialCard>
    
    <v-container id="modal-puertos" tag="section">
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="800">
        <v-card>
          <v-card-title class="headline">
           {{ getTitleModal }}
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
              :readonly="readonly"
            ></v-text-field>

            <v-text-field
              v-model="$store.state.puerto.puerto"
              label="Puerto"
              placeholder="8080"
              :counter="4"
              :maxlength="4"
              required
              @blur="findPuerto($event)"
              :readonly="readonly"
            ></v-text-field>
            
            <v-text-field
              v-model="$store.state.puerto.dominio"
              label="Dominio"
              required
              :readonly="readonly"
            ></v-text-field>

            <v-text-field
              v-model="$store.state.puerto.servidor"
              label="Servidor"
              required
              :readonly="readonly"
            ></v-text-field>
            
            <v-btn v-if="!readonly"
              class="mr-4 primary"
              @click="savePuerto"
              :disabled="validPuerto() ? true : false"
              > Guardar</v-btn>
            <v-btn v-if="!readonly" @click="$store.commit('resetPuerto')">Clear</v-btn>
          </v-form>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="toggleDialog()">Cancelar</v-btn>
          </v-card-actions>
        
        </v-card>
      </v-dialog>
    </v-row>
    </v-container>
  </v-container>


</template>

<script>
import MaterialCard from './MaterialCard';
import puertoService from '../services/puertoService';

export default {
  name: "PuertosDataTable",

  components: {
    MaterialCard,
  },

  data: () => ({
    dialog: false,
    search: undefined,
    loading: true,
    readonly : false,
  }),
  
  computed: {
    getTitleModal(){
      return  !this.$store.state.puerto._id 
        ? 'Crear Puerto'
        : this.readonly
        ? 'Ver Puerto'
        : 'Editar Puerto';
    },
  },

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
        
    }catch(error){
      console.error(error);
      this.errorMsj();
    }
    finally{
      this.$store.commit('setLoading');
    }

    },
    toggleDialog(){
      this.dialog = !this.dialog;

      if(!this.dialog){
        this.$store.commit('resetPuerto')
        this.readonly = false
      }
    },
    async savePuerto() {
     
      const msj = this.validPuerto()

      if(!msj){
        const puerto = { ...this.$store.state.puerto };

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
    showPuerto(item) {
      console.log(item);      
      this.readonly = true;
      this.setPuerto(item)

    },
    setPuerto(item) {
      console.log(item.puerto);
      this.$store.commit('setPuerto', item.puerto);

      this.dialog = true;
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
      const puerto = event.target.value;

      if(!this.readonly && puerto.length === 4 && parseInt(puerto)){
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