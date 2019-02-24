<template>
    <view>     
        <HuntList v-bind:hunts="hunts"/>
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
            hunts: []
        }
    },
    created(){

        alert("hello");
        console.log(this.navigation);
    },
    methods: {
        joinHunt(){
            this.navigation.navigate("Map");
        },
        createHunt(){
            
            this.navigation.navigate("Camera");
        }
    }



}
</script>

<style>


</style>

