<template>
  <div>
    <div class="page-title">
      <h3>{{ $filters.localiseFilter('ProfileTitle')}}</h3>
    </div>

    <form class="form" @submit.prevent="onSubmit">
      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model.trim="name"
        >
        <label for="description">{{ $filters.localiseFilter('Name')}}</label>
        <span
            v-if="v$.name.$error"
            class="helper-text invalid"
        >
         Name is required. &nbsp; HAS AN ERROR !
        </span>
      </div>
      <div class="switch">
        <label>
          English
          <input
              type="checkbox"
              v-model="isUkLocale"
          >
          <span class="lever"></span>
          Українська
        </label>
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
      <button class="btn waves-effect waves-light" type="submit">
        {{ $filters.localiseFilter('Update')}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import useVuelidate from "@vuelidate/core";
import {required} from "@vuelidate/validators";

export default {
  name: 'profile',
  setup () {
    return { v$: useVuelidate() }
  },
  validations() {
    return {
      name:{required}
    }
  },
  data:() =>({
    name: '',
    isUkLocale: true,
  }),
  mounted() {
    this.name = this.info.name
    this.isUkLocale = this.info.locale === 'uk-UK'
    setTimeout(()=> {
      M.updateTextFields()
    })
  },
  computed: {
   ...mapGetters(['info'])
  },
  methods: {
    ...mapActions(['updateInfo']),
   async onSubmit() {
      if (this.v$.$invalid) {
         this.v$.$touch()
        return
      }
      try {
       await  this.updateInfo({
           name: this.name,
           locale: this.isUkLocale ? 'uk-UK' : 'en-US'
         })
      } catch (e){}
    }
  }
}

</script>
<style>
.invalid {
  color: #f10909;
}
.switch {
  margin-bottom: 2rem;
}
</style>


<!--<template>-->
<!--  <div>-->
<!--    <div class="app-main-layout">-->
<!--&lt;!&ndash;      <nav class="navbar orange lighten-1">&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="nav-wrapper">&ndash;&gt;-->
<!--&lt;!&ndash;          <div class="navbar-left">&ndash;&gt;-->
<!--&lt;!&ndash;            <a href="#">&ndash;&gt;-->
<!--&lt;!&ndash;              <i class="material-icons black-text">dehaze</i>&ndash;&gt;-->
<!--&lt;!&ndash;            </a>&ndash;&gt;-->
<!--&lt;!&ndash;            <span class="black-text">12.12.12</span>&ndash;&gt;-->
<!--&lt;!&ndash;          </div>&ndash;&gt;-->

<!--&lt;!&ndash;          <ul class="right hide-on-small-and-down">&ndash;&gt;-->
<!--&lt;!&ndash;            <li>&ndash;&gt;-->
<!--&lt;!&ndash;              <a&ndash;&gt;-->
<!--&lt;!&ndash;                  class="dropdown-trigger black-text"&ndash;&gt;-->
<!--&lt;!&ndash;                  href="#"&ndash;&gt;-->
<!--&lt;!&ndash;                  data-target="dropdown"&ndash;&gt;-->
<!--&lt;!&ndash;              >&ndash;&gt;-->
<!--&lt;!&ndash;                USER NAME&ndash;&gt;-->
<!--&lt;!&ndash;                <i class="material-icons right">arrow_drop_down</i>&ndash;&gt;-->
<!--&lt;!&ndash;              </a>&ndash;&gt;-->

<!--&lt;!&ndash;              <ul id='dropdown' class='dropdown-content'>&ndash;&gt;-->
<!--&lt;!&ndash;                <li>&ndash;&gt;-->
<!--&lt;!&ndash;                  <a href="#" class="black-text">&ndash;&gt;-->
<!--&lt;!&ndash;                    <i class="material-icons">account_circle</i>Профиль&ndash;&gt;-->
<!--&lt;!&ndash;                  </a>&ndash;&gt;-->
<!--&lt;!&ndash;                </li>&ndash;&gt;-->
<!--&lt;!&ndash;                <li class="divider" tabindex="-1"></li>&ndash;&gt;-->
<!--&lt;!&ndash;                <li>&ndash;&gt;-->
<!--&lt;!&ndash;                  <a href="#" class="black-text">&ndash;&gt;-->
<!--&lt;!&ndash;                    <i class="material-icons">assignment_return</i>Выйти&ndash;&gt;-->
<!--&lt;!&ndash;                  </a>&ndash;&gt;-->
<!--&lt;!&ndash;                </li>&ndash;&gt;-->
<!--&lt;!&ndash;              </ul>&ndash;&gt;-->
<!--&lt;!&ndash;            </li>&ndash;&gt;-->
<!--&lt;!&ndash;          </ul>&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--&lt;!&ndash;      </nav>&ndash;&gt;-->

<!--&lt;!&ndash;      <ul class="sidenav app-sidenav open">&ndash;&gt;-->
<!--&lt;!&ndash;        <li>&ndash;&gt;-->
<!--&lt;!&ndash;          <a href="#" class="waves-effect waves-orange pointer">Счет</a>&ndash;&gt;-->
<!--&lt;!&ndash;        </li>&ndash;&gt;-->
<!--&lt;!&ndash;        <li>&ndash;&gt;-->
<!--&lt;!&ndash;          <a href="#" class="waves-effect waves-orange pointer">История</a>&ndash;&gt;-->
<!--&lt;!&ndash;        </li>&ndash;&gt;-->
<!--&lt;!&ndash;        <li>&ndash;&gt;-->
<!--&lt;!&ndash;          <a href="#" class="waves-effect waves-orange pointer">Планирование</a>&ndash;&gt;-->
<!--&lt;!&ndash;        </li>&ndash;&gt;-->
<!--&lt;!&ndash;        <li>&ndash;&gt;-->
<!--&lt;!&ndash;          <a href="#" class="waves-effect waves-orange pointer">Новая запись</a>&ndash;&gt;-->
<!--&lt;!&ndash;        </li>&ndash;&gt;-->
<!--&lt;!&ndash;        <li>&ndash;&gt;-->
<!--&lt;!&ndash;          <a href="#" class="waves-effect waves-orange pointer">Категории</a>&ndash;&gt;-->
<!--&lt;!&ndash;        </li>&ndash;&gt;-->
<!--&lt;!&ndash;      </ul>&ndash;&gt;-->

<!--      <main class="app-content">-->
<!--        <div class="app-page">-->

<!--          <div>-->
<!--            <div class="page-title">-->
<!--              <h3>Профиль</h3>-->
<!--            </div>-->

<!--            <form class="form">-->
<!--              <div class="input-field">-->
<!--                <input-->
<!--                    id="description"-->
<!--                    type="text"-->
<!--                >-->
<!--                <label for="description">Имя</label>-->
<!--                <span-->
<!--                    class="helper-text invalid">name</span>-->
<!--              </div>-->

<!--              <button class="btn waves-effect waves-light" type="submit">-->
<!--                Обновить-->
<!--                <i class="material-icons right">send</i>-->
<!--              </button>-->
<!--            </form>-->
<!--          </div>-->

<!--        </div>-->
<!--      </main>-->

<!--      <div class="fixed-action-btn">-->
<!--        <a class="btn-floating btn-large blue" href="#">-->
<!--          <i class="large material-icons">add</i>-->
<!--        </a>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->
