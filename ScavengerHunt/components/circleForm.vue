<template>

    <view class = "form">

        <text> Center: {{coords.toString()}}
        <text> Name </text>
        <text-input v-model="name" :style="{height: 40, borderColor: 'gray', borderWidth: 1}"/>        
        <text> Radius </text>
        <text-input v-model="radius" :style="{height: 40, borderColor: 'gray', borderWidth: 1}"/>
        <button :on-press="createFence"> Create Fence </button>
        <button :on-press="closeEditor"> Close </button>
    </view>


</template>


<script>

    export default{
        
        props:{
            coords:{
                type:Object
            }
        },
        data(){

            return {
                //In meters
                name,
                radius:0
            }
        },

        methods:{

            createFence(){


                this.$emit("create-fence", "Circle", name, radius);
            },
            closeEditor(){

                this.$emit("close-editor");
            }
        }
    }

</script>

<style>

    .form{
        position: absolute;
    }
</style>