<template>

    <view class = "form" v-if="coords != null">

        <text> {{ "Latitude: " + coords[1]}} </text>
        <text>  {{"Longitude: " + coords[0]}} </text>
        <text> Name </text>
        <text-input v-model="name" :style="{height: 40, borderColor: 'gray', borderWidth: 1}"/>        
        <text> Radius </text>
        <text-input v-model="radius" :style="{height: 40, borderColor: 'gray', borderWidth: 1}"/>
        <button class="button" :on-press="createFence" :title="'Create Fence'"/>
        <button class= "button" :on-press="closeEditor" :title = "'Close'"/>
    </view>
    <view v-else-if="coords == null">
        <text> Must press a location on Map where fences will be created </text>

    </view>


</template>


<script>

    export default{
        
        props:{
            coords:{
                type:Object
            },
            close:{
                type:Function
            },
            submit:{
                type:Function
            }
        },
        data(){

            return {
                //In meters
                name:"",
                radius:""
            }
        },

        methods:{

            createFence(){



                console.log("form emit", parseInt(this.radius));
                this.submit("Circle", this.name, parseInt(this.radius));
            },
            closeEditor(){

                this.close();
            }
        }
    }

</script>

<style>

    .form{
        
        background-color: white;
    }

    .textInput{

    }

    .button{

        margin-top: 5%;
    }
</style>