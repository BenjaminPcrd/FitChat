import React, { Component } from "react";
import { processColor } from 'react-native'
import {
  Container
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
      },
      animation: {
        durationY: 500,
        easingY: 'EaseInOutCubic'
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
        barWidth: 0.8,
      }
    }
    this.setState({data: data})
  }

  render() {
    return (
      <Container>
        <BarChart
          style={{flex: 1}}
          data={this.state.data}
          xAxis={this.state.xAxis}
          animation={this.state.animation}
          gridBackgroundColor={processColor('#ffffff')}
          visibleRange={{x: { min: 24, max: 24 }}}
          chartDescription={{text: ''}}
          touchEnabled={true}
          marker={{enabled: true}}
        />
      </Container>
    )
  }
}
