<template>
    <view>

        <map-view :style = "{width:width,height:height}" :region = "region"    :on-press = "onPress" >

        

        <marker  v-if = "region != null" :description = "'h'" :title = "'my location'"  
        :coordinate = "{latitude: region.latitude, longitude: region.longitude}"/>

        <circle v-for="fence in fences" :key="fence.id" :center="{latitude:fence.coordinates.latitude, 
        longitude: fence.coordinates.longitude}"
         :radius="fence.size"/>


        </map-view>
        <!-- Could be visually made better, but that's not the point-->
        
        <circle-form v-on:create-fence = "createFence" v-on:close-editor="closeEditor" :coords="selectedLocation"/>

        <button :on-press = "createFences"> Add Fences </button>

    </view>
</template>

<script>

import {MapView, Location, Permissions} from 'expo';
import CircleForm from '../components/circleForm.vue';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import axios from 'axios';
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

       

        return {
            //current location.
            region: null,

            //Fences will be polygons and others.
            fences:[],
            drawing:EditEnum.Square,
            editing:false,
            width:width,
            height:height,
            selectedLocation:null


           
        };
    },

    mounted(){

        this.listenToLocation();

        //Also need to take in from prop, current fences to display.
    },
    
    beforeDestroy(){

        console.log("I happen");
        subscription();
    },
    

    props:{
        navigation:{
            type: Object
        },
        selectedHunt:{
            type: Object
        }
    },

    methods:{


        onChangeDrawMode(newMode){

            this.drawing = EditEnum[newMode];
        },


        finish(){

            this.fences = [...this.fences, this.editing];
            this.editing = false;
        },


        //size could be radius or width & height
        createFence(type,name, size){


            const newFence = {id:id++, type,name, size, coordinates: selectedLocation};
            this.fences = this.fences.concat(newFence);

        },

        createFences(){

            const fences = this.fences;

            //Ideally I batch all of these, and send. Don't think I have that yet.

            axios.post("/addFences",{
                huntId:this.selectedHunt.id,
                fences
            })
            .then( response => {

                console.log("response", response);
            })
            .catch(err => {

                console.log("error", err);
            });

        },

       
        onPress(e){


            const coords = e.nativeEvent.coordinate;
            this.selectedLocation = coords;
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

                        console.log("location change from watch", location);
                        const {coords} = location;

                        this.region = {

                            latitude: coords.latitude,
                            longitude: coords.longitude,
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

.button{

    position: absolute;
}

</style>
