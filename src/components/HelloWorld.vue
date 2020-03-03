<template>
  <v-container id="data-tables" tag="section">
    <base-material-card
      color="primary"
      icon="mdi-account-cog"
      inline
      class="px-5 py-3"
    >
      <template v-slot:after-heading>
        <div class="display-2 font-weight-light">
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

      <v-divider class="mt-3" />

        <v-fab-transition>
        <v-btn
          fab
          dark
          absolute
          color="secondary"
          right
          top
          @click="createUser"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-fab-transition>


      <v-data-table
        :headers="headers"
        :items="items"
        :search.sync="search"
        :sort-by="['name', 'office']"
        :sort-desc="[false, true]"
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
            @click="editUser(item)"
          >
            <v-icon small v-text="'mdi-pencil'" />
          </v-btn>
          <v-btn
            :key="3"
            color="danger"
            fab
            class="px-1 ml-1"
            x-small
            @click="deleteUser(item)"
          >
            <v-icon small v-text="'mdi-delete'" />
          </v-btn>
        </template>
      </v-data-table>
    
    </base-material-card>
  </v-container>
</template>

<script>
import puertoService from '../services/puertoService';


export default {
  name: "PuertosDataTables",

  data: () => ({
    hidden: false,
    headers: [
      {
        text: "Id",
        value: "puerto._id"
      },
      {
        text: "Nombre",
        value: "puerto.nombre"
      },
      {
        text: "Puerto",
        value: "puerto.puerto"
      },
      {
        text: "Dominio",
        value: "puerto.dominio"
      },
      {
        text: "Servidor",
        value: "puerto.servidor"
      },
      {
        sortable: false,
        text: "Actions",
        value: "actions"
      }
    ],
    items: [
      {
        puerto: {
          _id: 1,
          nombre: "Angular",
          puerto: "4200",
          dominio: "por definir",
          servidor: "ngx"
        }
      },
      {
        puerto: {
          _id: 2,
          nombre: "Node",
          puerto: "3000",
          dominio: "por definir",
          servidor: "azure"
        }
      },
      {
        puerto: {
          _id: 3,
          nombre: "Java",
          puerto: "8080",
          dominio: "por definir",
          servidor: "tomcat"
        }
      }
    ],
    search: undefined
  }),
  async mounted() {
    console.log("mounted");
  
    this.loadData();
    
  },
  computed:{


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

        this.setItems(data)
    }catch(error){
      console.error(error);
    }


    },
    setItems(items){
      this.items = items;
    },
    createUser() {
      console.log("create");
      this.$router.push({
        name: "OperatorsForm",
        params: {
          option: 1 // option 1 to create
        }
      });
    },
    showUser(item) {
      console.log(item);
      this.$router.push({
        name: "OperatorsForm",
        params: {
          option: 2, // option 2 to show
          userData: item
        }
      });
    },
    editUser(item) {
      console.log(item);
      this.$router.push({
        name: "OperatorsForm",
        params: {
          option: 3, // option 3 to edit
          userData: item
        }
      });
    },
    deleteUser(item) {
      console.log(item);
      console.log("Delete");
    }
  }
};
</script>
