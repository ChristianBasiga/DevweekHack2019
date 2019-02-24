<template>
    <view >
        <view v-bind:key="hunt.id" v-for="hunt in hunts">
            <Hunt v-bind:hunt="hunt" />
        </view>
    </view>
</template>

<script>
import Hunt from "./hunt.vue";

export default {

    name: 'HuntList',
    props: ["hunts"],
    components:{
        Hunt
    }
}
</script>

