

<template>

    <text v-model="name"> Name </text>


</template>




<script>

    import axios from 'axios';


    const url = "localhost:8080";
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
                    const hunt = await axios.post("/createHunt", {
                        name: this.name,
                    });

                    this.navigation.navigate("editHunt",{

                        hunt:this.hunt
                    });
                }
                catch(err){

                    console.log("error");
                }
            }
        }
    }


</script>