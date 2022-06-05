<template>
  <div>
    <div class="page-title">
      <h3>{{ $filters.localiseFilter("Sidebar_Categories") }}</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div class="row" v-else >

       <CategoryCreate @created="addNewCategory" />

      <CategoryEdit
          v-if="categories.length"
          :categories="categories"
          :key="categories.length + updateCount"
          @updated="updateCategories"

      />
        <h4 v-else class="center">Has no categories</h4>

      </div>
    </section>
  </div>
</template>
<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'
import Loader from "@/components/AppPractices/Loader";
import {useMeta} from "vue-meta";
import localiseFilter from "@/filters/localiseFilter";
export default {
  name:'categories',
  setup () {
    useMeta({ title: localiseFilter('Sidebar_Categories') })
  },
  data:() => ({
    categories: [],
    loading: true,
    updateCount: 0,
  }),
  async mounted() {
  this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
      console.log(this.categories)
    },
    updateCategories(category) {
      const idx = this.categories.findIndex(cat=> cat.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount ++

    }
  },
  components: {
    Loader,
    CategoryCreate,CategoryEdit
  }
}
</script>
