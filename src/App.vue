<template>
  <div id="app">
    <metainfo>
      <template v-slot:title="{ content }">{{ content ? `${content} | CRM` : `SITE_NAME` }}</template>
<!--      <template v-slot:title="{ content }">{{ content ? `${content} | SITE_NAME` : `SITE_NAME` }}</template>-->
    </metainfo>
    <component :is="layout" >
      <router-view :key="$route.fullPath"/>
    </component>
  </div>
<!--  <nav>-->
<!--    <router-link to="/">Home</router-link> |-->
<!--    <router-link to="/about">About</router-link>-->
<!--  </nav>-->
</template>
<script>
import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'
import {useMeta} from "vue-meta";

export default {
  setup () {
   useMeta({
      title: '',
      htmlAttrs: { lang: 'en',  amp: true }

    })
  },

  computed: {
    layout() {
      // console.log(this.$route.meta)
      return (this.$route.meta.layout || 'auth') + '-layout'
    }
  },
  components: {
    AuthLayout, MainLayout
  }
}
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
@import "assets/index.css";
</style>
