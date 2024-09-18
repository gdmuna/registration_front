<template>
    <div class="content">
        <div class="flex flex-col w-full items-center gap-4 mt-3">
            <var-paper v-for="(registration, index) in registrationList" :key="index" class="w-[90%] rounded-[8px] pt-3 pl-3 pr-3 pb-2 " :style="{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }">
                <div class="flex w-full h-[50%]  mb-1 pr-1" @click="goqueue(registration.registrationId)">
                    <!-- 环节名称 -->
                    <p class="font-semibold text-2xl text-[#4a4a4a] w-full m-0">
                        <b>{{ registration.name }}</b>
                    </p>
                    <!-- 环节状态提示 -->
                    <div class="flex ml-1 items-center justify-center w-[5.5rem] h-[2rem] rounded-full font-semibold" :class="registration.isBegin == 1 ? 'bg-[#B1D1BC] ' : 'bg-[#B4B4B4]'">
                        <div :class="[registration.isBegin == 1 ? 'bg-[#4C9163] ' : 'bg-[#4A4A4A]', ' mr-1 w-[0.8rem] h-[0.8rem] rounded-full']"></div>
                        <p class="ppp">{{ registration.isBegin ? "进行时" : registration.isEnd ? "已结束" : "未开始" }}</p>
                    </div>
                </div>
                <!-- 环节描述 -->
                <div class="gap-1 flex items-center mt-3 ">
                    <p class="text-[1rem] leading-[100%] m-0 w-full text-[#4a4a4a]">开始时间：{{ registration.beginTime }}</p>
                    <var-button type="primary" size="small" @click="(center2 = true), (nameValue = registration)">修改</var-button>
                    <var-button :type="registration.isBegin?'warning':'primary'" size="small" @click="(nameValue = registration), info = true">{{ registration.isBegin == 1 ? "暂停" : "开启" }}</var-button>
                    <var-button v-if="registration.isEnd" type="danger" size="small" @click="(nameValue = registration), info = true">删除</var-button>
                </div>
            </var-paper> 
        </div>
    </div>
    <var-popup v-model:show="center2">
        <div class="center2">
            <makeQrcode :nameValue="nameValue" isCreate="false" :isUpdate="true"  @close2="closeCenter" />
        </div>
    </var-popup>
    <var-popup :default-style="false" v-model:show="info">
    <div class="w-[50vw]">
        <var-result class="result w-full" type="info" :title="'确定' + (nameValue.isBegin?'暂停':'开启') + '吗'" >
            <template #footer>
                <var-button class="mr-4" type="warning" @click="info = false">取消</var-button>
                <var-button type="info" @click="changeType">确定</var-button>
            </template>
        </var-result>
    </div>
    </var-popup>
    <var-popup :default-style="false" v-model:show="error">
        <div class="w-[50vw]">
            <var-result class="result w-full" type="error"  title="'确定删除吗'" >
                <template #footer>
                    <var-button class="mr-4" type="warning" @click="error = false">取消</var-button>
                    <var-button type="info" @click="delete">确定</var-button>
                </template>
            </var-result>
        </div>
    </var-popup>
    
</template>

<script>
import Qrcodelook from '@/components/Qrcodelook.vue';
import makeQrcode from '@/components/makeQrcode.vue';
import { Snackbar } from '@varlet/ui';
import { nextTick } from 'vue';
import registration from '@/api/registration';


export default {
    components: {
        Qrcodelook,
        makeQrcode
    },
    props: {
        registrationList: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            info: false,
            error: false,
            center: false,
            center2: false,
            nameValue: '',
            registerList: [],
            bigCode: { url: '', name: '', qrcodeId: '', time: '' },
        };
    },
    methods: {
        getDaysDifference(timestamp) {
            const now = new Date();
            const targetDate = new Date(timestamp);
            const differenceInTime = now - targetDate;
            const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));
            return differenceInDays;
        },
        closeCenter() {
            this.center2 = false;
            this.$emit('close2');
        },
        async changeType() {
            console.log(this.nameValue);
            const res = await registration.createRegistration({
                registrationId: this.nameValue.registrationId,
                name: this.nameValue.name,
                beginTime: this.nameValue.beginTime,
                endTime: this.nameValue.endTime,
                isBegin: this.nameValue.isBegin == 1 ? 0 : 1,
                isEnd: this.nameValue.isEnd
            });
            this.info = false;
            if (res.affectedRows == 1) {
                Snackbar.success('操作成功');
                this.$emit('update');
            } else {
                Snackbar.error('操作失败');
            }
        },
        async delete() {
            console.log(this.nameValue.registrationId);
            const res = await registration.deleteRegistration(this.nameValue.registrationId);
            this.error = false;
            if (res.affectedRows == 1) {
                Snackbar.success('删除成功');
                this.$emit('update');
            } else {
                Snackbar.error('删除失败');
            }
        },
        goqueue(registrationId) {
            this.$router.push({ path: '/queue', query: { id:registrationId } });
        }
    },
    // mouted() {
    //     this.registerList = this.registrationList;
    //     console.log(this.registerList);
    // },
    // //监听二维码列表变化，更新二维码图片
    // watch: {
    //     registrationList: {
    //         handler() {
    //             this.updateCard();
    //         },
    //         immediate: true, // 在初始化时也调用一次
    //         deep: true // 深度监听数组中的元素变化
    //     }
    // }
    // //监听二维码列表变化，长度大于12时调用函数add
};
</script>

<style scoped>
.content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.image {
    width: 100%;
    height: 100%;
}

.itcenter {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.center {
    overflow: auto;
    height: 60vh;
    max-height: 700px;
    width: 100vw;
    max-width: 500px;
    border-radius: 10px;
}

.center2 {
    height: 40vh;
    width: 85vw;
    border-radius: 10px;
}

.imagge {
    width: 100%;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

.foot {
    position: fixed;
    width: 100%;
    max-width: 500px;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.foot1 {
    display: flex;
    width: 95%;
    justify-content: space-around;
    margin-bottom: 20px;
}

.aaaa {
    width: 90%;
    margin: 5px;
}

.aaa {
    width: 25%;
}

.ppp {
    margin: 0;
    padding: 0;
    font-size: 17px;
    line-height: 2rem;
}
</style>
