<template>
    <view>     
            
            <HuntList :join= "joinHunt" :edit = "editHunt" :hunts = "hunts" />
           

            <button
                :on-press="createHunt"
                :title="'Create Hunt'"
            />


            
    </view>
</template>

<script>
import HuntList from "../components/huntList.vue";
import axios from "axios";
import urls from '../sitedata/urls.js';
const url = urls.backendURL;
console.log("url ", url);

const {CreateHunt, EditHunt, JoinHunt} = urls.routes;

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
    mounted(){
        // Get list of hunts
        
            //Post man fetches this fine.   
            axios.get(url+"/getAllHunts")
            .then(res => {

                //Always within data, GOTTA REMEMBER THIS FOR AXIOS REQUESTS.
                //alSO for checing objects don't forget to stringify, wasted so much time.
             //   alert(JSON.stringify(res));
                //console.log(res);
                this.hunts = res.data;
            })
            .catch(err => console.log(err));
    },
    methods: {
      

        joinHunt(hunt){     

            this.navigation.navigate("JoinHunt", {
                hunt:hunt
            });
        },
        editHunt(hunt){

            this.navigation.navigate("EditHunt",{
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

