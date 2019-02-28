<template>
    <view>

        <map-view :style = "{width:width,height:height}" :region = "region"    :on-press = "onPress" >

        

        <marker  v-if = "region != null" :description = "'h'" :title = "'my location'"  
        :coordinate = "{latitude: region.latitude, longitude: region.longitude}"/>


        <circle v-for="fence in loadedFences" :key="fence.id" :center="{latitude:fence.coordinates[1], 
        longitude: fence.coordinates[0]}"
         :radius="fence.size"/>

        <circle v-for="fence in fences" :key="fence.id" :center="{latitude:fence.coordinates[1], 
        longitude: fence.coordinates[0]}"
         :radius="fence.size"/>


        </map-view>
        <!-- Could be visually made better, but that's not the point-->
xx
        <view class = "uiContainer">
        
        <circle-form v-if="editing" :submit = "createFence" :close="closeEditor" :coords="selectedLocation"/>
        
        <button class = "button" v-if="!editing" :on-press="openEditor" :title ="'Edit Fences'"/>

        <button class = "submitButton" v-if="fences.length > 0" :on-press = "createFences" :title="'Update Fences'"/>
        <button class = "closeButton" :title = "'Cancel'" :on-press = "cancel"/>

        </view>
    </view>
</template>

<script>

import {MapView, Location, Permissions} from 'expo';
import CircleForm from '../components/circleForm.vue';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import axios from 'axios';

import urls from '../sitedata/urls.js';
const url = urls.backendURL;

const {Marker, Square, Circle}  = MapView;
var subscription = null;
 const width = wp('100%');
const height = hp('100%');
const aspectRatio = width / height;
const longitudeDelta = 0.0922;
const latitudeDelta = longitudeDelta *  aspectRatio;
let id = 0;
var EditEnum =  Object.freeze({"Corridor": 0, "Circle": 1, "Square":1 })
export default {
    name: 'MapScreen',
    data(){

       

        console.log(JSON.stringify(this.selectedHunt));
        const loadedFences = this.selectedHunt.fences != null? [...this.selectedHunt.fences] : [];

        return {
            //current location.
            region: null,

            //Fences will be polygons and others.
            fences:[],
            drawing:EditEnum.Square,
            editing:false,
            width:width,
            height:height,
            selectedLocation:null,
            loadedFences:loadedFences
        };
    },

    mounted(){

        this.listenToLocation();
        this.loadFences();
        //Also need to take in from prop, current fences to display.
    },
    
    beforeDestroy(){

        subscription.remove();
    },
    

    props:{
        navigation:{
            type: Object
        },
        selectedHunt:{
            type: Object
        },
        close:{
            type:Function
        }
    },

    methods:{


        loadFences(){


            axios.get("")
        }

        openEditor(){

            
            this.editing = true;
        },
        onChangeDrawMode(newMode){

            this.drawing = EditEnum[newMode];
        },

        cancel(){

            
            this.close();
            
        },

        scan(){

            //Sends report request to server.

                axios.get(url+"/")
        },


        finish(){

            this.fences = [...this.fences, this.editing];
            this.editing = false;
        },


        //size could be radius or width & height
        createFence(type,name, size){


            console.log("map emitted to ", type, name, size);
            console.log("selected location", this.selectedLocation);
            const newFence = {id:id++, type,name, size, coordinates: this.selectedLocation};
            this.fences = this.fences.concat(newFence);
            this.editing = false;
        },

        createFences(){

            const fences = this.fences;

            //Ideally I batch all of these, and send. Don't think I have that yet.
            console.log("selected Hunt id " , this.selectedHunt.id);
            console.log("fences", JSON.stringify(fences));



            axios.post(url+"/createFences",{
                huntId:this.selectedHunt.id,
                fences
            })
            .then( response => {

                console.log("response", JSON.stringify(response));
            })
            .catch(err => {

                console.log("error", err);
            });

        },

       
        onPress(e){


            const coords = e.nativeEvent.coordinate;

            //Should change in baackend not here actually.
            this.selectedLocation = [coords.longitude, coords.latitude];
        },

        closeEditor(){

            this.editing = false;
        },
        onLocationChange(region){

          //  this.region = region;
        },

        async listenToLocation(){


        console.log("and here?");

        try{
                const grantedPosition = await Permissions.askAsync(Permissions.LOCATION)

                if (grantedPosition.status == "granted"){
                
                
                subscription = await Location.watchPositionAsync({}, (location) => {

                        //Test this while walking long distances.
                        console.log("location change from watch", location.coords.latitude);
                        const {coords} = location;

                        this.region = {

                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            longitudeDelta: longitudeDelta,
                            latitudeDelta: latitudeDelta
                        };
                    })
                
                }
        }
        catch(err){

            console.log("error", err);
        }

      
     }
    },

    components:{
        Marker, 
        Circle,
        MapView,
        CircleForm
    }
}
</script>

<style scoped>

.uiContainer{

    position: absolute;
    display:flex;
    align-content: center;
    justify-content: center;
}

.button{

}
.submitButton{
   
}

</style>
