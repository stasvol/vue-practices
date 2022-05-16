import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min'
import dateFilter from "@/filters/dateFilter";
import {filter} from "core-js/internals/array-iteration";


const app = createApp(App)
app.config.globalProperties.$filters = filter('date', dateFilter)

app.use(store).use(router).mount('#app')
