<template>

    <view>
        
        <button v-for="item in hunt.items" :key = "item.id" :title="join"/>

    </view>

</template>


<script>

    import axios from 'axios';

    const url = "https://scavengerhuntbackend.herokuapp.com";

    export default{

        props:{

            hunt:{
                type:Object
            }
        },
        


        methods:{

            editItem(){

                //Navigate to or open the edit item 
            }

        }
    }


</script>