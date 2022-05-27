<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <Loader v-if="loading" />

    <h5 class="center" v-else-if="!categories.length">
      Has no categories.
      <router-link to="/categories">
        Add a new category
      </router-link>
    </h5>

    <form class="form" v-else @submit.prevent="onSubmit">
      <div class="input-field" >

        <select ref="select" v-model="category">
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.title }}
          </option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
            id="amount"
            type="number"
            v-model.number="amount"
            :class="{invalid: v$.amount.$dirty && !v$.amount.minValue}"
        >
        <label for="amount">Сумма</label>
        <span
            class="helper-text invalid"
            v-if="v$.amount.$error"
        >
          Minimum value {{v$.amount.minValue.$params.min}}
        </span>
      </div>

      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="description"
            :class="{invalid: v$.description.$dirty && !v$.description.required}"
        >
        <label for="description">Описание</label>
        <span
            class="helper-text invalid"
            v-if="v$.description.$error"
        >
           Field is required.
        </span>
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
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>
<script>
import Loader from "@/components/AppPractices/Loader";
import useVuelidate from "@vuelidate/core";
import {minValue, required} from "@vuelidate/validators";
import {mapGetters} from "vuex";
export default {
  name: 'record',
  components: {Loader},

  data: () => ({
    loading: true,
    categories: [],
    select: null,
    category: null,
    type: 'outcome',
    amount: 1,
    description: '',
  }),

  setup () {
    return { v$: useVuelidate() }
  },
  validations() {
    return {
      amount: {required, minValue: minValue(10)},
      description: {required}
    }
  },

  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
    if (this.categories.length) {
      this.category = this.categories[0].id
    }
    setTimeout(()=>{
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    },0)

  },

  unmounted() {
    if (this.select && this.select.unmounted) {
      this.select.unmounted()
    }
  },

  computed: {
    ...mapGetters(['info']),

    canCreateRecord() {
      if (this.type === 'income') {
        return true
      }
      return this.info.bill >= this.amount
    }
  },

  methods: {
   async onSubmit() {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }

       if (this.canCreateRecord) {
         try {
           await this.$store.dispatch('createRecord', {
             categoryId: this.category,
             amount: this.amount,
             description: this.description,
             type: this.type,
             data: new Date().toJSON()
           })

           const bill = this.type === 'income'
             ? this.info.bill + this.amount
             : this.info.bill - this.amount
           await this.$store.dispatch('updateInfo', {bill})
           M.toast({html: `Record created. `})
           this.v$.$reset()
           this.amount = 1
           this.description = ''
         } catch (e) {}
       } else {
         M.toast({html: `Not enough money (${this.amount - this.info.bill})`})
       }
   }
  }
}
</script>
<style>
.invalid {
  color: #f10909;
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
<!--              <h3>Новая запись</h3>-->
<!--            </div>-->

<!--            <form class="form">-->
<!--              <div class="input-field" >-->
<!--                <select>-->
<!--                  <option-->
<!--                  >name cat</option>-->
<!--                </select>-->
<!--                <label>Выберите категорию</label>-->
<!--              </div>-->

<!--              <p>-->
<!--                <label>-->
<!--                  <input-->
<!--                      class="with-gap"-->
<!--                      name="type"-->
<!--                      type="radio"-->
<!--                      value="income"-->
<!--                  />-->
<!--                  <span>Доход</span>-->
<!--                </label>-->
<!--              </p>-->

<!--              <p>-->
<!--                <label>-->
<!--                  <input-->
<!--                      class="with-gap"-->
<!--                      name="type"-->
<!--                      type="radio"-->
<!--                      value="outcome"-->
<!--                  />-->
<!--                  <span>Расход</span>-->
<!--                </label>-->
<!--              </p>-->

<!--              <div class="input-field">-->
<!--                <input-->
<!--                    id="amount"-->
<!--                    type="number"-->
<!--                >-->
<!--                <label for="amount">Сумма</label>-->
<!--                <span class="helper-text invalid">amount пароль</span>-->
<!--              </div>-->

<!--              <div class="input-field">-->
<!--                <input-->
<!--                    id="description"-->
<!--                    type="text"-->
<!--                >-->
<!--                <label for="description">Описание</label>-->
<!--                <span-->
<!--                    class="helper-text invalid">description пароль</span>-->
<!--              </div>-->

<!--              <button class="btn waves-effect waves-light" type="submit">-->
<!--                Создать-->
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
