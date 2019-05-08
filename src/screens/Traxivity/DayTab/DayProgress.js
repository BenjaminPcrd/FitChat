import React, { Component } from "react";
import { Dimensions, Animated, FlatList } from 'react-native'
import ProgressCircle from 'react-native-progress-circle'
import {
  Container,
  Text,
  Spinner,
  ListItem
} from "native-base";

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
        duration: 500,
        useNativeDriver: true
      }
    ).start(() => this.isAnimationEnd = true)
    this.animatedValue.addListener((res) => {
      this.setState({
        circleProgressValue: res.value*(this.props.nbSteps/this.props.goal)*100,
        stepsProgressValue: (res.value*this.props.nbSteps).toFixed(0),
        calProgressValue: (res.value*this.props.nbCal).toFixed(0),
        kmProgressValue: (res.value*this.props.km).toFixed(2)
      })
    })
  }

  render() {
    const screenWidth = Dimensions.get('window').width
    if(this.props.nbSteps != null && !this.isAnimationStart) {
      this.isAnimationStart = true
      this.animate()
    }

    if(this.props.nbSteps == null) {
      return <Container style={{justifyContent: 'center'}}><Spinner color='blue'/></Container>
    }

    return (
      <Container style={{alignItems: 'center', marginTop: 20}}>
        <ProgressCircle
          percent={this.state.circleProgressValue}
          radius={screenWidth/3}
          borderWidth={15}
          color="blue"
          shadowColor='#c8c8c8'
          bgColor="white"
        >
          <Text style={{ fontSize: 20 }}>{(this.state.circleProgressValue).toFixed(0) + '% of goal'}</Text>
          <Text style={{ fontSize: 14, marginTop: 20, color: 'grey' }}>Your daily goal:</Text>
          <Text style={{ fontSize: 14 }}>{this.props.goal + ' steps'}</Text>
        </ProgressCircle>

        <Container style={{flex: 1, flexDirection: 'row', marginTop: 20, justifyContent: 'center'}}>
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

        <Container style={{flex: 3}}>
         {this.props.tabStep ? console.log() : <Container style={{justifyContent: 'center'}}><Spinner color='blue'/></Container> }
          <FlatList
            data={this.props.tabStep}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              if(item > 0) {
                return (
                  <ListItem>
                    <Text style={{ fontSize: 14, color: 'grey' }}> {index + ":00" + " - " + (index + 1) + ":00"} </Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}> {item} </Text>
                    <Text style={{ fontSize: 16 }}> {"steps"} </Text>
                  </ListItem>
                );
              }
            }}
          />
        </Container>
      </Container>
    );
  }
}
