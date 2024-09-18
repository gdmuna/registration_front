<template>
    <var-app-bar title="返回" class="sss">
        <template #left>
            <var-button color="transparent" text-color="#fff" round text @click="goBack">
                <var-icon name="chevron-left" :size="24" />
            </var-button>
        </template>
    </var-app-bar>
    <div class="main">
        <h1>我的账号:</h1>
        <h1>{{ name }}</h1>
    </div>
</template>

<script>
import user from '@/api/user';
export default {
    data() {
        return {
            name: ''
        };
    },
    methods: {
        goBack() {
            this.$router.push('/home');
        },
        async getUserInfo() {
            const res = await user.getUserInfo();
            console.log(res);
            this.name = res.account;
        }
    },
    mounted() {
        this.getUserInfo();
    }
};
</script>

<style scoped>
.sss {
    height: 8vh;
}
</style>
