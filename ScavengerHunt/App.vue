<template>
  <app-navigation>


    
  </app-navigation>
</template>
 
<script>
import { StackNavigator } from "vue-native-router";
import HomeScreen from "./screens/homeScreen.vue";
import CameraScreen from "./screens/cameraScreen.vue";
import MapScreen from "./screens/mapScreen.vue";

import Vue from 'vue-native-core'
import HTML from 'react-native-render-html'

Vue.component('html', HTML)
const AppNavigation = StackNavigator(
  {
    Map: MapScreen,
    Home: HomeScreen,
    Camera: CameraScreen,
  },
  {
    initialrouteName: 'Map'
  }
);


export default {
  components: { AppNavigation }
}
</script>


<style>

</style>
