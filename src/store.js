const initialState = () => {
  return {
    puerto: {
      _id: 0,
      nombre: "",
      puerto: "",
      dominio: "",
      servidor: "",
    },
    puertos: [
      {
        _id: 1,
        nombre: "Angular",
        puerto: "4200",
        dominio: "alguno",
        servidor: "apache",
      },
      {
        _id: 2,
        nombre: "Node",
        puerto: "3000",
        dominio: "alguno",
        servidor: "apache",
      },
      {
        _id: 3,
        nombre: "Java",
        puerto: "8080",
        dominio: "alguno",
        servidor: "tomcat",
      },
    ]
  };
};

export default new Vuex.Store({
  state: { ...initialState() },

  mutations: {
 
  }
});
