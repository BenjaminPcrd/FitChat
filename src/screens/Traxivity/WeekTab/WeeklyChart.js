import React, { Component } from "react";
import { processColor } from 'react-native'
import {
  Container
} from "native-base";

import { BarChart } from 'react-native-charts-wrapper';

export default class WeeklyChart extends Component {
  render() {
    const data = {
      dataSets: [{
        values: this.props.tabStep ? this.props.tabStep.map(item => item.value) : [],
        label: 'Number of steps',
        config: {
          color: processColor('teal')
        }
      }],
      config: {
        barWidth: 0.7,
      }
    }
    const xAxis = {
      valueFormatter: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      granularityEnabled: true,
      granularity : 1,
    }
    const animation = {
      durationY: 500,
      easingY: 'EaseOutCubic'
    }

    return (
      <Container>
        <BarChart
          style={{flex: 1}}
          data={data}
          xAxis={xAxis}
          animation={animation}
          gridBackgroundColor={processColor('#ffffff')}
          visibleRange={{x: { min: 7, max: 7 }}}
          chartDescription={{text: ''}}
        />
      </Container>
    )
  }
}