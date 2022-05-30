<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="loading" />
    <h5 class="center" v-else-if="!records.length">No records! &nbsp; <router-link to="/record">Add record</router-link></h5>

    <section v-else>

    <HistoryTable  :records="records"/>

    </section>
  </div>
</template>
<script>
import HistoryTable from "@/components/HistoryTable";
import Loader from "@/components/AppPractices/Loader";

export default {
  name: 'history',
  data:() => ({
    loading: true,
    records: [],
    categories: [],
  }),
  async mounted() {
    // this.records = await this.$store.dispatch('fetchRecords')
    this.categories = await this.$store.dispatch('fetchCategories')
    const records = await this.$store.dispatch('fetchRecords')
     this.records = records.map(record => {
        return {
          ...record,
          categoryName: this.categories.find(category=> category.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Дохід' : 'Розхід',
        }

     })
    this.loading = false
  },
  components: {
    Loader,
   HistoryTable
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
