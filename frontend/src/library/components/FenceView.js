import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import MapView, {Circle, Polyline} from 'react-native-maps';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default class FenceView extends Component{

    constructor(props){

        super(props);

        this.state = {

            region: props.region
        };

        this.fenceShapes = {
            Circle : "Circle",
            Rectangle : "Rectangle",
            Corridor: "Corridor",
            Polygon: "Polygon"
        };

        this.fenceColor = "green";

        this.onRegionChange = this.onRegionChange.bind(this);
    }

    onRegionChange(region){

        this.setState({region});
    }

    //On Click of fences should display the items in there.
    //Done through marker at center of fence & callout
    //Items will just through code be fences as well to implement hot / cold feature, but obviously
    //will not be rendered on map itself so that they can actually find it.
    renderItemsInFence(fence){


        return <View>

        </View>
    }


    renderRectangle(fence){

        return <View>
            

        </View>
    }

    renderCorridor(fence){

        return <View>


        </View>
    }

    renderPolygon(fence){

        return <View>

        </View>
    }

    render(){

        return <View style = {styles.container}>

            <MapView region = {this.state.region} onRegionChange = {this.onRegionChange}>

                {this.props.fences.map(fence => {

                    //Todo: Add markers on start of fences to  display items within that fence.

                    /*creates all the fences */
                    switch (fence.shapeType){

                        case this.fenceShapes.Circle:

                            return <Circle
                                center = {fence.coords}
                                radius = {fence.radius}
                                strokeColor = {this.fenceColor}
                                
                            />
                        case this.fenceShapes.Rectangle:

                            return renderRectangle(fence);

                        case this.fenceShapes.Corridor:

                            return renderCorridor(fence);
                    }

                })}

            </MapView>

            {/*The ui over the map, ie: shapes to create fences, etc. */}
            <Overlay style = {styles.overlay}>

                {this.props.renderOverlay()}

            </Overlay>

        </View>
    }


}


FenceView.propTypes = {

    //These actually will be passed in through params instead unfortunately.
    region: PropTypes.object,
    fences: PropTypes.array.isRequired,
    //Screens that use FenceView just need to do overlay themselves
    //this forces the need, but I don't like passing in element, so pass in function that returns it
    //Decorating keeps it flexible, but may not be aware that need to apply absolute positiong to do it.
    //this enforces an interface if you want to overlay on top of fence view.
    renderOverlay: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({

    container:{
        width: wp('100%'),
        height: hp('100%')
    },

    //Could change this to decorator or a function that returns a component instead of passing the component.
    overlay:{
        position: 'absolute',
    }
});
