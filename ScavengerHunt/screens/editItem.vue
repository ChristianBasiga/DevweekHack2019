<template>
    <view>
        <camera ref="camera">
            <view :style = "{width:wp,height:hp, position:'relative'}" >
                <button
                    class = "takePictureButton"
                    :on-press="takePicture"
                    title="Take Picture"
                />
                <button
                    :on-press="toggleParticipant"
                    title="Participant Toggle"
                />
            </view>
        </camera>
    </view>
</template>

<script>
import {Camera, Permissions} from "expo";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Alert} from 'react-native';
import axios from 'axios';
import uuid from "uuid/v4";

export default {
    name: 'CameraScreen',
    props:{
        navigation: {
            type: Object
        },
    },
    data: function(){
        return{
            hasCameraPermission: false,
            type: Camera.Constants.Type.back,
            wp:wp('100%'),
            hp:hp('100%'),
            picturesTaken: [],
            thumbNailIndex: 0,
            newItem = null,
            itemName = ""
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
                    console.log(result);
                    const {params} = this.navigation.state; // Sets params to object passed through navigation  
                    this.picturesTaken = this.picturesTaken.concat(result); 
                })
                .catch((err)=>{
                    console.log(err);
                });
            if(this.picturesTaken.length == 5){
                chooseThumbnail();
                addItem();
            }
        },
        addItem(){
            this.newItem = {
                id: uuid(),
                name: this.itemName,
                thumbnail: null
            }
            axios.post("localhost:8080/addItemToHunt", {
                huntId: this.hunt.id,
                photosOfItem: this.picturesTaken,
                item: this.newItem,
                thumbnail: this.picturesTaken[this.thumbNailIndex]
            })
            .catch(err => console.log(err))
        },
        chooseThumbnail(){
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

<style>
    .takePictureButton{
        margin-top:50px;
    }
</style>
