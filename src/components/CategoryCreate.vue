<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ $filters.localiseFilter('Category_Create') }}</h4>
      </div>

      <form @submit.prevent ="onSubmit">
        <div class="input-field">
          <input
              v-model.trim="title"
              :class="{invalid: v$.title.$dirty && !v$.title.required}"
              id="name"
              type="text"
          >
          <label for="name">{{ $filters.localiseFilter('Category_Name') }}</label>
          <span
              v-if="v$.title.$error"
              class="helper-text invalid"
          >
            Enter category name
          </span>
        </div>

        <div class="input-field">
          <input
              v-model.trim.number="limit"
              :class="{invalid: v$.limit.$dirty && !v$.limit.minValue}"
              id="limit"
              type="number"
          >
          <label for="limit">{{ $filters.localiseFilter('Category_Limit') }}</label>
          <span
              v-if="v$.limit.$error"
              class="helper-text invalid"
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
          {{ $filters.localiseFilter('Category_Create') }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import {required, minValue} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import messages from "@/utils/messages";

export default {
  data:() => ({
    title: '',
    limit: 1
  }),
  setup () {
    return { v$: useVuelidate() }
  },
  validations() {
    return {
      title: {required},
      limit: {required, minValue: minValue(10)}
    }
  },
  methods: {
   async onSubmit() {
      if (this.v$.$invalid ){
        this.v$.$touch()
        return
      }
      try {
       const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit
        })
        this.title = '',
        this.limit = 1
        this.v$.$reset()
        M.toast({html: 'Created a new category!'})
        this.$emit('created',category)
        // this.$message('Created a new category!')
      }catch (e) {}
   }
  },
  mounted() {
    M.updateTextFields()
  },
}
</script>
<style>
/*@import '../assets/index.css';*/
.invalid {
  color: #f10909;
}
</style>
