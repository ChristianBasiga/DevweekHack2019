import React, {Component} from 'react';
import {View, Button} from 'react-native';
//Uses hunt view.
import HuntList from '../../library/components/HuntList';



export default class EditHuntsScreen extends Component{


    constructor(props){

        super(props);
        this.state = {

            hunts : [

                {title:"hunt1", items: [ {name:"item"}]},
                {title:"hunt2"}

            ],
        }

        this.onEditHunt = this.onEditHunt.bind(this);
        this.onCreateHunt = this.onCreateHunt.bind(this);

    }

 
    onEditHunt(hunt){


        //Later also pass in user state if joined hunt before, ie: amount of items caught.
        this.props.navigation.navigate("EditHunt", {
            hunt: hunt,
            owned:true,
        });
    }

    onCreateHunt(){

        //Later also pass in user state if joined hunt before, ie: amount of items caught.
        this.props.navigation.navigate("EditHunt", {
            hunt: null,
            owned:true,
            new:true
        });
        
    }
    

    render(){

        return <View>
            <HuntList hunts = {this.state.hunts} onPress = {this.onEditHunt}/>
            <Button onPress = {this.onCreateHunt} title = "Create Hunt"/>
        </View>
    }

}