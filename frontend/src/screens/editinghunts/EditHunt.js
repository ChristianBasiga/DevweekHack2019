import React, {PureComponent} from 'react';
import {View, Text, TextInput, FlatList, StyleSheet, Button} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import ItemGrid from '../../library/components/ItemGrid';
import FenceList from '../../library/components/FenceList';

export default class EditHuntScreen extends PureComponent{

    constructor(props){

        super(props);

        this.tabs = [

            {key:"Hunt"},
            {key:"Fences"},
            {key:"Items"}
        ];
        //Bind beforehan, otherwise mapped to callback object
        //Stupid reordering mistake wasted lke 8 minuetes after solved problem.
        this.renderGeneralTab = this.renderGeneralTab.bind(this);
        this.renderFenceList = this.renderFenceList.bind(this);
        this.renderItemGrid = this.renderItemGrid.bind(this);
        
        this.tabCallbacks = {
    
            [this.tabs[0].key]: this.renderGeneralTab,
            [this.tabs[1].key]: this.renderFenceList,
            [this.tabs[2].key]: this.renderItemGrid
        };

        const hunt = this.props.navigation.getParam("hunt");
        //This still needs submit that returns these values to overwrite the hunt
        //need to  keep key as well. In actual production will be uid
        this.state = {

            name: hunt.name,
            items:hunt.items,
            fences:hunt.fences,
            currentTab:this.tabs[0].key
        };

      
    


      

        this.onUpdateName = this.onUpdateName.bind(this);
        this.addItem = this.addItem.bind(this);
        this.addFence = this.addFence.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.removeFence = this.removeFence.bind(this);


        this.onEditItem = this.onEditItem.bind(this);
        this.onEditFence = this.onEditFence.bind(this);


        this.updateTab = this.updateTab.bind(this);
        this.openMapView = this.openMapView.bind(this);
    }


    saveChanges(){

        const {name, items, fences } = this.state;
        
        const updatedHunt = {
            name,
            items,
            fences
        };

        this.props.navigation.getParam("updateHunt")(updatedHunt);
    }

    updateTab(tab){

        this.setState({
            currentTab:tab.key
        });
    }


    onUpdateName(text){

        this.setState({
            name:text
        });

    }

    addItem(item){

        this.setState(state => {

            const items = state.items.concat(item);

            return {
                items
            };
        });

    }

    removeItem(item){

        this.setState(state => {

            const items = state.items.filter(i => i.name !== item.name);

            return {
                items
            };
        })

    }


    addFence(fence){

        this.setState(state => {

            const fences = state.fences.concat(fence);

            return {
                fences
            };
        });
    }

    
    removeFence(fence){

        this.setState(state => {

            const fences = state.fences.filter(f => f.name !== fence.name);

            return {
                fences
            };
        });
    }


    //Would've been easier with redux, could've just accessed same state.
    //Hindsight, after get prototype, will inject redux into this and optimize everything.
    //Also good to use redux again to stay fresh on it for the job applying to.

    //I also haven't taken into consideration how will pass base set of all hunts in App to others.
    //Unless make a pull into states of both tabs, filtering in firestore pull instead of selector.

    //It would be cleaner with redux, but also only need it for hunts, unless account for joining multiple hunts at once
    //then redux will be needed.

    onEditItem(item){

        this.props.navigation.navigate("EditItem", {

            item
        });
    }

    onEditFence(fence){

        this.props.navigation.navigate("EditFence", {

            fence
        });
    }

    openMapView(fence){

        //Navigates to FenceViewScreen, which has Fence View.


    }

    renderGeneralTab(){


        //Okay, so the 'this' objec
        console.log(JSON.stringify(this.state));
        return <View>
            <TextInput style = {styles.nameField} onChangeText = {this.onUpdateName} />
            <Text> {this.state.name} </Text>
 

        </View>
    }

    renderFenceList(){

        return <FenceList fences = {this.state.fences} viewFenceOnMap = {this.openMapView} onEditFence = {this.onEditFence}/>
    }

    renderItemGrid(){

        return <ItemGrid items = {this.state.items} onPressItem = {this.onEditItem}/>

    }

    

    //Oh wait I also need to do the selected part.
    renderTabs(){

        return <FlatList

            data = {this.tabs}
            horizontal = {true}
            renderItem = {({item}) => {

               let borderColor = item.key == this.state.currentTab? "black" : "gray"

                //Check if update tab works.
               return <Button style = {{backgroundColor: borderColor}} title= {item.key} onPress = {() => {this.updateTab(item);}}/> 
            }}
        />
    }


    render(){



        return <View>
                {this.renderTabs()}
                {this.tabCallbacks[this.state.currentTab]()}
                <Button title="Save Changes" onPress = {this.saveChanges}/>

        </View>
    }

}


const styles = StyleSheet.create({


    container:{
        flex:1
    },

    //Make this into a styled component
    nameField:{

        height:40,
        borderColor:'gray',
        borderWidth:1
    },

    fences:{

        flex:1,
        flexDirection:'row',
        flexWrap:'wrap'
    },

    fence:{

        width: wp('50%')
    }
})