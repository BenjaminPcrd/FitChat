import React, {Component} from 'react';
import HeaderBar from '../../components/HeaderBar';
import {
  Container,
  Tabs,
  Tab,
  TabHeading,
  Text
} from 'native-base'
import SideBar from './SideBar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DayTab from './DayTab'
import WeekTab from './WeekTab'

export default class Traxivity extends Component {
  render() {
    return (
      <Container>
        <HeaderBar title='Traxivity' icon='menu' onClick={ () => this.props.navigation.openDrawer() } />
        <Tabs>
          <Tab heading={ <TabHeading><Icon name="calendar-today" size={25} color={"white"}/><Text>Day</Text></TabHeading>}>
            <DayTab />
          </Tab>
          <Tab heading={ <TabHeading><Icon name="calendar-week" size={25} color={"white"}/><Text>Week</Text></TabHeading>}>
            <WeekTab />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
