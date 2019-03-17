
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View,Text, TouchableOpacity, StyleSheet} from 'react-native';
import {RNCamera as Camera} from 'react-native-camera';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



export default class CaptureItem extends Component{

    constructor(props){

        super(props);
        this.takePicture = this.takePicture.bind(this);
        this.bindCamera = this.bindCamera.bind(this);
    }

    async takePicture() {

        if (this.camera != null){
            const picture = await this.camera.takePictureAsync({
                base64:true,
                
                //Then after they process the picture, will resume it, will
                //pass in ref's function address to call.
                pauseAfterCapture: false
            });

            
            this.props.onCapture(picture);

         
        }

    }

    bindCamera(ref){

        this.camera = ref;

    }

    render(){

        return (<View style = {styles.container}>
            <Camera ref  = {this.bindCamera} style ={styles.preview}
            
            type={Camera.Constants.Type.back}
            flashMode={Camera.Constants.FlashMode.on}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
            
            >
            {/*Overlay maybe from capturing item to create hunt or for being in hunt*/}


                {this.props.renderOverlay()}
                <View style = {{flex:1, justifyContent:'center'}}>
                        <TouchableOpacity onPress={this.takePicture} style={styles.capture}>
                            <Text style={{ fontSize: 14 }}> CAPTURE </Text>
                        </TouchableOpacity>
                </View>
             </Camera>
           

        </View>);
    }

}

CaptureItem.propTypes = {

    onCapture : PropTypes.func.isRequired,
    renderOverlay : PropTypes.func,
}

const styles = StyleSheet.create({

    container: {
        width:wp('100%'),
        height:hp('100%')
      },
    preview: {
        flex: 1,        
        alignItems: 'center',
        justifyContent:'flex-end'
        
    },

    overlay:{

        justifyContent:'flex-start'
        
    },

    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
      },
});