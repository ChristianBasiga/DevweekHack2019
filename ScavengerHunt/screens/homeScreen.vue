<template>
    <view>     
        <HuntList v-bind:hunts="hunts" v-on:hunt-selected="selectHunt"/>
        <view>
            <button 
                :on-press="joinHunt"
                title="Join Hunt"    
            />

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
        axios.get('localhost:8080/getAllHunts')
        .then(res => this.hunts = res)
        .catch(err => console.log(err));

        alert("hello");
        console.log(this.navigation);
        
    },
    methods: {
        joinHunt(){
            this.navigation.navigate("Map", {
                    selectedHunt: this.selectedHunt});
        },
        createHunt(){
            this.navigation.navigate("Camera", {
                isParticipant: false,
                selectedHunt: this.selectedHunt
            });
        },
        selectHunt(hunt){
            this.selectedHunt = hunt;
        }
    }



}
</script>

<style>


</style>

