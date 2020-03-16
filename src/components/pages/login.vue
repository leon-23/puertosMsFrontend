<template>
  <v-container
    id="login"
    class="fill-height"
    tag="section"
  >
    <v-row justify="center">
      <v-slide-y-transition appear>
        <MaterialCard
          color="primary"
          light
          max-width="100%"
          width="400"
          class="px-5 py-3"
        >
          <template v-slot:heading>
            <div class="text-center">
              <h1 class="display-2 font-weight-bold mb-2">
                Acceso
              </h1>
            </div>
          </template>

          <v-card-text class="text-center">
            <v-text-field
              v-model="form.username"
              color="secondary"
              label="Username..."
              prepend-icon="mdi-account"
              :rules="[rules.required]"
            />

            <v-text-field
              v-model="form.password"
              :append-icon="show1 ? 'mdi-eye' : ' mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              prepend-icon="mdi-lock-outline"
              hint="At least 4 characters"
              counter
              @click:append="show1 = !show1"
            />

            <v-btn
              large
              color="primary"
              class="font-weight-bold"
              @click="submit"
              :disabled="disabled()"
            >
              Iniciar Sesión!
            </v-btn>
            <br>

            <v-divider class="mt-5"/>
            
            <v-row>
              <v-col
                cols="12"
                md="12"
                class="text-left"
              >
                <v-list dense>
                  <v-list-item link @click="goTo('Register')">
                    <v-list-item-action>
                      <v-icon> mdi-account-multiple-plus</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>Crear Cuenta</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item link >
                    <v-list-item-action>
                      <v-icon>mdi-rotate-right</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>Recuperar Contraseña</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-card-text>
        </MaterialCard>
      </v-slide-y-transition>
    </v-row>
  </v-container>
</template>

<script>
import userService from '../../services/userService';
import storageService from '../../services/storageService';

  const defaultForm = {
    username: '',
    password: '',
  }
  export default {
    name: 'Login',

    components: {
      MaterialCard: () => import('../MaterialCard'),
    },

    data: () => ({
      show1: false,
      form: {... defaultForm },
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 4 || 'Min  characters',
        emailMatch: () => ('The email and password you entered don\'t match'),
      },

    }),
    created(){
      const user = storageService.getUser();
      const token = storageService.getToken();

      if(user && token)
        this.$router.push({name: 'Puertos'});
    },
    methods: {
      async submit () {

        try{
          const response = await userService.login(this.form)
          const { user, token } = response.data.users

          storageService.setAll(user, token)
          this.$router.push({ name: 'Puertos' })

        }catch(error){
          console.log("error! :", error)
          this.errorMsj(error.response.data.message)
        }
      },
      goTo(address){
        this.$router.push({name: address})
      },
      disabled(){
        if(!this.form.username)
          return true
        if(this.form.password.length < 4)
          return true

        return false
      },
      errorMsj(error){
        this.$swal.fire({
          position: 'center',
          icon: 'error',
          title: error,
          showConfirmButton: false,
          timer: 1500
        })
      },
    },

  }
</script>