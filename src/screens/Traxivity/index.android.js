import React, {Component} from 'react';
import { connect } from 'react-redux';
import HeaderBar from '../../components/HeaderBar';
import { DatePickerAndroid } from 'react-native';
import {
  Container,
  Tabs,
  Tab,
  TabHeading,
  Text
} from 'native-base';

import { setFSUserDailyStepGoal } from '../../api/firestoreUtils'
import { GoogleSignin } from 'react-native-google-signin';

import SideBar from './SideBar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DayTab from './DayTab';
import WeekTab from './WeekTab';

class Traxivity extends Component {
  constructor(props) {
    super(props)
    this.user = {}
  }

  state = {
    selectedDay: new Date()
  }

  async componentDidMount() {
    const user = await GoogleSignin.getCurrentUser() //setting the user
    this.user = user.user

    setFSUserDailyStepGoal(this.user, this.props.goal)
  }

  async datePicker() {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: this.state.selectedDay,
        maxDate: new Date()
      });

      if (action === DatePickerAndroid.dateSetAction) {
        this.setState({selectedDay: new Date(year, month, day, 0, 0, 0, 0)})
      }

    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  render() {
    return (
      <Container>
        <HeaderBar
          title='Traxivity'
          onLeftButton={ () => this.props.navigation.openDrawer() }
          onRightButton={ () => this.datePicker()}
          rightLabel={this.state.selectedDay.toDateString()}/>
        <Tabs>
          <Tab heading={ <TabHeading><Icon name="calendar-today" size={25} color={"white"}/><Text>Day</Text></TabHeading>}>
            <DayTab selectedDay={this.state.selectedDay}/>
          </Tab>
          <Tab heading={ <TabHeading><Icon name="calendar-week" size={25} color={"white"}/><Text>Week</Text></TabHeading>}>
            <WeekTab selectedDay={this.state.selectedDay}/>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    goal: state.setNewGoal.goal
  }
}

export default connect(mapStateToProps)(Traxivity)
