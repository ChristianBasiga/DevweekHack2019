import React, {Component} from 'react';
import {View, Text} from 'react-native';

export default class EditItem extends Component{


    render(){

        //Next to do, implement this component.

        return <Text>
           Editing {this.props.navigation.getParam("item").name}
        </Text>

    }

}