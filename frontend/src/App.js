
import React, {Component} from 'react';
import  {createAppContainer, createBottomTabNavigator } from 'react-navigation';
import EditNavigator from './screens/editinghunts/Navigation';
import JoinNavigator from './screens/joininghunts/Navigation';
/*
import {Platform, StyleSheet, Text, View} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
*/


export default class App extends Component{

  //Loads in everything required, ie: all of the items.
  constructor(props){

    super(props);

    //I don't think redux really needed for just these 3.
    //We'll see.
    this.state = {
      hunts:[],
      cameraPermission:false,
      mapPermission:false,
    };
  }


  render(){

    return <AppContainer/>

  }

}

const AppSwitchNavigator = createBottomTabNavigator(
  {

    Create: {screen: EditNavigator},
    Join: {screen: JoinNavigator},
  },
  {
    initialRouteName: "Join"
  }
  );

const AppContainer = createAppContainer(AppSwitchNavigator)