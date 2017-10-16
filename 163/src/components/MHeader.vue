<template>
    <div class="header">

        <el-menu theme="dark" mode="horizontal" :router="true">
            <el-menu-item index="/">
                <icon name="music" class="logo" scale="2" height="60"></icon>
            </el-menu-item>
            <el-menu-item v-for="menu in mainMenu" :index="menu.path">
                {{menu.name}}
            </el-menu-item>

            <ul class="loginWrap">
                <li v-if="userInfo.id">
                    <span class="login" >{{userInfo.profile.nickname}}<span class="outLogin">退出</span></span>
                </li>
                <li v-else>
                    <router-link class="login" :to="{name: 'Login'}">登录</router-link>
                </li>
            </ul>
            <div class="searchWrap">
                <!-- <el-input v-model="input" placeholder="请输入内容" icon='search' @click="searchIco"></el-input> -->
                <input type="text" v-model='$store.state.input' class="form-control" placeholder="请输入内容">
                <router-link class="searchIco" :to="{name: 'Search'}">
                    <span class="glyphicon glyphicon-search " @click="searchClick"></span>
                </router-link>

            </div>
        </el-menu>
    </div>
</template>
<script>
export default {
    data() {
        return {
            mainMenu: [
                {
                    name: '发现音乐',
                    path: '/'
                },
                {
                    name: '我的音乐',
                    path: '/my'
                },
                {
                    name: '朋友',
                    path: '/friend'
                },
                {
                    name: '商城',
                    path: '/product'
                },
                {
                    name: '音乐人',
                    path: '/recruit'
                }
            ]
        }
    },
    computed: {
        userInfo() {
            return this.$store.state.userInfo
        }
    },
    methods: {
        searchClick() {
             this.$store.dispatch('getSearchSinger', this.$store.state.input)
             this.$store.commit('inputContentFn',this.$store.state.input)
            this.$store.dispatch('search', this.$store.state.input)
                .then(data => {
                    if (this.$store.state.input == '') {
                        return;
                    } else {
                        this.$store.commit('searchSong', data);
                        sessionStorage.setItem('name', this.$store.state.input)
                    }

                });
        }
    }
}
</script>
<style>
.el-menu--dark .el-menu-item {
    color: white;
}

.header {
    width: 100%;
    background: #324157;
    height: 60px;
}

.el-menu {
    width: 1200px;
    margin: 0 auto;
}

.logo {
    color: white;
}

.mt20 {
    margin-top: 20px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.login {
    display: inline-block;
    line-height: 55px;
    color: #fff;
    text-decoration: none;
    padding: 0 15px 5px;
}

/* .login:hover {
    color: #fff;
    padding: 0 15px;
    border-bottom: 5px solid #20a0ff;
    text-decoration: none;
} */
.login:focus, .login:hover{
     color: #fff;
    text-decoration: none;
}
.loginWrap {
    float: right;
    /* margin-right: 340px; */
}

.searchWrap {
    float: right;
    width: 150px;
    margin-top: 10px;
    position: relative;
}

.searchWrap input {
    width: 150px;
    padding-right: 34px;
}

.searchIco {
    position: absolute;
    width: 34px;
    height: 34px;
    top: 0;
    right: 0;
    font-size: 16px;
    line-height: 34px;
    text-align: center;
}
.outLogin{
    margin-left:10px;
}
</style>

