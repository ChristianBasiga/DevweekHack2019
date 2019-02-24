<template>

    <view class = "form">

        <text> Radius </text>
        <text-input v-model="radius" :style="{height: 40, borderColor: 'gray', borderWidth: 1}"/>
        <button :on-press="createFence"> Create Fence </button>

    </view>


</template>


<script>

    export default{
        
        data(){

            return {
                //In meters
                radius:0
            }
        },

        methods:{

            createFence(){


                this.$emit("create-fence", "Circle", radius);
            }
        }
    }

</script>

<style>

    .form{
        position: absolute;
    }
</style>