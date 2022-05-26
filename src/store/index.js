import { createStore } from 'vuex'
import auth from './auth'
import info from './info';
import category from "./category";

export default createStore({
  state: {
    error: null,
  },
  mutations: {
    setError(state,error) {
      state.error = error
    } ,
    clearError(state) {
      state.error = null
    }
  },
  getters: {
    error: state => state.error
  },
  actions: {
     async getCurrency() {
     // const myHeaders = new Headers();
     //  myHeaders.append("apikey", "MJS7Pt6Mhz3se6SS62Gx7aw4TeHhOnOQ");
     //const requestOptions = {
     //    method: 'GET',
     //    redirect: 'follow',
     //    headers: myHeaders
     //  };
     //fetch("https://api.apilayer.com/fixer/latest/?base=USD&symbols=EUR,GBP", requestOptions)
     //      .then(response => response.text())
     //      .then(result => console.log(result))
     //      .catch(error => console.log('error', error));

     //const key = process.env.VUE_APP_FIXER
      const res = await fetch('https://api.apilayer.com/fixer/latest?base=EUR&symbols=UAH,USD,EUR', {
        method: 'GET',
        headers: {
          apikey: 'l1A81VnsCyl10VI8BabFL67G0sv6j8bP',
        }
      })
//  fetch('https://api.apilayer.com/fixer/latest?base=USD&symbols=EUR,GBP',{
//  metchod: 'GET',
//  header:{ 'apikey: YOUR API KEY'}})
        return await res.json()
    }
  },
  modules: {
    auth,info,category
  }
})
