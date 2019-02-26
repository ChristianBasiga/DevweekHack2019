<template>
    <view>     
        <view>
            
            <HuntList :goToHunt= "goToHunt" :hunts = "hunts" />
           

            <button
                :on-press="createHunt"
                title="Create Hunt"
            />
        </view>
    </view>
</template>

<script>
import HuntList from "../components/huntList.vue";
import axios from "axios";

export default {
    name: 'HomeScreen',
    components:{
        HuntList
    },
    props:{
        navigation:{
            type: Object
        }
    },
    data(){
        return{
            hunts: [],
            selectedHunt: null
        }
    },
    created(){
        // Get list of hunts
        axios.get('https://scavengerhuntbackend.herokuapp.com/getAllHunts')
        .then(res => {
            
            console.log(res);
            this.hunts = res
        })
        .catch(err => console.log(err));
    },
    methods: {
      
        goToHunt(hunt){

            this.navigation.navigate("JoinHunt", {
                hunt:hunt
            });
        },
        createHunt(){
            this.navigation.navigate("CreateHunt");
        }
    }



}
</script>

<style>


</style>

