import React, { Component } from "react";
import { Dimensions, processColor, StyleSheet } from 'react-native'
import {
  Container,
  Text
} from "native-base";

import {BarChart} from 'react-native-charts-wrapper';

export default class HourlyChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        dataSets: [{
          values: [],
          label: 'Number of steps',
          config: {
            color: processColor('teal')
          }
        }],
        config: {
          barWidth: 0.7,
        }
      },
      xAxis: {
        valueFormatter: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
        granularityEnabled: true,
        granularity : 1,
      }
    }
  }

  componentWillReceiveProps() {
    let data = {
      dataSets: [{
        values: this.props.tabStep ? this.props.tabStep : [],
        label: 'Number of steps',
        config: {
          color: processColor('teal')
        }
      }],
      config: {
        barWidth: 0.7,
      }
    }
    this.setState({data: data})
  }

  render() {
    return (
      <Container>
      <BarChart
        style={styles.chart}
        data={this.state.data}
        xAxis={this.state.xAxis}
        animation={{durationX: 1000}}
        gridBackgroundColor={processColor('#ffffff')}
        visibleRange={{x: { min: 24, max: 24 }}}
        drawBarShadow={false}
        chartDescription={{}}
      />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  chart: {
    flex: 1
  }
});
