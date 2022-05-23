import firebase from "firebase/compat/app";

export default {
    state: {
        info: {}
    },
    mutations: {
        setInfo(state, info) {
            state.info = info
        },
        clearInfo(state) {
           state.info = {}
        }
    },
    actions: {
        async getInfo({dispatch, commit}) {
            try {
                const uid = await dispatch('getUid')
                const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
                commit('setInfo', info)
            } catch (e) {
               throw e
            }

        },
    },
    getters: {
        info: state => state.info
    }
}