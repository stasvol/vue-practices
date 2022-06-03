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

export default {
  name: 'history',
  mixins: [paginationMixin],
  extends: Pie,
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
          typeText: record.type === 'income' ? 'Дохід' : 'Розхід',
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



<!--<template>-->
<!--  <div>-->
<!--    <div class="app-main-layout">-->
<!--&lt;!&ndash;      <nav class="navbar orange lighten-1">&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="nav-wrapper">&ndash;&gt;-->
<!--&lt;!&ndash;          <div class="navbar-left">&ndash;&gt;-->
<!--&lt;!&ndash;            <a href="#">&ndash;&gt;-->
<!--&lt;!&ndash;              <i class="material-icons black-text">dehaze</i>&ndash;&gt;-->
<!--&lt;!&ndash;            </a>&ndash;&gt;-->
<!--&lt;!&ndash;            <span class="black-text">12.12.12</span>&ndash;&gt;-->
<!--&lt;!&ndash;          </div>&ndash;&gt;-->

<!--&lt;!&ndash;          <ul class="right hide-on-small-and-down">&ndash;&gt;-->
<!--&lt;!&ndash;            <li>&ndash;&gt;-->
<!--&lt;!&ndash;              <a&ndash;&gt;-->
<!--&lt;!&ndash;                  class="dropdown-trigger black-text"&ndash;&gt;-->
<!--&lt;!&ndash;                  href="#"&ndash;&gt;-->
<!--&lt;!&ndash;                  data-target="dropdown"&ndash;&gt;-->
<!--&lt;!&ndash;              >&ndash;&gt;-->
<!--&lt;!&ndash;                USER NAME&ndash;&gt;-->
<!--&lt;!&ndash;                <i class="material-icons right">arrow_drop_down</i>&ndash;&gt;-->
<!--&lt;!&ndash;              </a>&ndash;&gt;-->

<!--&lt;!&ndash;              <ul id='dropdown' class='dropdown-content'>&ndash;&gt;-->
<!--&lt;!&ndash;                <li>&ndash;&gt;-->
<!--&lt;!&ndash;                  <a href="#" class="black-text">&ndash;&gt;-->
<!--&lt;!&ndash;                    <i class="material-icons">account_circle</i>Профиль&ndash;&gt;-->
<!--&lt;!&ndash;                  </a>&ndash;&gt;-->
<!--&lt;!&ndash;                </li>&ndash;&gt;-->
<!--&lt;!&ndash;                <li class="divider" tabindex="-1"></li>&ndash;&gt;-->
<!--&lt;!&ndash;                <li>&ndash;&gt;-->
<!--&lt;!&ndash;                  <a href="#" class="black-text">&ndash;&gt;-->
<!--&lt;!&ndash;                    <i class="material-icons">assignment_return</i>Выйти&ndash;&gt;-->
<!--&lt;!&ndash;                  </a>&ndash;&gt;-->
<!--&lt;!&ndash;                </li>&ndash;&gt;-->
<!--&lt;!&ndash;              </ul>&ndash;&gt;-->
<!--&lt;!&ndash;            </li>&ndash;&gt;-->
<!--&lt;!&ndash;          </ul>&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--&lt;!&ndash;      </nav>&ndash;&gt;-->

<!--&lt;!&ndash;      <ul class="sidenav app-sidenav open">&ndash;&gt;-->
<!--&lt;!&ndash;        <li>&ndash;&gt;-->
<!--&lt;!&ndash;          <a href="#" class="waves-effect waves-orange pointer">Счет</a>&ndash;&gt;-->
<!--&lt;!&ndash;        </li>&ndash;&gt;-->
<!--&lt;!&ndash;        <li>&ndash;&gt;-->
<!--&lt;!&ndash;          <a href="#" class="waves-effect waves-orange pointer">История</a>&ndash;&gt;-->
<!--&lt;!&ndash;        </li>&ndash;&gt;-->
<!--&lt;!&ndash;        <li>&ndash;&gt;-->
<!--&lt;!&ndash;          <a href="#" class="waves-effect waves-orange pointer">Планирование</a>&ndash;&gt;-->
<!--&lt;!&ndash;        </li>&ndash;&gt;-->
<!--&lt;!&ndash;        <li>&ndash;&gt;-->
<!--&lt;!&ndash;          <a href="#" class="waves-effect waves-orange pointer">Новая запись</a>&ndash;&gt;-->
<!--&lt;!&ndash;        </li>&ndash;&gt;-->
<!--&lt;!&ndash;        <li>&ndash;&gt;-->
<!--&lt;!&ndash;          <a href="#" class="waves-effect waves-orange pointer">Категории</a>&ndash;&gt;-->
<!--&lt;!&ndash;        </li>&ndash;&gt;-->
<!--&lt;!&ndash;      </ul>&ndash;&gt;-->

<!--      <main class="app-content">-->
<!--        <div class="app-page">-->

<!--          <div>-->
<!--            <div class="page-title">-->
<!--              <h3>История записей</h3>-->
<!--            </div>-->

<!--            <div class="history-chart">-->
<!--              <canvas></canvas>-->
<!--            </div>-->

<!--            <section>-->
<!--              <table>-->
<!--                <thead>-->
<!--                <tr>-->
<!--                  <th>#</th>-->
<!--                  <th>Сумма</th>-->
<!--                  <th>Дата</th>-->
<!--                  <th>Категория</th>-->
<!--                  <th>Тип</th>-->
<!--                  <th>Открыть</th>-->
<!--                </tr>-->
<!--                </thead>-->

<!--                <tbody>-->
<!--                <tr>-->
<!--                  <td>1</td>-->
<!--                  <td>1212</td>-->
<!--                  <td>12.12.32</td>-->
<!--                  <td>name</td>-->
<!--                  <td>-->
<!--                    <span class="white-text badge red">Расход</span>-->
<!--                  </td>-->
<!--                  <td>-->
<!--                    <button class="btn-small btn">-->
<!--                      <i class="material-icons">open_in_new</i>-->
<!--                    </button>-->
<!--                  </td>-->
<!--                </tr>-->
<!--                </tbody>-->
<!--              </table>-->
<!--            </section>-->
<!--          </div>-->

<!--        </div>-->
<!--      </main>-->

<!--      <div class="fixed-action-btn">-->
<!--        <a class="btn-floating btn-large blue" href="#">-->
<!--          <i class="large material-icons">add</i>-->
<!--        </a>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->
