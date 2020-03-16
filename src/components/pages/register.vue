<template>
  <v-container
    id="register"
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
                Registro
              </h1>
            </div>
          </template>

          <v-card-text class="text-center">
            <v-text-field
              v-model="form.email"
              color="secondary"
              label="Email..."
              prepend-icon="mdi-email"
              :rules="[rules.required, rules.verifyEmail]"
              @blur="findByEmail"
            />
    
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

            <v-text-field
              v-model="form.password2"
              :append-icon="show2 ? 'mdi-eye' : ' mdi-eye-off'"
              :rules="[rules.required, rules.min, rules.pass(form.password, form.password2)]"
              :type="show2 ? 'text' : 'password'"
              name="input-10-1"
              label="Repeat Password"
              prepend-icon="mdi-lock-outline"
              hint="At least 4 characters"
              counter
              @click:append="show2 = !show2"
            />

            <v-btn
              large
              color="primary"
              class="font-weight-bold mb-5"
              @click="submit"
              :disabled="valid()"
            >
              Crear Cuenta!
            </v-btn>
            <br>

            <v-divider />
            
            <v-row>
              <v-col
                cols="12"
                md="10"
                class="text-left"
              >
              <v-list dense>
                <v-list-item link @click="goTo('Login')">
                  <v-list-item-action>
                      <v-icon> mdi-login</v-icon>
                  </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title>¿posee una cuenta?</v-list-item-title>
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
    password2: '',
    email: '',
  }

  export default {
    name: 'Register',

    components: {
      MaterialCard: () => import('../MaterialCard'),
    },

    data: () => ({
      show1: false,
      show2: false,
      form: {... defaultForm },
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length > 4 || 'Min  characters',
        pass: (v,v2) => v === v2 || 'The password  don\'t match',
        emailMatch: () => ('The email and password you entered don\'t match'),
        verifyEmail: true,
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
          //const response =
           await userService.register({...this.form })
          //const data = response.data.users
          
          this.$router.push({ name: 'Login' })

        }catch(error){
          console.log(error.response.data.message.errors);
          
          const msjs = error.response.data.message.errors;
          let msj = ""
          
          if(msjs.email) 
           msj = 'EL email ya ha sido registrado! \n'
          if(msjs.username)
            msj += 'EL username ya esta siendo utilizado';
          if(!msj)
            msj = error.toString()

          this.errorMsj(msj)
        }
      },
      async findByEmail(){
        const email = this.form.email
        if(email){
          try{
            const response = await userService.findByEmail(email)
            console.log(response.data.users)            

            response.data.users
            ? this.rules.verifyEmail = 'El email ya fue registrado'
            : this.rules.verifyEmail = true
            
          }catch(error){
            console.log(error)
          }
        }
      },
      goTo(address){
        this.$router.push({name: address})
      },
      valid(){
        if(!this.form.email)
          return true
        if(!this.form.username)
          return true
        if(!this.form.password)
          return true
        if(!this.form.password2)
          return true
        if(this.form.password !== this.form.password2)
          return true
        else
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