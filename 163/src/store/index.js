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
        songsList: '',
        songSinger: '',
        input: '', //多处使用，放在vuxex中方便调用
        inputContent: '',
        musicUrl: '',
        musicName: '',
        musicList: [],
        listShow: false,
    },
    mutations: {

        updateUserInfo(state, data) {
            state.userInfo = {
                id: data.account.id,
                userName: data.account.userName,
                profile: data.profile
            };
        },
        //获取搜索歌曲数据
        searchSong(state, data) {
            state.songsList = data.result;

        },
        searchSinger(state, data) {
            state.songSinger = data.result;
        },
        updateSingUrl(state, result) {
            state.musicUrl = result.data[0].url
        },
        inputContentFn(state, result) {
            state.inputContent = result;
        },
        songDetailFn(state, result) {
            state.musicName = result.songs[0];
        },
        songUrlFn(state, result) {
            state.musicUrl = result.data[0]
        },
        musicListFn(state, result) {
            state.musicList.push(result);
        },
        musicClearFn(state, result) {
            state.musicList = result;
        },
        listShowFn(state, result) {
            state.listShow = result;
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
            return fetch('/api//search?keywords=' + data + '&limit=20')
                .then(response => {
                    return response.json();
                })
        },
        getSearchSong({ commit }, obj) {
            return new Promise(function(resolve) {
                fetch('/api//search?keywords=' + obj.input + '&limit=' + obj.counts + '&type=1' + '&offset=' + obj.offset)
                    .then(response => {
                        return response.json();
                    }).then(data => {
                        commit('searchSong', data);
                        resolve()

                    })
            })
        },
        getSearchSinger({ commit }, obj) {
            return new Promise(function(resolve) {
                fetch('/api//search?keywords=' + obj + '&type=100')
                    .then(response => {
                        return response.json();
                    }).then(data => {
                        commit('searchSinger', data);
                        resolve()

                    })
            })
        },
        songDetail({ commit }, value) {
            return new Promise(function(resolve) {
                fetch('/api/song/detail?ids=' + value).then(response => {
                        return response.json();
                    })
                    .then(result => {
                        commit("songDetailFn", result)
                        resolve()
                    })
            })
        },
        songUrl({ commit }, value) {
            return new Promise(function(resolve) {
                fetch('/api/music/url?id=' + value).then(response => {
                        return response.json();
                    })
                    .then(result => {
                        commit("songUrlFn", result)
                        resolve()
                    })
            })
        },
    }
})