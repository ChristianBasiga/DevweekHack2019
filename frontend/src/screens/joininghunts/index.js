import React, {Component} from 'react';
import {View,Text, FlatList} from 'react-native';
//Uses hunt view.
import HuntList from '../../library/components/HuntList';


export default class JoinHuntScreen extends Component{


    constructor(props){

        super(props);
        this.state = {

            hunts : [

                {title:"hunt1"},
                {title:"hunt2"}

            ],
        }

        this.onJoinHunt = this.onJoinHunt.bind(this);

    }

 
    onJoinHunt(hunt){


        //Later also pass in user state if joined hunt before, ie: amount of items caught.
        //Join cna be on hunt scren itself and this just goes there
        //so just goes to hunt, but not join.
        this.props.navigation.navigate("Hunt", {
            hunt: hunt,
            owned:false
        });
    }

    render(){

        return <View>
            <HuntList hunts = {this.state.hunts} onPress = {this.onJoinHunt}/>
        </View>
    }

}