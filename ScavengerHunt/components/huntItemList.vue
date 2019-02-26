<template>
    <view>
        <HuntItem  v-for="huntItem in huntitems" :key = "huntItem.id"/>
    </view>
</template>

<script>
import HuntItem from "./huntItem.vue"

export default {
    name: 'HuntItemList',
    
    props: {

        huntItems:{
            type: Array
        }
    },

    components:{
        HuntItem
    }
}
</script>

<style>

</style>