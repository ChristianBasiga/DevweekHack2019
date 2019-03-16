import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import PropTypes from 'prop-types';
import FenceElement from './FenceElement';

//Not pure because needs deep copy of arrays.
export default class FenceList extends Component{



    constructor(props){

        super(props);

        //Need to bind cause it will be accessing this instaces props in the callback.
        this.renderFenceElement = this.renderFenceElement.bind(this);
    }

    renderFenceElement({item}){

        return <FenceElement 
        
            fence = {item}
            //onViewMap will be navigated from higher level of navigation, cause only fences, items, and for edit
            //general are available for navigation.
            //though, I could add view map of hunt in navigation.
            //I mean it makes sense, but viewmap itself just won't be a tab but on the stack which is why needs to be higher
            //unless I add a stack, or pass the parent navigation here, which I could, instead of other one.
            //switching navigator.
            onPress = {this.props.onFencePressed}
        />
    }

    render(){

        return <FlatList
        
            data = {this.props.fences}
            renderItem = {this.renderFenceElement}

        />

    }

}


FenceList.propTypes = {

    fences: PropTypes.array,
    onFencePressed: PropTypes.func
};