<template>
    <div class="head">
        <Header :pitime="pitime" />
    </div>
    <div class="mainbox bg-slate-100">
        <div class="history">
            <history :registrationList="registrationList" @update="update"/>
        </div>
        <div></div>
        <div class="fixed bottom-12 right-5">
            <var-paper :elevation="7" :width="60" :height="60" round ripple class="HET" @click="center = true">
                <Icon type="jia" extraclass="hat"/>
            </var-paper>
        </div>
        <var-popup v-model:show="center">
            <div class="center">
                <makeQrcode isCreate="true" @close="closeCenter" :isUpdate="false" />
            </div>
        </var-popup>
    </div>
</template>

<script>
import Header from '@/components/header.vue';
import history from '@/components/history.vue';
import makeQrcode from '@/components/makeQrcode.vue';
import registration from '@/api/registration';
import auth from '@/api/auth';
import { Snackbar } from '@varlet/ui';
import Icon from '@/components/icon.vue';
import { nextTick } from 'vue';

import { ref } from 'vue';
export default {
    components: {
        Header,
        makeQrcode,
        history,
        Icon
    },
    data() {
        return {
            registrationList: [],
            pitime: 'Today',
            isOpen: false,
            center: false,
            isMore: false,
            files: ref([]) // 使用 ref 创建响应式属性
        };
    },
    methods: {
        //获取二维码列表
        async getRegistrationList() {
            const registrationList = await registration.getRegistrationList();
            this.registrationList = registrationList;
            console.log(registrationList);
            this.$forceUpdate();
        },
        closeCenter() {
            this.center = false;
            this.getRegistrationList();
        },
        update() {
            this.getRegistrationList();
        },
        async deletecode(id) {
            console.log(id, 'SSSS');
            await qrcode.deleteQRCode(id);
            Snackbar.info({ content: '删除成功', duration: 1000 });
            this.getCodeList();
        }
    },
    mounted() {
        this.getRegistrationList();
    }
};
</script>

<style scoped>
.mainbox {
    height: 93dvh;
    width: 100%;
}
.history {
    height: 100%;
    width: 100%;
    overflow: auto;
}

.HET {
    background-color: #587dfc;
    display: flex;
    justify-content: center;
    align-items: center;
}
.hat{
    color: white;
    font-size: 25px;
}
.head {
    height: 7dvh;
    width: 100%;
}
.center {
    height: 50vh;
    width: 90vw;
    max-width: 500px;
    border-radius: 10px;
}

.icon {
    position: absolute;
    top: -12px;
}
</style>
