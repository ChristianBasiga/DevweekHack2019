<template>
    <view>

        <map-view :style = "{width:width,height:height}" :region = "region"    :on-press = "onPress" >

        <polygon  v-for="fence in fences" :key="fence.id" :coordinates = "fence.coordinates" :holes = "fence.holes"
        :stroke-color="'#F00'" :fill-color="'rgba(255,0,0,0.5)'" :stroke-width="1"/>

        <polygon v-if="editing != null" :key = "editing.key" :coordinates="editing.coordinates" :holes = "editing.holes"
          :stroke-color="'#F00'" :fill-color="'rgba(255,0,0,0.5)'" :stroke-width="1"/>

        <marker  v-if = "region != null" :description = "'h'" :title = "'my location'"  
        :coordinate = "{latitude: region.latitude, longitude: region.longitude}"/>


        </map-view>

        <rect-form/>

    </view>
</template>

<script>

import {MapView, Location, Permissions} from 'expo';
import RectForm from '../components/rectForm.vue';
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
            editing:null,
            width:width,
            height:height,


           
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
            this.editing = null;
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

            if (!this.editing){


                this.editing = {
                    id: id++,
                    coordinates: [coords],
                    holes:[]
                };

                this.scrollEnabled = false;
            }
    
           
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
        RectForm
    }
}
</script>

<style scoped>

.button{

    position: absolute;
}

</style>
