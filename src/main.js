import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min'

const app = createApp(App)
// app.config.globalProperties.$filters = filter('date', dateFilter)
app.config.globalProperties.$filters = {
    dateFilter(value,format = 'date') {
        // console.log(value)
        // return value
        const options = {}
        // if (format.includes('date')){
            options.day = '2-digit'
            options.month = 'long'
            options.year = 'numeric'
            options.hour = '2-digit'
            options.minute = '2-digit'
            options.second = '2-digit'
        // }
        // if (format.includes('time')){
        //     options.hour = '2-digit'
        //     options.minute = '2-digit'
        //     options.second = '2-digit'
        // }
        return new Intl.DateTimeFormat('uk-UK', options).format(new Date(value))
        // return new Intl.DateTimeFormat('uk-UK').format(new Date(value))
    }
}

app.use(store).use(router).mount('#app')

