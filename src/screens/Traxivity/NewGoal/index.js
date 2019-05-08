import React, { Component } from "react";
import {
  Container,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Text
} from "native-base";
import { Picker, Alert } from 'react-native';
import { connect } from 'react-redux'
import HeaderBar from '../../../components/HeaderBar';

class NewGoal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nbStep: this.props.goal.toString()
    }
  }

  componentDidMount() {
    this.setState({nbStep: this.props.goal.toString()})
  }

  _onConfirm() {
    Alert.alert(
      "You have chosen to walk " + this.state.nbStep + " steps a day",
      'Do you agree?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'I agree',
          onPress: () => {
            console.log('I agree Pressed')
            const action = { type: "SET_NEW_GOAL", value: Number(this.state.nbStep) }
            this.props.dispatch(action)
            this.props.navigation.navigate('Traxivity')
          }
        },
      ],
      {cancelable: false},
    );
  }

  render() {
    return (
      <Container>
        <HeaderBar title='Set New Goal' icon='menu' onClick={ () => this.props.navigation.openDrawer() } />
        <Container style={{margin: 20}} >
          <Container style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 20}}>Week's goal: {this.props.goal} steps per day.</Text>
            <Text style={{color: 'grey', fontSize: 15, marginTop: 10}}>Please set your new goal below</Text>
          </Container>

          <Container style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Picker
              selectedValue={this.state.nbStep}
              style={{height: 50, width: 110}}
              mode={'dialog'}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({nbStep: itemValue})
              }>
              {stepsTab.map((i) => (
                  <Picker.Item key={i} label={i} value={i}/>
              ))}
            </Picker>
          </Container>

          <Container style={{flex: 1, justifyContent: 'center'}}>
            <Button full onPress={ () => this._onConfirm()}>
              <Text>Confirm</Text>
            </Button>
          </Container>
        </Container>
      </Container>
    );
  }
}

var stepsTab = [];
for (var i = 3000; i <= 50000; i = i + 500) {
     stepsTab.push(i.toString());
}

const mapStateToProps = (state) => {
  return {
    goal: state.setNewGoal.goal
  }
}

export default connect(mapStateToProps)(NewGoal)
