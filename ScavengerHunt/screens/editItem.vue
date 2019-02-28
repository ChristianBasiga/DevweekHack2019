<template>
        <camera ref="camera" class = "camera" :style = "{width:wp,height:hp}">

            
            <!--<view class="cameraUI" :style = "{width:wp,height:hp}">-->

                <!-- To add later, going back and forth between pictures and deleting-->
                <text :style = "{paddingBottom:10}"> Pictures Taken {{picturesTaken.length + "/" + picturesToTake }} </text>
                <text> Item Name </text>
                <text-input placeholder = "Enter name of your item"
                :style = "{height: 40, borderColor:'gray', borderWidth:1,backgroundColor:'rgb(255,255,255)'}" v-model="itemName"/>
                
                <touchable-opacity
                    :on-press="takePicture"
                >

                    <image class="takePicture"
                        :source = "require('../assets/camera.png')"
                        :style = "{width:buttonWidth, height:buttonHeight, marginTop:50}"/>
                </touchable-opacity>

           <!-- </view>-->
            
        </camera>
</template>

<script>
import {Camera, Permissions} from "expo";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Alert} from 'react-native';
import axios from 'axios';
import uuid from "uuid/v4";

import urls from '../sitedata/urls.js';
const url = urls.backendURL;



//Need to test this, and make sure works, fix layout as well.

export default {
    
    name: 'CameraScreen',
    props:{
        navigation: {
            type: Object
        },
        hunt:{

            type: Object
        }
    },
    data: function(){
        return{
            hasCameraPermission: false,
            type: Camera.Constants.Type.back,
            wp:wp('100%'),
            hp:hp('90%'),
            fieldWidth:wp('30%'),
            buttonWidth:wp('30%'),
            buttonHeight:hp('30%'),
            picturesTaken: [],
            picturesToTake:5,
            thumbNailIndex: 0,
            newItem :null,
            itemName: ""
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
    created(){
        
    },
    methods:{

        takePicture(){
            const options = {
                base64: true,
            }
            this.$refs.camera.takePictureAsync(options)
                .then(result => {

                    const {params} = this.navigation.state; // Sets params to object passed through navigation  
                    this.picturesTaken = this.picturesTaken.concat(result); 
                     if(this.picturesTaken.length == 5){
                        this.chooseThumbnail();
                        this.addItem();
                    }
                })
                .catch((err)=>{
                    console.log(err);
                });
           
        },
        addItem(){
            this.newItem = {
                id: uuid(),
                name: this.itemName,
                thumbnail: null
            }
            axios.post(url+"/addItemToHunt", {

                huntId: this.hunt.id,
                photosOfItem: this.picturesTaken,
                item: this.newItem,
                thumbnail: this.picturesTaken[this.thumbNailIndex]
            })
            .catch(err => console.log(err))
        },
        chooseThumbnail(){

            console.log("I happen?");
            Alert.alert(
                "Choose Thumbnail",
                "Pick 1-5",
                [
                    {text: '1', onPress: () => this.thumbNailIndex = 0},
                    {text: '2', onPress: () => this.thumbNailIndex = 1},
                    {text: '3', onPress: () => this.thumbNailIndex = 2},
                    {text: '4', onPress: () => this.thumbNailIndex = 3},
                    {text: '5', onPress: () => this.thumbNailIndex = 4}
                ],
                {cancelable: false}
            );
        },
    },
    components:{
        Camera
    }

}
</script>

<style scoped>
   

   .camera{


       flex: 1;
       justify-content: center;
       align-items: center;
   }

    
</style>
