<template>
    <view>

        <map-view :style = "{width:width,height:height}" :region = "region" />
        <marker  v-if = "region != null" class = "locationMarker" :description = "'h'" :title = "'my location'"     coordinate = "{latitude: region.latitude, longitude: region.longitude}"/>
    </view>
</template>

<script>

import {MapView, Location, Permissions} from 'expo';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const {Marker, Polygon, Circle}  = MapView;
var subscription = null;
export default {
    name: 'MapScreen',
    subscription:null,
    data(){


        const width = wp('100%');
        const height = hp('100%');
        return {
            //current location.
            region: null,
            fences:[],
            width,
            height,
        };
    },

    mounted(){

        this.listenToLocation();
    },
    
    beforeDestroy(){

        console.log("I happen");
        subscription();
    },
    

    props:{
        navigation:{
            type: Object
        }
    },

    methods:{

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
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
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
        Polygon,
        Circle,
        MapView
    }
}
</script>

<style>

.locationMarker{

    position:absolute;
}

</style>
