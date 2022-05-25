import firebase from "firebase/compat/app";

export default {
 actions: {
    async createCategory({dispatch, commit}, {title, limit}) {

         try {
          const uid = await dispatch('getUid')
          const category = await firebase.database().ref(`/users/${uid}/categories`).push({title,limit})
             console.log(category)
          return {title, limit, id: category.key}
         } catch (e) {
             commit('setError',e)
             throw e
         }
     }
 }
}
