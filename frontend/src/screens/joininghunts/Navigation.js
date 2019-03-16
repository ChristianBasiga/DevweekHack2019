import  { createStackNavigator } from 'react-navigation';

import JoinHunt from './index';



const navigator = createStackNavigator({

    JoinHunt : {screen:JoinHunt}

},
{
    initialRouteName: "JoinHunt"
})

navigator.navigationOptions = ({navigation}) => {

    let visible = true;


    //If not at root of stack where hunt list showed, do not show tabs.
    if (navigation.state.index > 0){

        visible = false;
    }

    return {
        tabBarVisible : visible
    };
}


export default navigator;