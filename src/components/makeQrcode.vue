<template>
    <var-paper class="contant">
        <div class="img">
            <div class="a">
                <h1>名称</h1>
            </div>
            <var-input class="ippout" variant="outlined" v-model="value" />
        </div>
        <div class="name">
            <div class="flex justify-center items-center">
                <p class="text-2xl mr-1">起始时间：</p>
                <p class="text-2xl border-b-2">{{ beginTime ? beginTime : '' }}</p>
                <var-button class="ml-2" size="small" @click="(bottom = true), (timeType = 'begin')"><Icon type="shezhi"></Icon></var-button>
            </div>
            <div class="flex justify-center items-center">
                <p class="text-2xl mr-1">截止时间：</p>
                <p class="text-2xl border-b-2">{{ endTime ? endTime : '' }}</p>
                <var-button class="ml-2" size="small" @click="(bottom = true), (timeType = 'end')"><Icon type="shezhi"></Icon></var-button>
            </div>
        </div>
        <div class="c">
            <var-button type="primary" class="cb text-2xl" @click="createRegistration">{{ isCreate == 'true' ? '添加' : '修改' }}</var-button>
        </div>
        <var-popup position="bottom" v-model:show="bottom">
            <div class="h-[55vh]">
                <makedate :matterTime="timeType == 'end' ? endTime : beginTime" @time="getTime" :timeType="timeType"></makedate>
            </div>
        </var-popup>
    </var-paper>
</template>

<script>
import { ref } from 'vue';
import { Snackbar } from '@varlet/ui';
import Icon from '@/components/icon.vue';
import makedate from '@/components/makedate.vue';
import registration from '@/api/registration';

export default {
    components: {
        Icon,
        makedate
    },
    data() {
        return {
            bottom: false,
            value: '',
            beginTime: '',
            endTime: '',
            files: ref([]),
            timeType: ''
        };
    },
    props: {
        nameValue: {
            type: Object,
            default: {}
        },
        isCreate: {
            type: String,
            default: 'true'
        }
    },
    // 监听nameValue的变化
    watch: {
        nameValue() {
            this.value = this.nameValue.name;
            this.beginTime = this.nameValue.beginTime;
            this.endTime = this.nameValue.endTime;
        }
    },
    methods: {
        getTime(data) {
            if (data.timeType == 'begin') {
                this.beginTime = data.datedata;
            } else {
                this.endTime = data.datedata;
            }
            this.bottom = false;
        },
        async createRegistration() {
            if (!this.value) {
                Snackbar.warning('请输入名称');
                return;
            }
            if (!this.beginTime || !this.endTime) {
                Snackbar.warning('请选择时间');
                return;
            }
            console.log(this.beginTime, this.endTime);
            const res = await registration.createRegistration({
                registrationId: this.isCreate == true ? null : this.nameValue.registrationId,
                name: this.value,
                beginTime: this.isCreate == true ? this.beginTime + ':00' : this.beginTime,
                endTime: this.isCreate == true ? this.endTime + ':00' : this.endTime,
                isBegin: 0,
                isEnd: 0
            });
            if (res.affectedRows ==1) {
                Snackbar.success('操作成功');
                this.$emit('close');
            } else {
                Snackbar.error('操作失败');
            }
        }
    }
};
</script>

<style scoped>
.img {
    margin-top: 12%;
    height: 30%;
    width: 100%;
    display: flex;
    /* 变成竖直分布 */
    justify-content: center;
    align-items: center;
}
.name {
    margin-bottom: 5%;
    height: 30%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.contant {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
}
.openb {
    margin-top: 20px;
}

.c {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.cb {
    height: 80%;
    width: 40%;
    font-size: 30px;
}
.ippout {
    margin-left: 5px;
    width: 65%;
    max-width: 400px;
    text-align: center;
}
</style>
