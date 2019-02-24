<template>
  <app-navigation>


    
  </app-navigation>
</template>
 
<script>
import { StackNavigator } from "vue-native-router";
import HomeScreen from "./screens/homeScreen.vue";
import CameraScreen from "./screens/cameraScreen.vue";
import MapScreen from "./screens/mapScreen.vue";
const AppNavigation = StackNavigator(
  {
    Home: HomeScreen,
    Camera: CameraScreen,
    Map: MapScreen
  },
  {
    initialrouteName: 'Home'
  }
);

export default {
  components: { AppNavigation }
}
</script>


<style>

</style>
