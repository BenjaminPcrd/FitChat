import React, {Component} from 'react';
import AppContainer from './navigation/AppContainer'
import AppIntroSlider from 'react-native-app-intro-slider';
import { Provider } from 'react-redux'
import { persistor, store } from './store/configureStore'
import { PersistGate } from 'redux-persist/integration/react'

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

export default class App extends Component {
  state = { showRealApp: true }

  render() {
    if (this.state.showRealApp) {
      return (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppContainer />
          </PersistGate>
        </Provider>
      );
    } else {
      return <AppIntroSlider slides={slides} onDone={() => this.setState({ showRealApp: true })}/>;
    }
  }
}
