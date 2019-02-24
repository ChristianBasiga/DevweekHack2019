<template>

    <view class = "form">

        <text> Width </text>
        <text-input v-model="width" :style="{height: 40, borderColor: 'gray', borderWidth: 1}"/>
        <text> Height</text>
        <text-input v-model="height" :style="{height: 40, borderColor: 'gray', borderWidth: 1}"/>

    </view>


</template>


<script>

    export default{
        
        data(){

            return {
                width:0,
                height:0
            }
        }
    }

</script>

<style>

    .form{
        position: absolute;
    }
</style>