<template>
    <div class="login">
        <var-paper :elevation="5" :height="400" class="paper">
            <b style="font-size: 25px">注册</b>
            <var-input placeholder="账号" v-model="account" type="text" class="a" />
            <var-input placeholder="密码" v-model="password" type="password" class="a" />
            <var-input placeholder="确认密码" v-model="password2" type="password" class="a" />
            <var-button type="primary" @click="signup" :disabled="!isCome">注册</var-button>
            <b>
                已有账号？
                <a href="/login">点击登录</a>
            </b>
        </var-paper>
    </div>
</template>

<script>
import user from '@/api/auth';
import { Snackbar } from '@varlet/ui';

export default {
    data() {
        return {
            account: '',
            password: '',
            password2: '',
            isCome: false
        };
    },
    watch: {
        // 观察 account, password, password2 的变化来判断按钮是否应该启用
        account(val) {
            this.checkInput();
        },
        password(val) {
            this.checkInput();
        },
        password2(val) {
            this.checkInput();
        }
    },
    methods: {
        checkInput() {
            this.isCome = this.account && this.password && this.password2 && this.password === this.password2;
        },
        async signup() {
            //密码长度要大于6位
            Snackbar.loading('加载中');
            if (this.password.length < 6) {
                Snackbar.warning({ content: '密码长度要大于6位！', duration: 1000 });
                return;
            }
            if (this.password !== this.password2) {
                Snackbar.warning({ content: '两次输入不一致！', duration: 1000 });
                return;
            }
            try {
                const response = await user.register({ account: this.account, password: this.password });
                console.log(response);
                if (response == true) {
                    Snackbar.success({ content: '注册成功,请登录', duration: 1000 });
                    this.$router.push('/login');
                } else if (response == 'HAD') {
                    Snackbar.error({ content: '注册失败: 账号已存在', duration: 1000 });
                } else {
                    alert('注册失败: ' + response.message);
                    Snackbar.error({ content: '注册失败' + response.message, duration: 1000 });
                }
            } catch (error) {
                console.error(error);
                Snackbar.error({ content: '注册过程中出现错误', duration: 1000 });
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
    height: 100%;
    width: 100%;
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
