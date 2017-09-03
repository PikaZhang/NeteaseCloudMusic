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
        songsList: {
            songs: '',
            count: ''
        },
        input: '', //多处使用，放在vuxex中方便调用
        musicUrl: '',

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
        },
        //获取搜索歌曲数据
        searchSong(state, data) {
            state.songsList = {
                songs: data.result.songs,
                count: data.result.songCount
            };


        },
        updateSingUrl(state, result) {
            state.musicUrl = result.data[0].url
        }

    },
    actions: {
        doLogin(store, data) {
            return fetch('/api/login/cellphone?phone=' + data.phone + '&password=' + data.password)
                .then(res => {
                    return res.json();
                });
        },
        search(store, data) { //为dispatch中的参数
            return fetch('/api//search?keywords=' + data + '&limit=10')
                .then(response => {
                    return response.json();
                })
        }
    }
})