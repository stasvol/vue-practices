<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="onSubmit">
        <div class="input-field" >
          <select ref="select" v-model="current" >
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

        <div class="input-field">
          <input
              type="text" id="name"
              v-model.trim="title"
              :class="{invalid: v$.title.$dirty && !v$.title.required}"
          >
          <label for="name">Название</label>

          <span
              class="helper-text invalid"
              v-if="v$.title.$error"
          >
            Enter category name
          </span>
        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
              v-model.trim.number="limit"
              :class="{invalid: v$.limit.$dirty && !v$.limit.minValue}"
          >
          <label for="limit">Лимит</label>
          <span
              class="helper-text invalid"
              v-if="v$.limit.$error"
          >
            Minimum value {{v$.limit.minValue.$params.min}}
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
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import {minValue, required} from "@vuelidate/validators";

export default {
  props: {
    categories: {
      type:Array,
      required: true
    }
  },
  data:() => ({
    select: null,
    title: '',
    limit: 1,
    current: null,
    updateCount: 0,
  }),
  mounted() {
   this.select = M.FormSelect.init(this.$refs.select);
    M.updateTextFields();
  },
  unmounted() {
    if (this.select && this.select.unmounted) {
      this.select.unmounted()
    }
  },
  setup () {
    return { v$: useVuelidate() }
  },
  validations() {
    return {

      title: {required},
      limit: {required, minValue: minValue(10)}
    }
  },
  watch: {
    current(catId) {
     const {title, limit} = this.categories.find(category => category.id === catId )
      this.title = title
      this.limit = limit

    }
  },
  created() {
    const {id, title, limit} = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit

  },
  methods: {
   async onSubmit() {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit,
        }
       await this.$store.dispatch('updateCategory', categoryData)
        M.toast({html: ' Category is update!'})
        this.$emit('updated',categoryData)

      }catch (e) {}
    }
  },
}
</script>
<style>
/*.invalid {*/
/*  color: #f10909;*/
/*}*/
</style>
