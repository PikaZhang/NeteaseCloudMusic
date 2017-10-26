<template>
    <div class="userWrap">
        <div class="phoneGroup">
            <label for="iphone">用户号:</label>
            <el-input id="iphone" placeholder="请输入手机号" v-model="loginInfo.phone">
            </el-input>
        </div>
        <div class="passwordGroup">
            <label for="password">密码:</label>
            <el-input id="password" placeholder="请输入密码" v-model="loginInfo.password">
            </el-input>
        </div>
        <el-button @click="doLogin" >登录</el-button>
        <el-alert v-show="title" :title="title" :type="mytype">
        </el-alert>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loginInfo: {
                phone: '',
                password: ''
            },
            mytype: 'error',
            title: ''

        }
    },
    methods: {
        doLogin() {
            this.$store.dispatch('doLogin', this.loginInfo).then(data => {
                if (data.code != 200) {
                    this.mytype = 'error'
                    this.title = data.msg || '登录失败';
                } else {
                    this.mytype = 'success'
                    this.title = data.msg || '登录成功';
                    this.$store.commit('updateUserInfo', data);
                    setTimeout(() => {
                        this.$router.push('/');
                    }, 1000);
                }

            })
        }

    }
}
</script>
<style>
.el-input {
    display: inline-block;
    width: 200px;
}

.userWrap {
    width: 1200px;
    margin: 0 auto;
    min-height:850px;
    text-align: center;
    padding:240px 0 240px;
    background-color:#fff;
}

label {
    display: inline-block;
    width: 70px;
}

.passwordGroup {
    margin: 20px 0 10px 0;
}
.el-button{
    margin-top:20px;
}
</style>
