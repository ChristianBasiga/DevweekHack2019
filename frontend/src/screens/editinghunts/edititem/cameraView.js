import React, {PureComponent} from 'react';
import {View, Text} from 'react-native';
import CaptureItem from '../../../library/components/CaptureItem';

//Displays current picture loaded in, and give option to replace
//maybe instead of grid just do flat list so pictures full size initially?

//CORE, TAKE PICTURE, TRIGGER CALLBACK TO ADD PICTURE IN PREVIOUS SCREEN.
//NO DELETING, NO REPLACING, SIMPLY CREATE BASIC EDITS LIKE TEXT, AND THAT FENCE CREATION
//DO NOT WASTE TIME POLISH, PROOF OF CONCEPT MAN, PROOF OF CONCEPT!

export default class ItemCaptureScreen extends PureComponent{




    constructor(props){

        super(props);


        this.onCapture = this.onCapture.bind(this);
    }

    renderOverlay(){

        //Simple header like add item to interface.
        return <Text>
            Overlay of capture
        </Text>
    }

    onCapture(picture){


        this.props.navigation.getParam("onCapture")(picture);


        //Should notify, but can just go bac too, some kind of feedback that it was taken.
        //Test functionality first though.
    }

    render(){


        return <View>
                <CaptureItem renderOverlay = {this.renderOverlay} onCapture = {this.onCapture} />

        </View>
    }
}







