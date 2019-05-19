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
        barWidth: 0.5
      }
    }
    let days = this.props.tabStep.map(item => item.date.split('-')[2])
    //['Mon, '+days[0], 'Tue, '+days[1], 'Wed, '+days[2], 'Thu, '+days[3], 'Fri, '+days[4], 'Sat, '+days[5], 'Sun, '+days[6]],
    const xAxis = {
      valueFormatter: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      labelRotationAngle: 0,
      granularityEnabled: true,
      granularity : 1,
      drawAxisLine: true,
      drawGridLines: false,
      position: "BOTTOM"
    }
    const yAxis = {
      left: {
        enabled: true,
        spaceBottom: 10,
        limitLines: [{
          limit: this.props.goal,
          label: 'Goal',
          lineWidth: 2,
          lineDashPhase: 0,
          lineDashLengths: [25, 25]
        }]
      },
      right: {
        enabled: false
      }
    }
    const animation = {
      durationY: 500,
      easingY: 'EaseOutCubic'
    }
    const legend = {
      enabled: true
    }

    return (
      <Container>
        <BarChart
          style={{flex: 1}}
          data={data}
          xAxis={xAxis}
          yAxis={yAxis}
          animation={animation}
          legend={legend}
          gridBackgroundColor={processColor('#ffffff')}
          visibleRange={{x: { min: 7, max: 7 }}}
          chartDescription={{text: ''}}
          touchEnabled={true}
          marker={{enabled: true}}

        />
      </Container>
    )
  }
}
