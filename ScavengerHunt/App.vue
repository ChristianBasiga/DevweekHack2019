<template>
  <app-navigation>
  </app-navigation>
</template>
 
<script>
import { StackNavigator } from "vue-native-router";
import HomeScreen from "./screens/homeScreen.vue";
import CreateHuntScreen from './screens/createHunt.vue';
import HuntScreen from './screens/hunt.vue';
import EditHuntScreen from './screens/editHunt.vue';

const AppNavigation = StackNavigator(
  {
    Home: HomeScreen,
    CreateHunt: CreateHuntScreen,
    JoinHunt: HuntScreen,
    EditHunt: EditHuntScreen
  },
  {
    initialrouteName: 'Home'
  }
);


export default {
  components: { AppNavigation }
}
</script>