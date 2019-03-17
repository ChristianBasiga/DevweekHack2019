import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity, Image, StyleSheet,Text} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

//Every hunt view will have gallery of items.
//Along with all hunt info.


export default class Grid extends React.Component{



    render(){


        const {items, onPressItem, itemRender, keyExtractor, itemStyle} = this.props;
        
       // return <Text>sdfs</Text>
        return <View style = {styles.container}>

                {items && items.map(item => {


                    const key = keyExtractor(item);
                    return <TouchableOpacity onPress = {() => {onPressItem(item)}} key = {key} style = {itemStyle}>
                        {itemRender(item)}
                        {/*replace with images once set them */}
                        </TouchableOpacity>
                })}

            </View>
    }

}


const styles = StyleSheet.create({


    container:{
        //So I can do flex direction without saying flex, just all inherently flex. Good to know.
        flexDirection:'row',
        alignItems:'center',
        marginLeft:10,
    },

    item:{
       
    }
})