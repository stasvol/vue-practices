<template>
  <div>
    <div class="page-title">
      <h3>{{$filters.localiseFilter('History_RecordingHistory')}}</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>

    </div>

    <Loader v-if="loading" />
    <h5 class="center" v-else-if="!records.length">No records! &nbsp; <router-link to="/record">Add record</router-link></h5>

    <section v-else>

    <HistoryTable  :records="items" />
<!--        :records="records"-->


      <Paginate
          v-model="page"
          :page-count="pageCount"
          :click-handler="handleChangePages"
          :prev-text="'Prev'"
          :next-text="'Next'"
          :container-class="'pagination'"
          :page-class="'waves-effect'"
      />


<!--      <Paginate-->
<!--          :page-count="20"-->
<!--          :page-range="3"-->
<!--          :margin-pages="2"-->
<!--          :click-handler="handleChangePages"-->
<!--          :prev-text="'Prev'"-->
<!--          :next-text="'Next'"-->
<!--          :container-class="'pagination'"-->
<!--          :page-class="'page-item'"-->
<!--      />-->

    </section>
  </div>
</template>
<script>
import HistoryTable from "@/components/HistoryTable";
import Loader from "@/components/AppPractices/Loader";
import paginationMixin from "@/mixins/paginationMixin";
import {Pie} from "vue-chartjs";
import {Chart} from "chart.js";
import localiseFilter from '@/filters/localiseFilter'
import {useMeta} from "vue-meta";

export default {
  name: 'history',
  mixins: [paginationMixin],
  extends: Pie,

  setup () {
    useMeta({ title: localiseFilter('Sidebar_History') })
  },
  data:() => ({
    loading: true,
    records: [],
    categories: [],
  }),

  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    // const records = await this.$store.dispatch('fetchRecords')
    // this.setupPagination(this.records.map(record => {
    //     return {
    //       ...record,
    //       categoryName: categories.find(category => category.id === record.categoryId).title,
    //       typeClass: record.type === 'income' ? 'green' : 'red',
    //       typeText: record.type === 'income' ? 'Дохід' : 'Розхід',
    //     }
    //
    //  }))
    this.setup(categories)
    this.loading = false
  },

  methods:{
    setup(categories) {
      this.setupPagination(this.records.map(record => {
        return {
          ...record,
          categoryName: categories.find(category => category.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? localiseFilter('Income') : localiseFilter('Expenses'),
        }
      }))
      this.renderChart({
        labels: categories.map(category => category.title),
        datasets: [{
          label: 'Costs by category',
          data: categories.map(category => {
            return this.records.reduce((total, record) => {
              if (record.categoryId === category.id && record.type === 'outcome') {
                total += +record.amount
              }
              return total
            }, 0)
          }),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      })


      // this.renderChart({
      //   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      //       datasets: [{
      //     label: '# of Votes',
      //     data: [12, 19, 3, 5, 2, 3],
      //     backgroundColor: [
      //       'rgba(255, 99, 132, 0.2)',
      //       'rgba(54, 162, 235, 0.2)',
      //       'rgba(255, 206, 86, 0.2)',
      //       'rgba(75, 192, 192, 0.2)',
      //       'rgba(153, 102, 255, 0.2)',
      //       'rgba(255, 159, 64, 0.2)'
      //     ],
      //     borderColor: [
      //       'rgba(255, 99, 132, 1)',
      //       'rgba(54, 162, 235, 1)',
      //       'rgba(255, 206, 86, 1)',
      //       'rgba(75, 192, 192, 1)',
      //       'rgba(153, 102, 255, 1)',
      //       'rgba(255, 159, 64, 1)'
      //     ],
      //     borderWidth: 1
      //   }]
      // })
    },
    // handleChangePages() {},
  },
  components: {
    Loader,
   HistoryTable,
  },
}
</script>
