<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>Сумма</th>
      <th>Дата</th>
      <th>Категория</th>
      <th>Тип</th>
      <th>Открыть</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(record, idx) in records" :key="record.id">
      <td>{{idx + 1}}</td>
      <td>{{$filters.currencyFilter(record.amount )}}</td>
      <td>{{ $filters.dateFilter(record.data) }} </td>
      <td>{{ record.categoryName }}</td>
      <td>
        <span
            :class="[record.typeClass]"
            class="white-text badge "
        >
          {{ record.typeText }}
        </span>
      </td>
      <td>
        <button class="btn-small btn tooltipped" @click="$router.push('/detail/'+ records.id)">
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  async mounted() {
    document.addEventListener('DOMContentLoaded',setTimeout( async function () {
      const el = await document.querySelectorAll('.tooltipped');
      const instances = await M.Tooltip.init(el,{html: 'See record', position: 'top'})
      // const instances = M.Tooltip.getInstance(el)
      // instances.open()

    },50))
  },
 props: {
   records: {
     type: Array,
     required: true
   }
 }
}
</script>
