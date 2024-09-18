<template>
    <div class="head">
        <var-app-bar style="height: 100%">
            <template #left>
                <img src="../assets/gdmuna-logo_shape2.svg" alt="" style="height: 50px; margin-right: 5px" />
                <b style="color: #fff; font-size: 20px">网络协会挂号系统</b>
            </template>

            <template #right>
                <var-menu placement="bottom">
                    <var-button color="transparent" text-color="#fff" round text>
                        <var-icon name="menu" :size="30" />
                    </var-button>

                    <template #menu>
                        <var-cell ripple @click="goInfo">信息</var-cell>
                        <var-cell ripple @click="clearLoggedIn">退出</var-cell>
                    </template>
                </var-menu>
            </template>
        </var-app-bar>
    </div>
</template>

<script>
import { clearLoggedIn } from '@/router/index';
import { Snackbar } from '@varlet/ui';

export default {
    props: {
        pitime: {
            type: String,
            default: ''
        }
    },
    methods: {
        clearLoggedIn() {
            clearLoggedIn();
            this.$router.push('/login');
            Snackbar.info({ content: '退出登录成功', duration: 1000 });
        },
        goInfo() {
            this.$router.push('/info');
        }
    }
};
</script>

<style scoped>
.head {
    height: 100%;
    width: 100%;
    display: flex;
}
.headbox {
    text-align: center;
    position: relative;
}
.right {
    position: absolute;
    right: 10px;
    top: 55%;
    height: 100%;
    line-height: 100%;
}
.right b {
    margin: 0;
    padding: 0;
    color: #fff;
}
</style>
