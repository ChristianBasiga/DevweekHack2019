import {createStackNavigator} from 'react-navigation';
import Form from './index';
import Camera from './cameraView';


//Test this after eat.

const navigator = createStackNavigator(
    {
        Camera: Camera,
        Form:Form

    },
    {
        initialRouteName: "Form"
    }

);

//So form can't go back, it's back should be the root stack navigators back to edit hunt.
Form.navigationOptions = {
    header:null
}

//So that previous stack header gone during this process.
navigator.navigationOptions = ({navigation}) => {


    //Should hopefully work, need to test out.
    let showHeader = navigation.state.index == 0;

    if (showHeader)
        return {};
    else{
        return {
            header:null
        };
    }

}

export default navigator;