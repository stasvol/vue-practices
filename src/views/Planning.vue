<template>

  <div>
    <div class="page-title">
      <!--      <a class="btn tooltipped" data-position="top" data-tooltip="I am a tooltip">Hover me!</a>-->
      <h3>Планирование</h3>

      <h4>
        <!--            {{ info.bill}} {{money}}-->
        {{ $filters.currencyFilter(info.bill) }}

      </h4>
    </div>
    <Loader v-if="loading"/>
    <h5 class="center" v-else-if="!categories.length">
      Has no categories.
      <router-link to="/categories">
        Add a new category
      </router-link>
    </h5>

    <section v-else>
      <div v-for="category in categories" :key="category.id">
        <div class="content">
          <div>
            <strong>{{ category.title }} : &nbsp;</strong>
            <!--          {{ category.spend }}{{money}}-->
            {{ $filters.currencyFilter(category.spend) }}
            из
            <!--          {{ category.limit }}{{money}}-->
            {{ $filters.currencyFilter(category.limit) }}
          </div>
          <div>
            <Popper class="popper">
              <div class="small">
                <button class="spinner-green">remains</button>
              </div>

              <template #content>
                <div class="popper">{{ category.tooltip }}</div>
              </template>
            </Popper>
          </div>
        </div>

        <!--        <div-->
        <!--            class="tooltipped"-->
        <!--            data-position="top"-->
        <!--            data-tooltip="This is some extra information in a tooltip placement top">-->
        <!--        > -->

        <div class="progress tooltipped" v-tooltip="category.tooltip">

          <div
              class="determinate"
              :class="[category.progressColor]"
              :style="{width: category.progressPercent + '%'}"
          >

          </div>

        </div>

        <!--        </div>-->
      </div>
      <Popper class="popper">
        <button class="btn">Total amount</button>
        <template #content>
          <div class="popper">{{ $filters.currencyFilter(info.bill) }}</div>
        </template>
      </Popper>

    </section>

  </div>
</template>
<script>
import Loader from "@/components/AppPractices/Loader";
import {mapGetters} from "vuex";
import {defineComponent, nextTick} from "vue";
import Popper from "vue3-popper";
import category from "@/store/category";
import currencyFilter from "@/filters/currencyFilter";
import tooltipDirective from "@/directives/tooltipDirective";

export default {
  name: 'planning',
  components: {Loader, Popper,},
  data: () => ({
    loading: true,
    categories: [],
    money: '₴',
  }),
  computed: {
    ...mapGetters(['info']),
  },

  // async updated() {
  //   document.addEventListener('DOMContentLoaded',setTimeout( async function () {
  //     const el = await document.querySelectorAll('.tooltipped');
  //     const instances = await M.Tooltip.init(el,{html: '', position: 'top'})
  //     // const instances = M.Tooltip.getInstance(el)
  //     // instances.open()
  //   },50))
  // },


  async mounted() {
    // document.addEventListener('DOMContentLoaded',async function() {
    //      const elems = await document.querySelectorAll('.tooltipped');
    //      const instances = await  M.Tooltip.init(elems, {html: `${category.tooltip}`})
    //   // nextTick()
    //  })

    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    this.categories = categories.map(category => {
      const spend = records
          .filter(record => record.categoryId === category.id)
          .filter(record => record.type === 'outcome')
          .reduce((total, record) => {
            return total += +record.amount
          }, 0)
      const percent = 100 * spend / category.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor = percent < 60
          ? 'green'
          : percent < 100
              ? 'yellow'
              : 'red'
      const tooltipValue = category.limit - spend
      const tooltip = `${tooltipValue < 0 ? 'Excess on' : 'remains'} ${currencyFilter(Math.abs(tooltipValue))} `

      return {
        ...category,
        progressColor,
        progressPercent,
        spend,
        tooltip
      }
    })

    this.loading = false
  },

}
</script>
<style>
/*.popper {*/
/*  border: solid 1px #343333;*/
/*  background: #313130;*/
/*  padding: 10px;*/
/*  color: #e8e7e0;*/
/*  border-radius: 10px;*/
/*  cursor: pointer;*/
/*}*/
.content {
  display: flex;
  justify-content: space-between;
}
.spinner-green {
  border-radius: 10px;
  cursor: pointer;
}
</style>


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
<!--              <h3>Планирование</h3>-->
<!--              <h4>12 212</h4>-->
<!--            </div>-->

<!--            <section>-->
<!--              <div>-->
<!--                <p>-->
<!--                  <strong>Девушка:</strong>-->
<!--                  12 122 из 14 0000-->
<!--                </p>-->
<!--                <div class="progress" >-->
<!--                  <div-->
<!--                      class="determinate green"-->
<!--                      style="width:40%"-->
<!--                  ></div>-->
<!--                </div>-->
<!--              </div>-->
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
