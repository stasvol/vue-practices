import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min'
import mesPlugin from "@/utils/mesPlugin";

// import firebase from "firebase/app"; // v.8 and <
// import firebase from 'firebase/compat/app'  // v.9 >
import 'firebase/compat/auth';
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import 'firebase/auth';
import 'firebase/database';
import { initializeApp } from "firebase/app";

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
    if (!appMain) {
        appMain = app.use(mesPlugin).use(store).use(router).mount('#app')
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


