<template>
    <div class="contantmain">
        <div class="headle">
            <div class="left">
                <b>{{ isDate }}</b>
            </div>
            <div class="right">
                <var-button type="primary" class="aton" v-if="isDate == '时间选择'" @click="backdate">返回</var-button>
                <var-button type="primary" class="bton" v-if="isDate == '日期选择'" @click="makedate">下一步</var-button>

                <var-button type="primary" class="bton" v-if="isDate == '时间选择'" @click="maketime">确定</var-button>
            </div>
        </div>
        <var-date-picker v-model="date" v-if="isDate == '日期选择'" class="datea" />
        <var-time-picker v-model="time" v-if="isDate == '时间选择'" class="datea" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            date: '',
            time: '',
            isDate: '日期选择'
        };
    },
    props: {
        matterTime: {
            type: String,
            default: ''
        },
        timeType: {
            type: String,
            default: ''
        }
    },
    created() {
        if (this.matterTime) {
            this.date = this.matterTime.split(' ')[0];
            this.time = this.matterTime.split(' ')[1];
        }
    },
    methods: {
        makedate() {
            this.isDate = '时间选择';
            console.log(this.timeType);
        },
        maketime() {
            this.isDate = '日期选择';
            var datedata = this.date + ' ' + this.time;
            this.$emit('time', { datedata, timeType: this.timeType });
        },
        backdate() {
            this.isDate = '日期选择';
        }
    },
    watch: {
        matterTime() {
            this.date = this.matterTime.split(' ')[0];
            this.time = this.matterTime.split(' ')[1];
        }
    }
};
</script>

<style>
.contantmain {
    width: 100%;
    height: 55vh;
    overflow: hidden;
    padding: 25px;
}
.headle {
    width: 100%;
    height: 10%;
    display: flex;
}
.left {
    width: 45%;
}
.right {
    width: 55%;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

.mainle {
    width: 100%;
    height: 70%;
}
.headle b {
    font-size: 25px;
}
.datea {
    transition: all 0.5s;
}
</style>
