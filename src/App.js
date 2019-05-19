import React, {Component} from 'react';
import AppContainer from './navigation/AppContainer'
import AppIntroSlider from 'react-native-app-intro-slider';
import { connect } from 'react-redux'

const slides = [
  {
    key: '1',
    title: 'Voice Bot',
    text: 'Description Voice Bot',
    image: null, //require('./assets/toto.jpeg'),
    backgroundColor: '#59b2ab',
  },
  {
    key: '2',
    title: 'Traxivity',
    text: 'Description Traxivity',
    image: null,
    backgroundColor: '#febe29',
  },
  {
    key: '3',
    title: 'Exercises',
    text: 'Description Exercises',
    image: null,
    backgroundColor: '#22bcb5',
  }
];

class App extends Component {
  render() {
    if(!this.props.isFirstLaunch) {
      return <AppContainer />
    } else {
      return <AppIntroSlider slides={slides} onDone={() => this.props.dispatch({ type: "SET_IS_FIRST_LAUNCH", value: false })}/>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isFirstLaunch: state.setIsFirstLaunch.isFirstLaunch,
  }
}

export default connect(mapStateToProps)(App)
