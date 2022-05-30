<template>

  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p v-for="cur in currencies"
           :key="cur"
            class="currency-line">
          <span>
            {{setCurrency(cur).toFixed(2)}}&nbsp;{{cur}}
<!--            {{$filters.currencyFilter(parseInt(cur))}}-->
<!--            {{cur.replace('UAH', '₴').replace('USD','$').replace('EUR','€')}}-->
          </span>

        </p>
      </div>
    </div>
  </div>

</template>
<script>

export default {
  name: 'homeBill',
  props: ['rates'],
  data:() => ({
    currencies: ['UAH','USD','EUR'],
    symbols: ['₴','$','€'],
  }),
  computed: {
    base() {
     return this.$store.getters.info.bill / (this.rates['UAH']/this.rates['EUR'])
    },

    // currencyFilter (value, currency='UAH') {
    //   return value
    // },
},
  methods: {
     setCurrency(currency) {
      return  Math.floor(this.base * this.rates[currency])
     }
  },
}
</script>
