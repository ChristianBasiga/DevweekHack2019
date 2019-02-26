

<template>

    <view>
    <text > Name </text>
    <text-input v-model="name" :style="{height: 40, borderColor: 'gray', borderWidth: 1}"/>
    <button :on-press="createHunt" :title="'Create Hunt'"/>
    </view>

</template>




<script>

    import axios from 'axios';


    const url = "https://scavengerhuntbackend.herokuapp.com";
    export default{

        props:{

            navigation:{
                type:Object
            }
        },

        data(){
            return {
                name:"",
            }
        },



        methods:{

            async createHunt(){


                try{

                    console.log("this.name", this.name);
                    const hunt = await axios.post(url+"/createHunt", {
                        huntName: this.name,
                    });

                    alert((hunt.data.id));

                    this.navigation.navigate("EditHunt",{

                        hunt:hunt.data.id
                    });
                }
                catch(err){

                    console.log("error", err);
                }
            }
        }
    }


</script>