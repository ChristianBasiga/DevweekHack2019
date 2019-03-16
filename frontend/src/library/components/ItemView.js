import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';


//Essentially the Item as it displays as an element in list.
//and the alternate view of previwing the picture.

//Will have just name, then options to item either as sub menu.

export default class ItemView extends Component{

    render(){

        const thumbnail = "data:image/png;base64;"+ this.props.thumbnailBase64;

        //With change in design, item view is more of a box in a grid layout.
        //There is it's form in grid layout, then the full screen version
        //which will have the links
        //Or, really I could just have the those items in gallery link to here.
        //makes more sense that way.
        return <View style = {styles.container}>

            <View style = {{flex:1, justifyContent:"space-between"}}>
               <Text style = {styles.name}> {name} </Text>

                {/* */}
               {this.props.onEditClicked && <TouchableOpacity onPress = {this.props.onEditClicked}>
                    <Icon name = "create"/>
                </TouchableOpacity>}

            </View>

            <Image style = {style.item} source = {{uri:thumbnail}}/>
            
            <View style = {styles.links}>
                <TouchableOpacity style = {styles.link} onPress = {this.props.onCaptureClicked}>
                    <Icon name = "camera" />
                </TouchableOpacity>
                <TouchableOpacity style = {styles.link} onPress = {this.props.onFindItemClicked}>
                    <Icon name = "navigate"/>
                </TouchableOpacity>
            </View>
        
        </View>
    }
}

ItemView.propTypes = {

    onCaptureClicked: PropTypes.func.isRequired,
    onFindItemClicked : PropTypes.func.isRequired,
    thumbnailBase64: PropTypes.string.isRequired,

    //Maybe no name at all? Hmm rethinking how should lay this out.
    //Name as header in preview, but it's like gallery for items to emphasize that it's hunting using pictures.
    name: PropTypes.string.isRequired,
    onEditClicked: PropTypes.func
}



const styles = StyleSheet.create({

    container:{

        flex:1,
        flexDirection:column,
        
    },
    name:{

    },

    item:{
        flex:3,
        width: wp('100%')
    },

    links:{
        flex:1,
        justifyContent: "flex-end"
    },
    link:{
        flex:1
    }
});