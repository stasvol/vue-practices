<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid:(v$.email.$dirty && !v$.email.required) || (v$.email.$dirty && !v$.email.email )}"
        >
        <label for="email">Email</label>
        <small
            class="helper-text invalid"
            v-if="v$.email.$dirty && !v$.email.required"
        >Заполните поле</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            class="validate"
        >
        <label for="password">Пароль</label>
        <small class="helper-text invalid">Password</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>
<script>
import useVuelidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
export default {
  name: 'login',
  setup () {
    return { v$: useVuelidate() }
  },
  validations() {
     return {
      email: {required,email},
       password: {required,minLength: minLength(6)},
     }
  },
  data: () => ({
    email: '',
    password: '',
  }),
  methods: {
    onSubmit() {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      console.log("submit")
    }
  },
}
</script>

<!--<template>-->
<!--  <form class="card auth-card">-->
<!--    <div class="card-content">-->
<!--      <span class="card-title">Домашняя бухгалтерия</span>-->
<!--      <div class="input-field">-->
<!--        <input-->
<!--            id="email"-->
<!--            type="text"-->
<!--            class="validate"-->
<!--        >-->
<!--        <label for="email">Email</label>-->
<!--        <small class="helper-text invalid">Email</small>-->
<!--      </div>-->
<!--      <div class="input-field">-->
<!--        <input-->
<!--            id="password"-->
<!--            type="password"-->
<!--            class="validate"-->
<!--        >-->
<!--        <label for="password">Пароль</label>-->
<!--        <small class="helper-text invalid">Password</small>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="card-action">-->
<!--      <div>-->
<!--        <button-->
<!--            class="btn waves-effect waves-light auth-submit"-->
<!--            type="submit"-->
<!--        >-->
<!--          Войти-->
<!--          <i class="material-icons right">send</i>-->
<!--        </button>-->
<!--      </div>-->

<!--      <p class="center">-->
<!--        Нет аккаунта?-->
<!--        <a href="/">Зарегистрироваться</a>-->
<!--      </p>-->
<!--    </div>-->
<!--  </form>-->

<!--</template>-->
