<template>
  <nav  class="navbar orange lighten-1">
    <div class="nav-wrapper" @click.stop>
      <div class="navbar-left" >
        <a href="#" @click.stop ="$emit('click')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ $filters.dateFilter(date) }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a  @click.stop.prevent
              class="dropdown-trigger black-text"
              href="#"
              data-target="dropdown"
              ref="dropdown"
          >
            {{ name }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <router-link @click.stop to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.stop="logout">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  // props: ['options'],
  data:() =>({
    date: new Date(),
    interval: null,
    dropdown: null,
    format: null
  }),
  methods: {
    async logout() {
     await this.$store.dispatch('logout')
     await this.$router.push('/login?message=logout')
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date()
    },1000)
   this.dropdown = M.Dropdown.init(this.$refs.dropdown,{
      constrainWidth: false
    })
  },
  // beforeDestroy
  beforeUnmount() {
    clearInterval(this.interval)
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  },
 computed: {
   dateFilter(value, format = 'date' && 'time') {
     // this.time=time.getCurrentTime()
     // console.log(value)
     return value
   },
   name() {
    return  this.$store.getters.info.name
   }

 }

}
</script>
