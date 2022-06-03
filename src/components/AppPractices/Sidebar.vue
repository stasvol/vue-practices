<template >
  <ul class="sidenav app-sidenav " :class="{open: !value}">
<!--      :class="['open', {value}]"-->
<!--    :class="{open: value}"-->
    <router-link
      v-for="link in links"
      :key="link.path"
      active-class="active"
      :to="link.path"
      tag="li"
      :exact="link.exact"
    >
      <a href="#" class="waves-effect waves-orange pointer">{{ link.title.toUpperCase() }}</a>
    </router-link>

<!--    <li>-->
<!--      <a href="#" class="waves-effect waves-orange pointer">Счет</a>-->
<!--    </li>-->
<!--    <li>-->
<!--      <a href="#" class="waves-effect waves-orange pointer">История</a>-->
<!--    </li>-->
<!--    <li>-->
<!--      <a href="#" class="waves-effect waves-orange pointer">Планирование</a>-->
<!--    </li>-->
<!--    <li>-->
<!--      <a href="#" class="waves-effect waves-orange pointer">Новая запись</a>-->
<!--    </li>-->
<!--    <li>-->
<!--      <a href="#" class="waves-effect waves-orange pointer">Категории</a>-->
<!--    </li>-->
  </ul>
</template>
<script>
import localiseFilter from '@/filters/localiseFilter'
export default {
  props:[`value`],
  data:() => ({
    links: [
      {title: localiseFilter('Sidebar_Bill'), path: '/', exact: true},
      {title: localiseFilter('Sidebar_History'), path: '/history'},
      {title: localiseFilter('Sidebar_Planning'), path: '/planning'},
      {title: localiseFilter('Sidebar_NewRecord'), path: '/record'},
      {title: localiseFilter('Sidebar_Categories'), path: '/categories'},
    ],
  })
}
</script>
<style scoped>
a  .waves-effect {
  display: flex ;
  justify-content: space-between;
  padding: 1rem;
  color: #211f1f;
  /*margin-bottom: -1.5rem;*/
}
 .active  a {
  background: #e8e7e0;
}
 .nodOpen ul {
   display: none !important;
 }
 .hasOpen ul {
   display: block !important;
 }

</style>
