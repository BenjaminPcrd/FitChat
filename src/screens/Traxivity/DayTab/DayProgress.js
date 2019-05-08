import React, { Component } from "react";
import { Dimensions } from 'react-native'
import ProgressCircle from 'react-native-progress-circle'
import {
  Container,
  Text
} from "native-base";

export default class DayProgress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      progress: 0
    }
  }

  componentDidMount() {
    /*let p = 0
    setInterval(() => {
      p += 1
      if(p > ((this.props.nbSteps/this.props.goal) * 100).toFixed(0)) {
        p = ((this.props.nbSteps/this.props.goal) * 100).toFixed(0)
      }
      this.setState({progress: p})
    }, 10);*/
  }
  render() {
    const screenWidth = Dimensions.get('window').width
    return (
      <Container style={{alignItems: 'center', marginTop: 20}}>
        <ProgressCircle
          percent={Number(((this.props.nbSteps/this.props.goal)*100).toFixed(0))}
          radius={screenWidth/3}
          borderWidth={15}
          color="blue"
          shadowColor='#c8c8c8'
          bgColor="white"
        >
          <Text style={{ fontSize: 20 }}>{((this.props.nbSteps/this.props.goal)*100).toFixed(0) + '% of goal'}</Text>
          <Text style={{ fontSize: 14, marginTop: 20, color: 'grey' }}>Your daily goal:</Text>
          <Text style={{ fontSize: 14 }}>{this.props.goal + ' steps'}</Text>
        </ProgressCircle>
        <Container style={{flexDirection: 'row', marginTop: 20, justifyContent: 'center'}}>
          <Container style={{alignItems: 'flex-end'}}>
            <Text style={{ fontSize: 22 }}>{this.props.nbSteps}</Text>
            <Text style={{ fontSize: 15, color: 'grey' }}>steps</Text>
          </Container>
          <Container style={{alignItems: 'center'}}>
            <Text style={{ fontSize: 22 }}>{this.props.nbCal}</Text>
            <Text style={{ fontSize: 15, color: 'grey' }}>cal</Text>
          </Container>
          <Container style={{alignItems: 'flex-start'}}>
            <Text style={{ fontSize: 22 }}>{this.props.km}</Text>
            <Text style={{ fontSize: 15, color: 'grey' }}>km</Text>
          </Container>
        </Container>
      </Container>
    );
  }
}
