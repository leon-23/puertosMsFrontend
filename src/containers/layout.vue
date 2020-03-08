<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
      class="mb-10 pb-10"
    >
      <v-app-bar-nav-icon @click.stop="toggleDrawer" />
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
          href="/"
          text
           >
          <span class="mr-2">M@n Solutions</span>
        </v-btn>
      </v-toolbar-title>



      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="right"
          justify="center"
        >

            <PuertosTable />

        </v-row>
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; powerby LL 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
  import PuertosTable from '../components/HelloWorld';

  export default {
    name: 'Layout',
    
    components: {
      PuertosTable,
    },    
    data: () => ({
      drawer: false,
    }),
    created () {
      console.log("vuetify:", this.$vuetify);
      //this.$vuetify.theme.dark = true
    },
    methods:{
      toggleDrawer(){
        this.drawer = !this.drawer;
      }
    }
  }

  </script>