<template>
  <div>
    <div class="page-title">
      <h3>{{$filters.localiseFilter('Sidebar_NewRecord')}}</h3>
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
        <label>{{$filters.localiseFilter('Category_SelectCategory')}}</label>
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
          <span>{{$filters.localiseFilter('Income')}}</span>
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
          <span>{{$filters.localiseFilter('Expenses')}}</span>
        </label>
      </p>

      <div class="input-field">
        <input
            id="amount"
            type="number"
            v-model.number="amount"
            :class="{invalid: v$.amount.$dirty && !v$.amount.minValue}"
        >
        <label for="amount">{{$filters.localiseFilter('Sum')}}</label>
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
        <label for="description">{{$filters.localiseFilter('Description')}}</label>
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
        {{$filters.localiseFilter('Category_Create')}}
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
import {useMeta} from "vue-meta";
import localiseFilter from "@/filters/localiseFilter";
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
    useMeta({ title: localiseFilter('Record_Title') })
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
           M.toast({html: 'Record created.'})
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
