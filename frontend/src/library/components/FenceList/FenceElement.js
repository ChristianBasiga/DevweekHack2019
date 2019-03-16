import React, {PureComponent} from 'react';
import {View, Text, Button, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

//Pure cause has single object can shallow compare to.
export default class FenceElement extends PureComponent{

    constructor(props){

        super(props);


        //Background image by default is fence satellite, or what they set it to.

        this.state = {

            backgroundItem: props.fence
        };
    }

    renderHeader(){

        const fence = this.props.fence;

        return <View style = {styles.header}>

                <Text> {fence.name} </Text>
                
                <Text> {fence.generalLocation} </Text>
                <Button title = "View on Map" onPress = {() => {this.props.onPress(fence);}}/>


            </View>
    }

    updateBGItem(item){


        this.setState({
            backgroundItem : item
        });
    }

    renderBG(){

        const bg = `data:image/gif;base64,${this.state.backgroundItem.thumbnail}`;

        //Then bg will prob be own component too, as what's overlayed may change?
        //But latter down the line, CORE HOMIE, STOP THIS.
        return <Image style = {styles.background} source = {{uri:bg}}/>

    }

    renderFenceItem({item}){
        
        //having bg image not important to prototpye, CMON.
        return <FenceItem selected = {item.key === this.state.backgroundItem.key} item = {item} onPress = {this.updateBGItem}/>

    }
    renderFenceItems(){

        const {items} = this.props.fence;
     //   const data = [this.props.fence.thumbnal].concat([...items]);
        return <FlatList
            style = {styles.footer}
            data = {items}
            renderItem = {this.renderFenceItem}
            horizontal = {true}
        
        />
        
    }
    render(){


        return <View style = {styles.container}>

            {this.renderHeader()}
            {this.renderBG()}
            {this.renderFenceItems()}

        </View>


    }


}

FenceElement.propTypes = {

    fence: PropTypes.object,
    onPress: PropTypes.func,
    onItemPress: PropTypes.func
};


class FenceItem extends PureComponent{



    render(){

        const {selected, item, onPress} = this.props;
        const borderColor = selected? 'yellow' : 'white';
        const imageURI = "data:image/gif;base64," + item.thumbnail;

        return <TouchableOpacity style = {{borderColor: borderColor }} onPress = {() => {onPress(item);}}>
            <Image source = {{uri: imageURI}}/>
        </TouchableOpacity>
    }
}

FenceItem.propTypes = {

   item: PropTypes.object,
   selected: PropTypes.bool,
   onPress: PropTypes.func
};


const styles = StyleSheet.create({


    container:{
        flex:1,
        width:wp('100%')
    },

    header:{

        flex:1
    },

    background:{
        flex:2
    },

    footer:{

        flex:1,
    }
})