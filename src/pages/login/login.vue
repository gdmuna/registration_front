<template>
    <div class="login">
        <var-paper :elevation="5" :height="400" class="paper">
            <b style="font-size: 25px">登录</b>
            <var-input placeholder="账号" v-model="account" type="text" class="a" />
            <var-input placeholder="密码" v-model="password" type="password" class="a" />
            <var-button type="primary" @click="login">登录</var-button>
            <b>
                没有账号？
                <a href="/signup">点击注册</a>
            </b>
        </var-paper>
    </div>
</template>

<script>
import auth from '@/api/auth';
import { Snackbar } from '@varlet/ui';

export default {
    data() {
        return {
            account: '',
            password: ''
        };
    },
    methods: {
        async login() {
            Snackbar.loading('加载中');
            const right = await auth.login({ account: this.account, password: this.password });
            console.log(right);
            if (right == true) {
                this.$router.push('/home');
                Snackbar.success({ content: '登录成功', duration: 1000 });
            }
        }
    }
};
</script>

<style scoped>
.login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: #587dfc;
}
.paper {
    width: 300px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
}
.a {
    width: 80%;
}
</style>
