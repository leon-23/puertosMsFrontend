import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const initialState = () => {
  return {
    hidden: false,
    loading: true,
    headers: [
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

    puerto:{
      id: 0,
      nombre: '',
      puerto:  '',
      dominio: '',
      servidor: '',
    },

    items: [],
    search: undefined
  }
 };

const findPuerto = (array, id)=>{
   return array.findIndex( item => item.puerto._id === id );
}

const store = new Vuex.Store({
  state: { ...initialState() },

  mutations: {
     
     setItems(state, items){
       state.items = items;
     },
     setLoading(state){
       state.loading = !state.loading
     },
     setPuerto(state, puerto){
       state.puerto = {...puerto };
     },
     resetPuerto(state){
       state.puerto = {...initialState().puerto }
     },
     addPuerto(state, puerto){
       const items = state.items.slice();
       items.push({  puerto });

       state.items = items;
     },
     updatePuerto(state, puerto){
       const idx = findPuerto(state.items, puerto._id);

       if(idx >= 0){
         const items = state.items.slice();
         items[idx] = { puerto }
         state.items = items
       }            
     },
     deletePuerto(state, id){  
       const idx = findPuerto(state.items, id);

       if(idx >= 0)
         state.items.splice(idx, 1);
     },

     
  },
});

export default store;