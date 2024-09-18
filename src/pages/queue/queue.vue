<template>
    <var-paper class="head" :elevation="4">
        <b class="h-[6vh] fixed left-3 text-4xl leading-[5vh]" @click="gohome"><</b>
        {{ name }}
        <var-menu placement="bottom" class="fixed right-2">
            <var-button color="transparent" text-color="#fff" round text>
                <var-icon name="menu" :size="30" />
            </var-button>
            <template #menu>
                <var-cell ripple @click="takeUrl">导出</var-cell>
                <var-cell ripple @click="deleteRegistration">删除</var-cell>
            </template>
        </var-menu>
    </var-paper>
    <div class="w-screen flex-col items-center flex ">
        <var-tabs
            elevation
            class="w-full "
            v-model:active="active"
        >
            <var-tab>进行时</var-tab>
            <var-tab>已结束</var-tab>
        </var-tabs>
        <var-tabs-items v-model:active="active">
            <var-tab-item >
                <div class="h-[88vh] overflow-auto mt-2">
                    <div class="w-screen flex-col items-center flex">
                        <var-paper class=" isBegin" >
                        正在面试
                        <var-paper class="w-full flex p-2 items-center mt-1" :elevation="3" v-for="(item,index) in queueList" v-show="item.isBegin && !item.isOver">
                            <span :style="{'background-color': rotatingColors[index % 3]}" class="text-2xl font-extrabold text-white w-[40px] bg-blue-500 h-[40px] rounded-full flex justify-center items-center">
                                {{ index + 1 }}
                            </span>
                            <span class="leading-[40px] w-[20%] break-all text-[24px] ml-4">{{ item.name }}</span>
                            <span class="leading-[40px] h-[40px] text-[18px] ml-4">{{ item.number }}</span>
                            <div class="ml-auto">
                                <var-button size="small mr-2" type="warning" @click="(isDelete = false), (info = true), (queue = item), (over = false)">撤回</var-button>
                                <var-button size="small" type="danger" @click="(isDelete = false), (info = true), (queue = item), (over = true)">结束</var-button>
                            </div>
                            
                        </var-paper>
                        <!-- 如果没有正在面试的人，显示提示 -->
                        <var-paper v-if="queueList.every(item => !item.isBegin)" class="w-full flex p-2 mt-1" :elevation="3">
                            <span class="text-lg text-gray-500">当前没有正在面试的人</span>
                        </var-paper>
                    </var-paper>
                    <var-paper class="wait  " >
                        等待中
                        <var-paper class="w-full flex p-2 mt-1 items-center" :elevation="2" v-for="(item,index) in queueList" v-show="!item.isBegin && !item.isOver">
                            <span :style="{'background-color': rotatingColors[index % 3]}" class="text-2xl font-extrabold text-white w-[40px] bg-blue-500 h-[40px] rounded-full flex justify-center items-center">
                                {{ index + 1 }}
                            </span>
                            <span class="leading-[40px] break-words w-[20%]  text-[24px] ml-4">{{ item.name }}</span>
                            <span class="leading-[40px] h-[40px] text-[18px] ml-4">{{ item.number }}</span>
                            <div class="ml-auto">
                                <var-button size="small" type="danger" class="mr-2" @click="(isDelete = true), (info = true), (queue = item), (over = false)">删除</var-button>
                                <var-button size="small" type="success"  @click="(isDelete = false), (info = true), (queue = item), (over = false)">开启</var-button>
                            </div>
                            </var-paper>
                    </var-paper>
                    </div>
                    
                </div>
            </var-tab-item>
            <var-tab-item>
                <div class="h-[88vh] overflow-auto mt-2">
                    <div class="w-screen flex-col items-center flex">
                        <var-paper class="result1  mt-2" >
                            已结束
                            <var-paper class="w-full flex p-2 mt-1 items-center" :elevation="2" v-for="(item,index) in queueList" v-show="item.isOver">
                                <span :style="{'background-color': rotatingColors[index % 3]}" class="text-2xl font-extrabold text-white w-[40px] bg-blue-500 h-[40px] rounded-full flex justify-center items-center">
                                    {{ index  + 1}}
                                </span>
                                <span class="leading-[40px] w-[20%] break-all text-[24px] ml-4">{{ item.name }}</span>
                                <span class="leading-[40px] h-[40px] text-[18px] ml-4">{{ item.number }}</span>
                                <var-button size="small" type="danger" class="mr-2 ml-auto" @click="(isDelete = true), (info = true), (queue = item), (over = false)">删除</var-button>
                            </var-paper>
                        </var-paper>
                    </div>
                </div>
            </var-tab-item>
        </var-tabs-items>
        <div class="fixed bottom-12 right-5">
            <var-paper :elevation="7" :width="60" :height="60" round ripple class="HET" @click="center = true">
                <Icon type="jia" extraclass="hat"/>
            </var-paper>
        </div>
        <var-popup :default-style="false" v-model:show="info">
            <div class="w-[50vw]">
                <var-result class="result w-full" :type="isDelete ? 'error' : over ? 'error' :queue.isBegin ? 'warning' : 'info'" :title="'确定' + (isDelete ? '删除' : over ? '结束' :queue.isBegin?'撤回':'开启') + '吗'" >
                    <template #footer>
                        <var-button class="mr-4" type="warning" @click="info = false">取消</var-button>
                        <var-button type="info" @click="changeType">确定</var-button>
                    </template>
                </var-result>
            </div>
        </var-popup>
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
import queue from '@/api/queue';
import { Snackbar } from '@varlet/ui';
import Icon from '@/components/icon.vue';
import publicApi from '@/api/public';
import registration from '@/api/registration';

export default{
    components: {
        Header,Icon
    },
    data() {
        return {
            center:false,
            isDelete:false,
            active:0,
            info:false,
            queueList: [],
            queue:{},
            over:false,
            newName:'',
            newNumber:'',
            rotatingColors: ['#DED5F2', '#CBF0F9', '#FDDDB4'], // 3 rotating colors
            name:'',
        };
    },
    methods: {
        gohome(){
            this.$router.push('/home');
        },
        //获取挂号人列表
        async getQueueList() {
            const res = await publicApi.getRegistrationDetail(this.$route.query.id);
            this.name = res[0].name;
            console.log(this.$route.query.id);
            const registrationId = this.$route.query.id;
            const queueList = await queue.getqueueList(registrationId);
            this.queueList = queueList;
            console.log(queueList);
            this.$forceUpdate();
        },
        //将挂号人状态改为正在面试或等待中
        async changeType() {
            if (this.isDelete) {
                console.log(this.queue.number, this.queue.registrationId);
                const res = await queue.deletequeue(this.queue.number, this.queue.registrationId);
                this.info = false;
                if (res.affectedRows == 0) {
                    Snackbar.success('操作成功');
                    this.getQueueList();
                } else {
                    Snackbar.error('操作失败');
                }
                return;
            }
            const res = await queue.createqueue(
                1,
                this.queue.name,
                this.queue.number,
                this.queue.registrationId,
                this.over?1:0,
                this.over?0:this.queue.isBegin?0:1
            );
            this.info = false;
            //睡眠等待
            setTimeout(() => {
                resolve();
            }, 1000);
            if (res.affectedRows == 1 || res.affectedRows == 10) {
                Snackbar.success('操作成功');
                this.getQueueList();
            } else {
                Snackbar.error('操作失败');
            }
        },
        async create(){
            if (this.newName == '') {
                Snackbar.warning('请输入姓名');
                return;
            }
            if (this.newNumber == '') {
                Snackbar.warning('请输入学号');
                return;
            }
            //学号只能为11位数字
            if (!/^\d{11}$/.test(this.newNumber)) {
                Snackbar.warning('学号只能为11位数字');
                return;
            }
            const res = await queue.createqueue(
                false,
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
                this.getQueueList();
            } else {
                Snackbar.error('操作失败');
            }
        },
        takeUrl(){
            //将当前页面的网址中的queue换为public后复制到剪贴板且跳转
            const url = window.location.href.replace('queue', 'public');
            const input = document.createElement('input');
            input.value = url;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
            Snackbar.success('复制成功');
            //跳转到该页面
            this.$router.push({ path:'/public',  query: { id: this.$route.query.id } });
        },
        async deleteRegistration(){
            const res = await registration.deleteRegistration(this.$route.query.id);
            setTimeout(() => {
                resolve();
            }, 1000);
            if (res.affectedRows == 1) {
                Snackbar.success('删除成功');
                this.$router.push('/home');
            } else {
                Snackbar.error('删除失败');
            }
        }
    },
    mounted() {
        this.getQueueList();
    }
}

</script>

<style scoped>
.head{
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
.result1 {
    width: 95vw;
    background-color: #FF9F00;
    padding: 10px;
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