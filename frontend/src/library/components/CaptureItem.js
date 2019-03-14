
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Camera from 'react-native-camera';



export default class CaptureItem extends Component{

    constructor(props){

        super(props);
        this.takePicture.bind(this);
    }

     takePicture(){

        this.camera.takePictureAsync({
            base64:true,
            //Then after they process the picture, will resume it, will
            //pass in ref's function address to call.
            pauseAfterCapture: true
        })
        .then (picture => {

            this.props.onCapture(this.camera.resumePreview, picture);

        })            
        .catch (err => {

            console.log("Failed to take picture");
        })

    }

    render(){

        return (<View style = {styles.container}>
            <Camera ref  = {this.camera = ref} style ={styles.preview}/>
            {/*Overlay maybe from capturing item to create hunt or for being in hunt*/}
            {this.props.overlay}
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={this.takePicture} style={styles.capture}>
                    <Text style={{ fontSize: 14 }}> CAPTURE </Text>
                </TouchableOpacity>
             </View>

        </View>);
    }

}

CaptureItem.propTypes = {

    onCapture : PropTypes.func.isRequired,
    overlay : PropTypes.element.isRequired
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
      },
    preview: {
        flex: 1,        
        justifyContent: 'flex-end',
        alignItems: 'center',
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