<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">{{$filters.localiseFilter('Home_Bookkeeping_Title')}}</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            @blur="v$.email.$touch">

        <!--            :class="{$error:(v$.email.$dirty && !v$.email.required) || (v$.email.$dirty && !v$.email.email )}"-->
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
            v-if="v$.password.$error"
        >
          Password field is required and length {{password.length}} - should be: {{v$.password.minLength.$params.min}}.&nbsp; HAS AN ERROR !
        </small>
<!--        <small-->
<!--           class="helper-text invalid"-->
<!--           v-else-if="v$.password.$error && !v$.password.minLength">-->
<!--           Password field is required, minLength -->
<!--          {{v$.password.minLength.$params.min}} and {{password.length}} -  has an error.-->
<!--        </small>-->
      </div>
      <div>
        <i class="invalid" v-for="error of v$.$errors"
            :key="error.$uid"
        >
          <strong>{{ error.$validator }}</strong>
          <small> on property</small>
          <strong>{{ error.$property }}</strong>
          <small> says:</small>
          <strong>{{ error.$message }}</strong>
        </i>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"

        >
          {{$filters.localiseFilter('Login_Title')}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{$filters.localiseFilter('No_Account')}}?
        <router-link to="/register">{{$filters.localiseFilter('Register_Title')}}</router-link>
      </p>
    </div>
  </form>
</template>
<script>

import useVuelidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import messages from "@/utils/messages";
import {useMeta} from "vue-meta";
import localiseFilter from "@/filters/localiseFilter";
import mapGetters from "vuex";
export default {
  name: 'login',

  data: () => ({
    email: '',
    password: '',
  }),

  setup() {
    useMeta({title: localiseFilter('Login_Title')})
    return {v$: useVuelidate()}
  },

  validations() {
    return {
      email: {required, email},
      password: {required, minLength: minLength(6)},
    }
  },

  mounted() {
    if (messages[this.$route.query.message]) {
      M.toast({html: messages[this.$route.query.message]})
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
        password: this.password
      }
      try {
        await this.$store.dispatch('login', formData)
        await this.$store.dispatch('getInfo')
        console.log(this.$store.getters.info.locale)
        await this.$router.push('/')
      } catch (e) {}

    },
  },
}
</script>
<style>
/*@import '../assets/index.css';*/
.invalid {
  color: #f10909;
}
</style>
