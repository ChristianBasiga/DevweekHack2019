<template>
    <view>
        <view v-bind:key="huntitem.id" v-for="huntitem in huntitems">
            <HuntItem v-bind:huntitem="huntitem"/>
        </view>
    </view>
</template>

<script>
import HuntItem from "./huntItem.vue"

export default {
    name: 'HuntItemList',
    props: ["huntitems"],
    components:{
        HuntItem
    }
}
</script>

<style>

</style>