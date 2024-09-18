<template>
    <var-paper class="head" :elevation="4">
        {{ name }}
    </var-paper>
    <div class="w-screen flex-col items-center flex">
        <div class="h-[92vh] overflow-auto mt-2">
            <div class="w-screen flex-col items-center flex">
                <var-paper class="isBegin">
                    <b class="mr-auto">正在面试</b>
                    <var-paper 
                        class="w-full flex p-2 items-center mt-1"
                        :elevation="3"
                        v-for="(item, index) in queueList"
                        :key="item.id"
                        v-show="item.isBegin && !item.isOver"
                        :class="{'highlight-paper': item.number === mynumber}"
                    >
                        <span 
                            class="text-1xl font-extrabold text-white w-[30px] h-[30px] rounded-full flex justify-center items-center"
                            :style="{'background-color': rotatingColors[index % 3]}"
                        >
                            {{ index+1}}
                        </span>
                        <span 
                            :class="['leading-[40px] w-[20%] h-[40px] text-[20px] ml-6', item.number === mynumber ? 'highlight-name' : '']"
                        >
                            {{ (item.name)}}
                        </span>
                    </var-paper>
                    <!-- 如果没有正在面试的人，显示提示 -->
                    <var-paper v-if="queueList.every(item => !item.isBegin)" class="w-full flex p-2 mt-1" :elevation="3">
                        <span class="text-lg text-gray-500">当前没有正在面试的人</span>
                    </var-paper>
                </var-paper>
                <var-paper class="wait">
                    <b class="mr-auto">等待中</b>
                    <var-paper 
                        class="w-full flex p-2 mt-1 items-center" 
                        :elevation="2" 
                        v-for="(item, index) in queueList" 
                        :key="item.id"
                        v-show="!item.isBegin && !item.isOver"
                        :class="{'highlight-paper': item.number === mynumber}"
                    >
                        <span 
                            class="text-1xl font-extrabold text-white w-[30px] h-[30px] rounded-full flex justify-center items-center"
                            :style="{'background-color': item.number === mynumber ? '#00C48F' : rotatingColors[index % 3]}"
                        >
                            {{ index+1 }}
                        </span>
                        <span 
                            :class="['leading-[40px]  h-[40px] text-[20px] ml-6', item.number === mynumber ? 'highlight-name' : '']"
                        >
                        {{ (item.name)}}
                        </span>
                    </var-paper>
                </var-paper>
            </div>
        </div>
        <var-popup v-model:show="center">
            <var-paper :elevation="5" :height="400" class="paper">
                <b style="font-size: 25px">添加挂号</b>
                <var-input placeholder="名字" v-model="newName" type="text" class="a" />
                <var-input placeholder="学号" v-model="newNumber" type="text" class="a" />
                <var-button type="primary" @click="create">确认添加</var-button>
            </var-paper>
        </var-popup>
    </div>
</template>

<script>
import Header from '@/components/header.vue';
import publicApi from '@/api/public';
import { Snackbar } from '@varlet/ui';
import Icon from '@/components/icon.vue';

export default {
    components: {
        Header, Icon
    },
    data() {
        return {
            center: false,
            active: 0,
            queueList: [],
            queue: {},
            newName: '',
            newNumber: '',
            name: '',
            mynumber: '',
            rotatingColors: ['#DED5F2', '#CBF0F9', '#FDDDB4'], // 3 rotating colors
        };
    },
    methods: {
        async ifBegin() {
            const res = await publicApi.getRegistrationDetail(this.$route.query.id);
            setTimeout(() => {
                resolve();
            }, 1000);
            if (res.length == 0) {
                Snackbar.warning('不存在！！！');
                this.$router.push('/public');
            }
            if (res[0].isBegin == 0) {
                Snackbar.warning('本次挂号未启动');
                this.$router.push('/public');
            }
            if (res[0].isEnd == 1) {
                Snackbar.warning('本次挂号已结束');
                this.$router.push('/public');
            }
            if (res[0].isBegin == 1 && res[0].isEnd == 0) {
                if (localStorage.getItem('number') == null) {
                    this.center = true;
                } else {
                    this.mynumber = localStorage.getItem('number');
                    this.getQueueList();
                    this.name = res[0].name;
                }
            }
        },
        async getQueueList() {
            console.log(this.$route.query.id);
            const registrationId = this.$route.query.id;
            const queueList = await publicApi.getqueueList(registrationId);
            this.queueList = queueList;
            console.log(queueList);
            this.$forceUpdate();
        },
        async create() {
            console.log(this.newName, this.newNumber);
            if (this.newName == '') {
                Snackbar.warning('请输入姓名');
                return;
            }
            if (this.newNumber == '') {
                Snackbar.warning('请输入学号');
                return;
            }
            if (!/^\d{11}$/.test(this.newNumber)) {
                Snackbar.warning('学号只能为11位数字');
                return;
            }
            const res = await publicApi.createqueue(
                0,
                this.newName,
                this.newNumber,
                this.$route.query.id,
                0,
                0
            );
            this.center = false;
            setTimeout(() => {
                resolve();
            }, 1000);
            if (res.affectedRows == 1 || res.affectedRows == 10) {
                Snackbar.success('操作成功');
                localStorage.setItem('number', this.newNumber);
                this.getQueueList();
            } else {
                Snackbar.error('操作失败');
            }
        }
    },
    mounted() {
        this.ifBegin();
    }
}
</script>

<style scoped>
.head {
    width: 100vw;
    height: 6vh;
    background-color: #1b89f0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 26px;
    color: white;
}

.isBegin {
    width: 95vw;
    background-color: #6fb9ff;
    padding: 10px;
    margin-bottom: 10px;
}

.wait {
    width: 95vw;
    background-color: #dfe6ec;
    padding: 10px;
}

.highlight-paper {
    background-color: #1b89f0;
}

.highlight-name {
    font-size: 28px;
    color: white;
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
</style>
