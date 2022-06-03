import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min'
import mesPlugin from "@/utils/mesPlugin";
import Loader from "@/components/AppPractices/Loader";
import currencyFilter from "@/filters/currencyFilter";
import tooltipDirective from "@/directives/tooltipDirective";
import Popper from "vue3-popper";
// import Paginate from 'vuejs-paginate'
import Paginate from "vuejs-paginate-next";
import Vue from 'vue'
// import firebase from "firebase/app"; // v.8 and <
// import firebase from 'firebase/compat/app'  // v.9 >
import 'firebase/compat/auth';
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// import 'firebase/auth';
import { initializeApp } from "firebase/app";
import {values} from "core-js/stable/dom-collections";
import localiseFilter from "@/filters/localiseFilter";
import uk from '../src/locales/uk.json'
import en from '../src/locales/en.json'


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
        const locale = store.getters.info.locale || 'uk-UK'
        return new Intl.DateTimeFormat(locale, options).format(new Date(value))
        // return new Intl.DateTimeFormat('uk-UK').format(new Date(value))
    },
     currencyFilter(value, currency='UAH') {
        return new Intl.NumberFormat('uk-UK', {
            style: 'currency',
            currency
        }).format(value)
    },


    localiseFilter (key) {
        const locales = {
            'uk-UK': uk,
            'en-US': en
        }
        const locale = store.getters.info.locale || 'uk-UK'
        return locales[locale][key] || `[Localise error]: key ${key} not found`
    }
}

const firebaseConfig = {
    apiKey: "AIzaSyDygVhxrVQsPuab4aZUo2us9JJdlGCvxEQ",
    authDomain: "vue-crm-d5205.firebaseapp.com",
    projectId: "vue-crm-d5205",
    storageBucket: "vue-crm-d5205.appspot.com",
    messagingSenderId: "480602155075",
    appId: "1:480602155075:web:d0e769f280573a097d8cf6",
    measurementId: "G-CYTG48RDWF"
};

const firebaseApp = firebase.initializeApp ( firebaseConfig );
const analytics = getAnalytics(firebaseApp);
// const db = getFirestore(app);
let appMain

firebase.auth().onAuthStateChanged(() => {
    // app.use('message', mesPlugin).use('currency',currencyFilter).directive('tooltip',tooltipDirective).component("Popper", Popper).use(store).use(router).mount('#app')
    if (!appMain) {
        appMain = app
            .use('Loader', Loader)
            .component('Paginate', Paginate)
            .component("Popper", Popper)
            .directive('tooltip',tooltipDirective)
            .use('currency',currencyFilter)
            .use('locale', localiseFilter)
            .use('message', mesPlugin)
            .use(store)
            .use(router)
            .mount('#app')
    }
});
// app.use(mesPlugin).use(store).use(router).mount('#app')

// firebase.initializeApp({
//     apiKey: "AIzaSyDygVhxrVQsPuab4aZUo2us9JJdlGCvxEQ",
//     authDomain: "vue-crm-d5205.firebaseapp.com",
//     projectId: "vue-crm-d5205",
//     storageBucket: "vue-crm-d5205.appspot.com",
//     messagingSenderId: "480602155075",
//     appId: "1:480602155075:web:d0e769f280573a097d8cf6",
//     measurementId: "G-CYTG48RDWF"
// });
// firebase.auth().onAuthStateChanged(() => {
//     if (!app) {
//         app.use(mesPlugin).use(store).use(router).mount('#app')
//     }
// });


