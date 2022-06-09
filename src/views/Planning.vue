<template>

  <div>
    <div class="page-title">
      <!--      <a class="btn tooltipped" data-position="top" data-tooltip="I am a tooltip">Hover me!</a>-->
      <h3>{{$filters.localiseFilter('Planning_Title')}}</h3>

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
                <button class="spinner-green">{{$filters.localiseFilter('Button_Remains')}}</button>
              </div>

              <template #content>
                <div class="popper">{{ category.title }}: {{ category.tooltip }}</div>
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
        <button class="btn">{{$filters.localiseFilter('Button_TotalAmount')}}</button>
        <template #content>
          <div class="popper">{{info.name}}:&nbsp;{{ $filters.currencyFilter(info.bill) }}</div>
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
import localiseFilter from "@/filters/localiseFilter";
import {useMeta} from "vue-meta";

export default {
  name: 'planning',
  components: {Loader, Popper,},
  data: () => ({
    loading: true,
    categories: [],
    money: '₴',
  }),
  setup () {
    useMeta({ title: localiseFilter('Sidebar_Planning') })
  },
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
      const tooltip = `${tooltipValue < 0 ? 'Excess on' : localiseFilter('Button_Remains')} ${currencyFilter(Math.abs(tooltipValue))} `

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
.popper {
  border: solid 1px #343333;
  background: linear-gradient( #4b4c4d, #262526) ;
  padding: 10px;
  color: #f6f6ea;
  border-radius: 10px;
  cursor: pointer;
  animation-duration: 2s;
  animation-name: slidein;
  /*transform: translate(0);*/
}
@keyframes slidein {
  from {
    margin-top: 100%;
    width: 32%;

  }

  to {
    margin-top: 0%;
    width: 50%;
  }
}
.content {
  display: flex;
  justify-content: space-between;
}
.spinner-green {
  border-radius: 10px;
  cursor: pointer;
}
</style>
