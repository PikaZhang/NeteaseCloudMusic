<template>
    <div id="app">

        <el-menu theme="dark" mode="horizontal" :router="true">
            <el-menu-item index="/">
                <icon name="music" class="logo" scale="2" height="60"></icon>
            </el-menu-item>
            <el-menu-item v-for="menu in mainMenu" :index="menu.path">
                {{menu.name}}
            </el-menu-item>
            <ul class="loginWrap">
                <li v-if="userInfo.id">
                    <router-link class="login" :to="{name: 'Login'}">{{userInfo.profile.nickname}}</router-link>
                </li>
                <li v-else>
                    <router-link class="login" :to="{name: 'Login'}">登录</router-link>
                </li>
            </ul>
        </el-menu>

        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'app',
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
            ],

        }
    },
    computed: {
            userInfo() {
            return this.$store.state.userInfo
        }
    }
}
</script>

<style>
body {
    margin: 0;
}

.el-menu--dark .el-menu-item {
    color: white;
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
    line-height: 60px;
    color: #fff;
    text-decoration: none;
    padding: 0 15px;
}

.loginWrap {
    float: right;
    margin-right: 60px;
}
</style>
