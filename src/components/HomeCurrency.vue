<template>

  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{ $filters.localiseFilter('Currency_ExchangeRates') }} </span>
        </div>
        <table>
          <thead>
          <tr>
            <th>{{ $filters.localiseFilter('Currency_Currency') }} </th>
            <th>{{ $filters.localiseFilter('Currency_Well') }} </th>
            <th>{{ $filters.localiseFilter('Currency_Date') }} </th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="cur in currencies" :key="cur">
            <td>{{ cur }}</td>
            <td>{{ rates[cur].toFixed(3) }}</td>
            <td>{{date}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  name: 'homeCurrency',
  props: ['rates', 'date'],
  data:() => ({
    currencies: ['UAH','USD','EUR']
  }),

}
</script>
