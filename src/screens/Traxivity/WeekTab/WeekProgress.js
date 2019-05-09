import React, { Component } from "react";
import { FlatList } from 'react-native';
import {
  Container,
  Text,
  ListItem,
  Spinner
} from "native-base";

export default class WeekProgress extends Component {
  render() {
    const arrSum = arr => arr.reduce((a,b) => a + b, 0)
    const arrAvg = arr => (arr.reduce((a,b) => a + b, 0) / arr.length).toFixed(0)
    const day = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    if(this.props.tabStep == null) {
      return <Container style={{justifyContent: 'center'}}><Spinner color='blue'/></Container>
    }
    
    return (
      <Container>
        <Container style={{flex: 1, alignItems: 'center', justifyContent: 'space-evenly'}}>
          <Container style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{ fontSize: 18, color: 'grey' }}>Steps sum:</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}> {this.props.tabStep.length > 0 ? arrSum((this.props.tabStep).map(item => item.value)) : "0"} </Text>
          </Container>

          <Container style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{ fontSize: 18, color: 'grey' }}>Steps average:</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}> {this.props.tabStep.length > 0 ? arrAvg((this.props.tabStep).map(item => item.value)) : "0"} </Text>
          </Container>
        </Container>

        <Container style={{flex: 3}}>
          <FlatList
            data={this.props.tabStep}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <ListItem>
                  <Text style={{ fontSize: 14, color: 'grey' }}> {day[index] + ", " + (item.date).split('-')[2] + " " + months[Number((item.date).split('-')[1]) - 1  ] + ":"} </Text>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}> {item.value} </Text>
                  <Text style={{ fontSize: 16 }}> {"steps"} </Text>
                </ListItem>
              );
            }}
          />
        </Container>
      </Container>
    );
  }
}
