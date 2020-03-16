<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      dark
    >
      <v-list dense>
        <v-list-item link @click="goTo('Puertos')">
          <v-list-item-action>
            <v-icon>mdi-wifi</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Puertos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="logout">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Salir</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
      class="mb-10 pb-10 primary"
    >
      <v-app-bar-nav-icon
       @click.stop="toggleDrawer" 
       class="white--text"/>
      <v-toolbar-title>
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="../assets/logo.jpg"
          transition="scale-transition"
          height="100"
          max-width="60"
        />
      </v-toolbar-title>
      
      <v-toolbar-title>
        <v-btn
          @click="goTo('Puertos')"
          text
           >
          <span class="mr-2 white--text">M@n Solutions</span>
        </v-btn>
      </v-toolbar-title>
     
      <v-spacer></v-spacer>

       <v-toolbar-title>
          <span class="mr-2 white--text"> {{ user.username }} </span>
      </v-toolbar-title>

      <v-btn icon class="white--text" @click="logout">
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>

   
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >

          <router-view />

        </v-row>
      </v-container>
    </v-content>

    <v-footer app align="center">
      <span>&copy; powerby LL 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
  import storageService from '../services/storageService';

  export default {
    name: 'Layout',    
    data: () => ({
      drawer: false,
      user : {},
    }),   
    created(){
      const user = storageService.getUser();
      const token = storageService.getToken();

      !user || !token
      ? this.$router.push({name: 'Login'})
      : this.user = user
    },
    mounted () {
    },
    methods:{
      toggleDrawer(){
        this.drawer = !this.drawer;
      },
      logout(){
        storageService.clear();
        this.goTo('Login')
      },
      goTo(address){
        this.$router.push({name: address})
      }
    },
}
</script>

<style>
    i.mdi-menu {
      font-color : white;
    }
</style>