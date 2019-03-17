import React, {Component} from 'react';
import {View, Text, TextInput, Picker,Button, Image, FlatList, StyleSheet,
TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Foundation';

import GlobalStyles from '../../../library/utils/globalStyles';

//Perhaps in utils have a gridiy or something.
import Grid from '../../../library/components/Grid';
//Can prob reuse itemgrid.


//This will have it's own navigation afteralll, to camera view and back.
//will be tabs
export default class EditItem extends Component{


    constructor(props){

        super(props);
        const item = props.navigation.getParam("item");

        this.state = {

            name:item.name,
            fenceInside:item.fenceInside,
            pictures: item.pictures || []
        };

        this.updateName = this.updateName.bind(this);
        this.updateFence = this.updateFence.bind(this);
        this.addPicture = this.addPicture.bind(this);

        this.goToCameraView = this.goToCameraView.bind(this);
    }

    updateName(name){

        this.setState({

            name
        });
    }

    updateFence(value, idx){

        this.setState({
            fenceInside:value
        });
    }

    //Gotta add methods for adding and removing pictures.
    //for now just adding is fine.

    addPicture(picture){


        this.setState(state => {

            const pictures = state.pictures.concat(picture);

            return {
                pictures
            };

        });
    }

    renderPicture(picture){

        //Will be actual Image component later.
        console.log(picture.base64);
        console.log(picture.uri);
        const imageSrc = "data:image/jpg;base64," + picture.base64;

        return <Image source = {picture} style = {styles.item}/>
    }

    goToCameraView(){

        //Navigates to cmaera view with CaptureItem component
        //This will be stack navigator actually, so I can go back
        //and I want to hide the header when there, so need to set nav options for that.

        this.props.navigation.navigate("Camera",{

            onCapture: this.addPicture
        });
    }


    pictureKey = (item) => item.base64;
    render(){

        //Next to do, implement this component.


        const {name, fenceInside, pictures} = this.state;
        const fences = this.props.navigation.getParam("fences");

        return <View>

            <Text> {name} </Text>
            <TextInput onChangeText = {this.updateName} style = {GlobalStyles.textField}/>


            <Text> Inside {fenceInside? fenceInside.name: "None"} </Text>
            {/*ANOTHER reason for redux, this will be a drop down of all fences within the hunt*/}
            <Picker
                selectedValue = {fenceInside? fenceInside.name : "None"}
                onValueChange = {this.updateFence} >
                
                <Picker.Item label = "None" value = {null}/>
                {fences && fences.map( fence => {

                    return <Picker.Item key = {fence.name} label = {fence.name} value = {fence.name}/>

                })}


            </Picker>

           
            <Grid items = {pictures} itemStyle = {styles.item} keyExtractor = {this.pictureKey} onPressItem = {this.goToCameraView} itemRender = {this.renderPicture}/>       
                {/*WASTED ALOT OF TIME, THIS IS NOT CORE WTF AM I DOING*/}
            <Icon.Button borderRadius = {0} onPress = {this.goToCameraView} name = "camera" size = {wp('20%')} style = { {alignSelf:'center'}} />
        </View>

    }

}

const styles = StyleSheet.create({

    footer:{

        marginTop: '20'
    },
    item:{

        width: wp('25%'),
        height:60
    }
})