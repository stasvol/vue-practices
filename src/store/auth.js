// import firebase from "firebase/app";
import firebase from 'firebase/compat/app'
import mapGetters from "vuex";

export default {
    actions: {
        async login({dispatch, commit}, {email, password}) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
                await dispatch('getInfo')
                // const uid = await dispatch('getUid')
                // const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
                // commit('setInfo', info)

            } catch (e) {
                commit("setError",e)
                throw e
            }

        },
        async register({dispatch, commit}, {email, password, name}) {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const uid = await dispatch('getUid')
                await firebase.database().ref(`users/${uid}/info`).set({
                    bill: 10000,
                    name
                })
                await dispatch('getInfo')
            } catch (e) {
                commit("setError",e)
                throw e
            }
        },
        getUid() {
           const user = firebase.auth().currentUser
            return user ? user.uid : null
        },
        async logout({commit}) {
            await firebase.auth().signOut()
            commit('clearInfo')
        }
    }
}
