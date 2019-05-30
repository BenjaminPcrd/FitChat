import React, { Component } from "react";
import { Dimensions, Animated, Easing, FlatList } from 'react-native'
import ProgressCircle from 'react-native-progress-circle'
import {
  Container,
  Text,
  Spinner,
  ListItem
} from "native-base";

import HourlyChart from './HourlyChart'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

export default class DayProgress extends Component {
  constructor(props) {
    super(props)
    this.animatedValue = new Animated.Value(0)
    this.state = {
      circleProgressValue: 0,
      stepsProgressValue: 0,
      calProgressValue: 0,
      kmProgressValue: 0
    }
    this.isAnimationStart = false
    this.isAnimationEnd = false
  }

  componentDidUpdate() {
    if(this.isAnimationEnd) {
      this.isAnimationEnd = false
      this.animate()
    }
  }

  animate() {
    this.animatedValue.setValue(0)
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.cubic)
      }
    ).start(() => this.isAnimationEnd = true)
    this.animatedValue.addListener((res) => {
      this.setState({
        circleProgressValue: res.value*((this.props.nbSteps/this.props.goal)*100 >= 100 ? 100 : (this.props.nbSteps/this.props.goal)*100),
        stepsProgressValue: (res.value*this.props.nbSteps).toFixed(0),
        calProgressValue: (res.value*this.props.nbCal).toFixed(0),
        kmProgressValue: (res.value*this.props.km).toFixed(2)
      })
    })
  }

  render() {
    if(this.props.nbSteps != null && !this.isAnimationStart) {
      this.isAnimationStart = true
      this.animate()
    }

    if(this.props.nbSteps == null) {
      return <Container style={{justifyContent: 'center'}}><Spinner color='blue'/></Container>
    }

    return (
      <Container style={{marginTop: 10}}>
        <Container style={{flex: 4, alignItems: 'center'}}>
          <ProgressCircle
            percent={this.state.circleProgressValue}
            radius={screenHeight/6}
            borderWidth={15}
            color="rgb(63, 81, 181)"
            shadowColor='#c8c8c8'
            bgColor="white"
          >
            <Text style={{ fontSize: 20 }}>{(this.state.circleProgressValue).toFixed(0) + '% of goal'}</Text>
            <Text style={{ fontSize: 14, marginTop: 20, color: 'grey' }}>Your daily goal:</Text>
            <Text style={{ fontSize: 14 }}>{this.props.goal + ' steps'}</Text>
          </ProgressCircle>
        </Container>

        <Container style={{flex: 1, flexDirection: 'row', marginTop: 10, justifyContent: 'center'}}>
          <Container style={{alignItems: 'flex-end'}}>
            <Text style={{ fontSize: 22 }}>{this.state.stepsProgressValue}</Text>
            <Text style={{ fontSize: 15, color: 'grey' }}>steps</Text>
          </Container>
          <Container style={{alignItems: 'center'}}>
            <Text style={{ fontSize: 22 }}>{this.state.calProgressValue}</Text>
            <Text style={{ fontSize: 15, color: 'grey' }}>cal</Text>
          </Container>
          <Container style={{alignItems: 'flex-start'}}>
            <Text style={{ fontSize: 22 }}>{this.state.kmProgressValue}</Text>
            <Text style={{ fontSize: 15, color: 'grey' }}>km</Text>
          </Container>
        </Container>

        <Container style={{flex: 3, marginLeft: 5, marginRight: 5}}>
          <HourlyChart tabStep={this.props.tabStep}/>
        </Container>
      </Container>
    );
  }
}
