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
        this.viewFenceOnMap = this.viewFenceOnMap.bind(this);
    }


    viewFenceOnMap(fence){



        //May move this into screens.
        //fuck man alot of these are being turned to screens
        //Maybe have a screen that just has this, or leave fence element here, but move the list there?
        //element itself is a screen lol.

        //Hmm, but passing as params not props..
        //Fuck man this is why I hate that it's not like normal router.
        //Since screen, and not component, sucks but tied to navigate params.
        //Unless instead of navigating screens I just 
        //have an if and render accordingly, but then I want to hide that tab bar, and would have to implement my own back with an 
        //X and close method. Latter not hard, but not sure how to go about former.
        //Also the stack header will be visible as well, that should be quick fix though.
        //and I want stuf o be uniform hmmmmmm.
        //Layered navigations??
        //Maybe like switch navigation.
        //defualt is tab view of item list and fence list, other options fence view and item view?
        //that makes sense, doesn't fix not passing in as props issue though.

        //WAIT IM RETARDED, MAPVIEW A SCREEN THAT USES FENCE VIEW OVERLAYING RESPECTIVE UI.
        //I ESTABLISHED THIS BUT FORGOT LMAO, literally I made it fleible to can be component.
        //I'm good, not WASTE OF TIME, because led me to think up the switch stuff.
        this.props.navigation.navigate("MapView", {

            //Actually prob same issue here, I open fence list, passing in params from navigation.
            fences: this.props.navigation.params.fences,
        });

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
            onViewMap = {this.viewFenceOnMap}
        />
    }

    render(){

        return <FlatList
        
            data = {this.props.navigation.params.fences}
            renderItem = {this.renderFenceElement}

        />

    }

}


FenceList.propTypes = {

    fences: PropTypes.array
};