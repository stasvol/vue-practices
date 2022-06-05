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
      <button @click="update" class="btn waves-effect waves-light" type="submit">
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
import {useMeta} from "vue-meta";
import localiseFilter from "@/filters/localiseFilter";

export default {
  name: 'profile',
  // metaInfo() {
  //  return  {title: 'Profile'}
  // },
   setup () {
    useMeta({ title: localiseFilter('ProfileTitle') })

    return {
      v$:  useVuelidate(),
    }
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
    },
    update() {
     this.$forceUpdate()
    }
  },
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
