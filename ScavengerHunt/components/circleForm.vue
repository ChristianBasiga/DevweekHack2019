<template>

    <view class = "form">

        <text> {{ "Latitude: " + coords.latitude}} </text>
        <text>  {{"Longitude: " + coords.longitude}} </text>
        <text> Name </text>
        <text-input v-model="name" :style="{height: 40, borderColor: 'gray', borderWidth: 1}"/>        
        <text> Radius </text>
        <text-input v-model="radius" :style="{height: 40, borderColor: 'gray', borderWidth: 1}"/>
        <button class="button" :on-press="createFence" :title="'Create Fence'"/>
        <button class= "button" :on-press="closeEditor" :title = "'Close'"/>
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



                console.log("form emit");
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
        position: absolute;
        
        background-color: white;
    }

    .textInput{

    }

    .button{

        margin-top: 5%;
    }
</style>