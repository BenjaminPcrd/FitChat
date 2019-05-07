import { createDrawerNavigator, createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import React from "react";
import VoiceBot from '../screens/VoiceBot';
import Traxivity from '../screens/Traxivity';
import Exercises from '../screens/Exercises';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['ViewPagerAndroid']);

const TraxivityDrawer = createDrawerNavigator(
  {
    Traxivity: {
      screen: Traxivity
    },


  },
  {
    initialRouteName: "Traxivity",

  }
);//contentComponent: props => <SideBar {...props} />

const TabNavigator = createMaterialTopTabNavigator(
  {
    VoiceBot: {
      screen: VoiceBot,
      navigationOptions: {
        tabBarLabel: 'Voice Bot',
        tabBarIcon: ({ focused, horizontal, tintColor }) => { return <MaterialIcons name={'record-voice-over'} size={25} color={tintColor} /> }
      }
    },
    Traxivity: {
      screen : TraxivityDrawer,
      navigationOptions: {
        tabBarLabel: 'Traxivity',
        tabBarIcon: ({ focused, horizontal, tintColor }) => { return <MaterialIcons name={'directions-walk'} size={25} color={tintColor} /> }
      }
    },
    Exercises: {
      screen: Exercises,
      navigationOptions: {
        tabBarLabel: 'Exercises',
        tabBarIcon: ({ focused, horizontal, tintColor }) => { return <MaterialIcons name={'fitness-center'} size={25} color={tintColor} /> }
      }
    }
  },
  {
    bounces: false,
    initialRouteName: "VoiceBot",
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#0000FF', //blue
      inactiveTintColor: '#AAAAAA', //grey
      activeBackgroundColor: '#DDDDDD', //grey
      inactiveBackgroundColor: '#FFFFFF', //white
      upperCaseLabel: false,
      showLabel: true,
      showIcon: true,
      indicatorStyle: {
        backgroundColor: '#0000FF'
      },
      style: {
        backgroundColor: 'white',
        height: 65
      },
    },

  }
);

export default createAppContainer(TabNavigator)
