<template>
  <div>
    <div class="page-title">
      <h3>{{ $filters.localiseFilter('Currency_Account') }} </h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>
   <Loader  v-if="loading"/>
    <div v-else class="row">

     <HomeBill
         :rates="currency.rates"
     />
     <HomeCurrency
         :rates="currency.rates"
         :date="currency.date"
     />

    </div>
  </div>
</template>

<script>
import HomeBill from '@/components/HomeBill'
import HomeCurrency from '@/components/HomeCurrency'
import Loader from "@/components/AppPractices/Loader";
import {useMeta} from "vue-meta";
import localiseFilter from "@/filters/localiseFilter";
export default {
  name: 'home',
  setup () {
    useMeta({ title: localiseFilter('Sidebar_Bill') })
  },
  data: () => ({
    loading: true,
    currency: null
  }),
 async mounted() {
  this.currency = await this.$store.dispatch('getCurrency')
   this.loading = false
  },
  methods: {
   async refresh() {
      this.loading = true
      this.currency = await this.$store.dispatch('getCurrency')
      this.loading = false
    }
  },
  components: {
    Loader,
    HomeBill, HomeCurrency
  },

}
</script>
