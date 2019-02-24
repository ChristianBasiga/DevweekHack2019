<template>
    <view>
        <camera ref="camera">
            <view :style = "{width:wp,height:hp, position:'relative'}" >
        <button
            class = "takePictureButton"
            :on-press="takePicture"
            title="Take Picture"
        />
            </view>
        </camera>
    </view>
</template>

<script>
import {Camera, Permissions} from "expo";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default {
    name: 'CameraScreen',
    props:{
        isParticipant: {
            type: Boolean
        }
    },
    data: function(){
        return{
            hasCameraPermission: false,
            type: Camera.Constants.Type.back,
            wp:wp('100%'),
            hp:hp('100%'),
            picturesTaken: []
        }
    },
    mounted: function(){
        Permissions.askAsync(Permissions.CAMERA)
            .then(status => {
                hasCameraPermission = status.status == "granted" ? true : false;
            }).catch((err)=>{
                console.log(err);
            });
    },
    methods:{
        takePicture(){
                const options = {
                    base64: true,
                }
                this.$refs.camera.takePictureAsync(options)
                    .then(result => {
                        console.log(result);
                        
                        if(isParticipant){
                            
                        }
                        else{ //Creator.
                            this.picturesTaken = this.picturesTaken.concat(result);
                        }
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
                
                /*
                this.$refs.camera.

                .then( picture => {


                } )
                .err()
                */
        }
    },
    components:{
        Camera
    }

}
</script>

<style>
    .takePictureButton{
        margin-top:50px;
    }
</style>
