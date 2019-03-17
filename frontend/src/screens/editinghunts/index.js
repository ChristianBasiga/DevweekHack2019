import React, {Component} from 'react';
import {View, Button} from 'react-native';
//Uses hunt view.
import HuntList from '../../library/components/HuntList';



export default class EditHuntsScreen extends Component{


    constructor(props){

        super(props);
        this.state = {

            hunts : [

                {title:"hunt1", items: [ {name:"item"},  {name:"item2"}], fences: [{name:"fence"}]},
                {title:"hunt2"}

            ],
        }

        this.onEditHunt = this.onEditHunt.bind(this);
        this.onCreateHunt = this.onCreateHunt.bind(this);
        this.updateHunt = this.updateHunt.bind(this);

    }

    updateHunt(hunt,original){

        this.setState(state => {

            //Prob easier if made it a map, keyed by name, but this is fine.
            const rest = state.hunts.filter(h => h.title !== original.title);
            console.log(JSON.stringify(state.hunts));

            console.log(JSON.stringify(rest));
            const huntsWithUpdate = rest.concat(hunt);

            return {
                hunts: huntsWithUpdate
            };

        })
        
    }
 
    onEditHunt(hunt){


        //Later also pass in user state if joined hunt before, ie: amount of items caught.
        this.props.navigation.navigate("EditHunt", {
            hunt: hunt,
            owned:true,
            updateHunt:this.updateHunt

        });
    }

    onCreateHunt(){

        //Later also pass in user state if joined hunt before, ie: amount of items caught.
        this.props.navigation.navigate("EditHunt", {
            hunt: null,
            owned:true,
            new:true,
            updateHunt:this.updateHunt

        });
        
    }
    

    render(){

        return <View>
            <HuntList hunts = {this.state.hunts} onPress = {this.onEditHunt}/>
            <Button onPress = {this.onCreateHunt} title = "Create Hunt"/>
        </View>
    }

}