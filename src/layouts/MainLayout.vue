<template>
  <div>
    <Loader  v-if="loading"/>
  <div class="app-main-layout" v-else>

    <Navbar @click="isOpen = !isOpen" :key="locale"  />

    <Sidebar  :key="locale" :modelValue="isOpen"
             @update:modelValue="isOpen = $event" />

    <main class="app-content" :class="{full: !isOpen}" >
<!--          :class="{full: !isOpen}">-->

      <div class="app-page">

        <router-view />
      </div>
    </main>
    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
  </div>
</template>
<script>
import Navbar from '@/components/AppPractices/Navbar'
import Sidebar from '@/components/AppPractices/Sidebar'
import Loader from "@/components/AppPractices/Loader";
import messages from "@/utils/messages";
import {useMeta} from "vue-meta";
import mapGetters from "vuex";
export default {
  name: 'main-layout',

  data:() => ({
    isOpen: true,
    loading: true
  }),

async mounted() {
   if (!Object.keys(this.$store.getters.info).length) {
    await this.$store.dispatch('getInfo')
   }
   this.loading = false
 },

  computed: {
    error() {
      return this.$store.getters.error
    },

    locale() {
      return this.$store.getters.info.locale

    }
  },

  watch:{
    error(fbError) {
      // this.$error(messages[fbError.code] || 'Error! User not found.')
      M.toast({html: `[Error]: ${messages[fbError.code] || 'Error! User not found.'}` })
    }
  },

  components: {
    Loader,
    Navbar,Sidebar
  }
}
</script>
