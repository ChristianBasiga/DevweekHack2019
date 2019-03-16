import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity, Image, StyleSheet,Text} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

//Every hunt view will have gallery of items.
//Along with all hunt info.


export default class HuntScreen extends React.PureComponent{



    render(){


        const {items, onPressItem} = this.props;
        return <View style = {styles.container}>
                {items && items.map(item => {

                    const imageSrc = "data:image/png;base64;" + item.thumbnail;
                    return <TouchableOpacity onPress = {() => {onPressItem(item)}} key = {item.name}>
                        <Text> {item.name}</Text>
                        </TouchableOpacity>
                })}
            </View>
    }

}


const styles = StyleSheet.create({


    container:{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-evenly",
        flexWrap:"wrap"
    },

    item:{
        width: wp('20%'),
        height: hp('20%'),
    }
})