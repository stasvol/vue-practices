<template>
  <div>
    <Loader v-if="loading" />
    <h5 class="center" v-else-if="!record">No record is id: {{$route.params.id}}</h5>
    <div v-else>
      <div class="breadcrumb-wrap">
        <router-link to ="/history" class="breadcrumb">{{$filters.localiseFilter('Sidebar_History')}}</router-link>
        <a @click.prevent class="breadcrumb">
          {{ record.type === 'income' ? $filters.localiseFilter('Income') : $filters.localiseFilter('Expenses')}}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card"
               :class="{
            'red': record.type === 'outcome',
            'green': record.type === 'income'
          }"
          >
            <div class="card-content white-text ">
              <p>{{$filters.localiseFilter('Description')}}: {{record.description}}</p>
              <p>{{$filters.localiseFilter('Sum')}}: {{$filters.currencyFilter(record.amount)}}</p>
              <p>{{$filters.localiseFilter('History_Category')}}: {{record.categoryName}}</p>

              <small>{{ $filters.dateFilter(record.data) }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <canvas id="myChart" width="400" height="400"></canvas>
  </div>
</template>
<script>
import Loader from "@/components/AppPractices/Loader";
export default {
  name:'detail',
  components: {Loader},
  data:() => ({
    loading: true,
    record: null,
    // category: null
  }),

  async mounted() {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)
    this.record = {
     ...record,
      categoryName: category.title,

    }
    this.loading = false
  }

}
</script>
