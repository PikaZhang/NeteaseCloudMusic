import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        userInfo: {
            id: '',
            userName: '',
            profile: {}
        },
        list: []
    },
    mutations: {
        // doLogin(state, data) {
        //     fetch('/api/login/cellphone?phone=' + data.phone + '&password=' + data.password)
        //         .then(res => {
        //             return res.json();
        //         });
        updateUserInfo(state, data) {
            state.userInfo = {
                id: data.account.id,
                userName: data.account.userName,
                profile: data.profile
            };
        }
    },
    actions: {
        doLogin(store, data) {
            return fetch('/api/login/cellphone?phone=' + data.phone + '&password=' + data.password)
                .then(res => {
                    return res.json();
                });
        }
    }
})