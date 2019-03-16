import React, {Component} from 'react';
import {Button} from 'react-native';

//Should just be function object, but like this semantics. and pure component ahcieves same effect of no state.
export default class HomeScreen extends React.PureComponent{

    constructor(props){

        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(screen){
        this.props.navigation.navigate(screen);
    }

    render(){

        return <View>

            <Button onPress = {() => {this.onClick("Join")}}> Join a Hunt!</Button>
            <Button onPress = {() => {this.onClick("Create")}}> Create a Hunt!</Button>
        </View>
    }
}