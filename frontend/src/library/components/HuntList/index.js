import React, {Component} from 'react';
import {View,Text, FlatList} from 'react-native';
//Uses hunt view.
import HuntElement from './HuntElement';
import PropTypes from 'prop-types';


export default class HuntList extends React.PureComponent{


    constructor(props){

        super(props);
        this.renderHuntElement = this.renderHuntElement.bind(this);
        this.keyExtractor = this.keyExtractor.bind(this);
        
    }


    renderHuntElement({item}){


        return <HuntElement
        //Each hunt has own uid in db, for now though just title.
            id = {item.title}  
            hunt = {item}
            onPress = {this.props.onPress}
        />

    }

    keyExtractor = (hunt, index) => hunt.title;
    render(){

        return <View>
            <FlatList
                data = {this.props.hunts}
                renderItem = {this.renderHuntElement}
                keyExtractor = {this.keyExtractor}
            />
        </View>
    }

}

HuntList.propTypes = {

    /* activeParticipants: PropTypes.number,
     beaten: PropTypes.number,
     location: PropTypes.object,
     name: PropTypes.string,
 */
     onPress: PropTypes.func,
     hunts: PropTypes.array,
 };
 