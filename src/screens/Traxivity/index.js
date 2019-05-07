import React, {Component} from 'react';
import HeaderBar from '../../components/HeaderBar';
import {
  Drawer,
  Container
} from 'native-base'
import SideBar from './SideBar'

export default class Traxivity extends Component {
  static navigationOptions = {
      drawerLabel: 'Traxivity'
  }

  openDrawer = () => {
    this.props.navigation.openDrawer()
  };

  render() {
    return (
      <HeaderBar title='Traxivity' icon='menu' onClick={ () => this.openDrawer() } />
    );
  }
}
