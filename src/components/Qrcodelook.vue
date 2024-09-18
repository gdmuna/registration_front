<template>
    <div class="content">
        <div class="imgg">
            <img :src="cList.url" alt="" />
        </div>
        <div class="name">
            <var-input class="ippout" v-model="values" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        cList: {
            type: Object,
            default: () => {}
        }
    },
    date() {
        return {
            values: ''
        };
    },
    mouted() {
        this.values = this.cList.name;
    }
};
</script>
