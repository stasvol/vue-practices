import firebase from "firebase/compat/app";

export default {
 actions: {

    async createCategory({dispatch, commit}, {title, limit}) {

         try {
          const uid = await dispatch('getUid')
          const category = await firebase.database().ref(`/users/${uid}/categories`).push({title,limit})
             // console.log(category)
          return {title, limit, id: category.key}
         } catch (e) {
             commit('setError',e)
             throw e
         }
     },

     async fetchCategories({dispatch, commit}) {
         try {
             const uid = await dispatch('getUid')
             const categories = (await firebase.database().ref(`/users/${uid}/categories`).once("value")).val() || {}
             // const categoryArr = []
             // Object.keys(categories).forEach(key=> {
             //     categoryArr.push({
             //         title: categories[key].title,
             //         limit: categories[key].limit,
             //         id: key,
             //     })
             // })
             // return categoryArr
          return  Object.keys(categories).map(key => ({...categories[key], id:key}))
         } catch (e) {
             commit('setError',e)
             throw e
         }
     },

     async fetchCategoryById({dispatch, commit}, id) {
         try {
             const uid = await dispatch('getUid')
             const category = (await firebase.database().ref(`/users/${uid}/categories`).child(id).once("value")).val() || {}
             return {...category, id}
         } catch (e) {
             commit('setError',e)
             throw e
         }
     },

     async updateCategory ({dispatch, commit}, {title, limit, id}) {
         try {
             const uid = await dispatch('getUid')
             await firebase.database().ref(`/users/${uid}/categories`).child(id).update({title, limit})

         } catch (e) {
             commit('setError',e)
             throw e
         }
     }
 }
}
