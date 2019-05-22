import { createDrawerNavigator, createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import React from "react";
import VoiceBot from '../screens/VoiceBot';
import Traxivity from '../screens/Traxivity';
import NewGoal from '../screens/Traxivity/NewGoal'
import Settings from '../screens/Traxivity/Settings'
import Exercises from '../screens/Exercises';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dimensions } from 'react-native'


import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['ViewPagerAndroid']);

const TraxivityDrawer = createDrawerNavigator(
  {
    Traxivity: {
      screen: Traxivity,
      navigationOptions: {
        drawerLabel: "Traxivity",
        drawerIcon: (<Icon name={'walk'} size={25} color={"black"} />)
      }
    },
    NewGoal: {
      screen: NewGoal,
      navigationOptions: {
        drawerLabel: "Set New Goal",
        drawerIcon: (<Icon name={'target'} size={25} color={"black"} />)
      }
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        drawerLabel: "Settings",
        drawerIcon: (<Icon name={'settings'} size={25} color={"black"} />)
      }
    },
  },
  {
    drawerType: 'slide',
    drawerWidth: ((Dimensions.get('window').width)/3)*2,
    initialRouteName: "Traxivity",
  }
);//contentComponent: props => <SideBar {...props} />


const TabNavigator = createMaterialTopTabNavigator(
  {
    VoiceBot: {
      screen: VoiceBot,
      navigationOptions: {
        tabBarLabel: 'Voice Bot',
        tabBarIcon: ({ focused, horizontal, tintColor }) => { return <Icon name={'voice'} size={25} color={tintColor} /> }
      }
    },
    Traxivity: {
      screen : TraxivityDrawer,
      navigationOptions: {
        tabBarLabel: 'Traxivity',
        tabBarIcon: ({ focused, horizontal, tintColor }) => { return <Icon name={'walk'} size={25} color={tintColor} /> }
      }
    },
    Exercises: {
      screen: Exercises,
      navigationOptions: {
        tabBarLabel: 'Exercises',
        tabBarIcon: ({ focused, horizontal, tintColor }) => { return <Icon name={'weight'} size={25} color={tintColor} /> }
      }
    }
  },
  {
    lazy: false,
    bounces: false,
    initialRouteName: "VoiceBot",
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'rgb(70, 70, 200)', //blue
      inactiveTintColor: '#AAAAAA', //grey
      activeBackgroundColor: '#DDDDDD', //grey
      inactiveBackgroundColor: '#FFFFFF', //white
      upperCaseLabel: false,
      showLabel: true,
      showIcon: true,
      indicatorStyle: {
        backgroundColor: 'rgb(70, 70, 200)',
        height: 3
      },
      style: {
        backgroundColor: 'white',
        height: 65
      },
    },

  }
);

export default createAppContainer(TabNavigator)
