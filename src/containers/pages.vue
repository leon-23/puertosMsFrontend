<template>
  <v-app id="inspire">
    <v-content>
      <v-img
        :class="{
          'v-image--sm': this.$vuetify.breakpoint.smAndDown,
          'v-image--md': this.$vuetify.breakpoint.mdAndDown
        }"
        src="../assets/fondoLogin.jpg"
        gradient="to top, rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)"
        min-height="100%"
      >
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
      </v-img>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
  }
</script>