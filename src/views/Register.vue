<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">{{$filters.localiseFilter('Home_Bookkeeping_Title')}}</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
        >
        <label for="email">Email</label>
        <small
            class="helper-text invalid"
            v-if="v$.email.$error"
        >
          Email field required. &nbsp; HAS AN ERROR !
        </small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            class="validate"
            v-model.trim="password"
        >
        <label for="password">Password</label>
        <small
            class="helper-text invalid"
            v-if="v$.password.$error">
          Password field is required and length {{password.length}} - should be: {{v$.password.minLength.$params.min}}.&nbsp; HAS AN ERROR !
        </small>
      </div>
      <div class="input-field">
        <input
            id="name"
            type="text"
            class="validate"
            v-model.trim="name"
        >
        <label for="name">{{$filters.localiseFilter('Name')}}</label>
        <small
            class="helper-text invalid"
            v-if="v$.name.$error"
        >
          Field name required. &nbsp; HAS AN ERROR !
        </small>
      </div>
      <p>
        <label>
          <input
              type="checkbox"
              v-model.trim="agree"
          />
          <span>{{$filters.localiseFilter('I_agree_with_the_rules')}}</span>

        </label>
          <i
              class="helper-text invalid"
              v-if="v$.agree.$error"
          >
            Field required. &nbsp; HAS AN ERROR !
          </i>
      </p>
    </div>
    <div>
      <i
          class="invalid"
          v-for="error of v$.$errors"
          :key="error.$uid"
      >
        <strong>{{ error.$validator }}</strong>
        <small> on property</small>
        <strong>{{ error.$property }}</strong>
        <small> says:</small>
        <strong>{{ error.$message }}</strong>
      </i>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          {{$filters.localiseFilter('Register_Title')}}
          <i class="material-icons right">send</i>
        </button>
      </div>
      <p class="center">
        {{$filters.localiseFilter('Already_have_an_account')}}?
        <router-link to="/login">{{$filters.localiseFilter('Login_Title')}}!</router-link>
      </p>
    </div>
  </form>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import {email, minLength, required} from "@vuelidate/validators";
import {useMeta} from "vue-meta";
import localiseFilter from "@/filters/localiseFilter";

export default {
  name: 'register',
  setup () {
    useMeta({ title: localiseFilter('Register_Title') })
    return { v$: useVuelidate() }
  },
  data:() => ({
    email: '',
    password: '',
    name: '',
    // ch: null,
    agree: false
  }),
  validations() {
    return {
      email: {email,required},
      password: {required, minLength: minLength(6)},
      name: {required, minLength: minLength(3)},
      // ch: {required},
      agree: {required, ch:value => value  }
    }
    },
  methods: {
   async onSubmit() {
     if (this.v$.$invalid) {
       this.v$.$touch()
       return
     }
     const formData = {
       email: this.email,
       password: this.password,
       name: this.name,
       // ch: this.ch,
       // agree: this.agree
     }
     try {
       await this.$store.dispatch('register',formData)
       await this.$router.push('/')
     }catch (e) {
       throw e
     }
   }
  },
}
</script>
<style>
.invalid {
  color: #f10909;
}
</style>
