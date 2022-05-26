<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
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
export default {
  name:'categories',
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


<!--<template>-->
<!--  <div>-->
<!--    <div class="page-title">-->
<!--      <h3>Категории</h3>-->
<!--    </div>-->
<!--    <section>-->
<!--      <div class="row">-->
<!--        <div class="col s12 m6">-->
<!--          <div>-->
<!--            <div class="page-subtitle">-->
<!--              <h4>Создать</h4>-->
<!--            </div>-->

<!--            <form>-->
<!--              <div class="input-field">-->
<!--                <input-->
<!--                    id="name"-->
<!--                    type="text"-->
<!--                >-->
<!--                <label for="name">Название</label>-->
<!--                <span class="helper-text invalid">Введите название</span>-->
<!--              </div>-->

<!--              <div class="input-field">-->
<!--                <input-->
<!--                    id="limit"-->
<!--                    type="number"-->
<!--                >-->
<!--                <label for="limit">Лимит</label>-->
<!--                <span class="helper-text invalid">Минимальная величина</span>-->
<!--              </div>-->

<!--              <button class="btn waves-effect waves-light" type="submit">-->
<!--                Создать-->
<!--                <i class="material-icons right">send</i>-->
<!--              </button>-->
<!--            </form>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="col s12 m6">-->
<!--          <div>-->
<!--            <div class="page-subtitle">-->
<!--              <h4>Редактировать</h4>-->
<!--            </div>-->

<!--            <form>-->
<!--              <div class="input-field" >-->
<!--                <select>-->
<!--                  <option>Category</option>-->
<!--                </select>-->
<!--                <label>Выберите категорию</label>-->
<!--              </div>-->

<!--              <div class="input-field">-->
<!--                <input type="text" id="name">-->
<!--                <label for="name">Название</label>-->
<!--                <span class="helper-text invalid">TITLE</span>-->
<!--              </div>-->

<!--              <div class="input-field">-->
<!--                <input-->
<!--                    id="limit"-->
<!--                    type="number"-->
<!--                >-->
<!--                <label for="limit">Лимит</label>-->
<!--                <span class="helper-text invalid">LIMIT</span>-->
<!--              </div>-->

<!--              <button class="btn waves-effect waves-light" type="submit">-->
<!--                Обновить-->
<!--                <i class="material-icons right">send</i>-->
<!--              </button>-->
<!--            </form>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </section>-->
<!--  </div>-->
<!--</template>-->
