import React from 'react';
import PropTypes from 'prop-types';
import {Text,Button,StyleSheet} from 'react-native';
//Individual Hunt Items in a list.
export default class HuntElement extends React.PureComponent{




    render(){
        const {activeParticipants, beaten, name, location} = this.props.hunt;

        return (<View style = {styles.container}>

            <Text> {name} </Text>
            {/*Add Icon here later for active and beaten & location */}
            <Text> {activeParticipants} </Text>
            
            <Text> {beaten } </Text>
            <Text> {location} </Text>
            {/*Swap with icon*/}
            <Button onPress = {() => {this.props.onJoin(this.props.hunt)}}> Join </Button>
        </View>)
    }

}


HuntElement.propTypes = {

   /* activeParticipants: PropTypes.number,
    beaten: PropTypes.number,
    location: PropTypes.object,
    name: PropTypes.string,
*/
    onJoin: PropTypes.func,
    hunt: PropTypes.object,
};


const styles = StyleSheet.create({


    container: {
        flex:1,
        flexDirection:'row',
        justifyContent: 'space-between'
    }
})