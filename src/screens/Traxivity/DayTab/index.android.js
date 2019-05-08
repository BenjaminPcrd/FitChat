import React, { Component } from "react";
import { getAuth, getPeriodStepCount, getDailyCalorieCount, getDailyDistanceCount } from '../../../api/googleFitApi'
import { connect } from 'react-redux';
import GoogleFit from 'react-native-google-fit'
import DayProgress from './DayProgress'

class DayTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nbSteps: null,
      tabStep: null,
      nbCal: null,
      km: null
    }
    getAuth()
  }

  componentDidMount() {
    GoogleFit.onAuthorize((res) => {
      var start = new Date()
      var end = new Date()
      start.setHours(0, 0, 0, 0)
      end.setHours(23, 59, 59, 999)

      getPeriodStepCount(start, end, (error, result) => {
        this.setState({ nbSteps: result[0].value })
      })

      getDailyCalorieCount((error, result) => {
        this.setState({ nbCal: result });
      })

      getDailyDistanceCount((error, result) => {
        this.setState({ km: result });
      })

      this.getStepsByHours()
    })
  }

  getStepsByHours() {
    var tab = []
    var start = new Date()
    var end = new Date()
    start.setHours(0, 0, 0, 0)
    end.setHours(0, 59, 59, 999)
    for(i = 0; i < 24; i++) {
      start.setHours(i, 0, 0, 0)
      end.setHours(i)
      getPeriodStepCount(start, end, (error, result) => {
        tab.push(result.length > 0 ? result[0].value : 0)
        if(tab.length == 24) {
          this.setState({tabStep: tab})
        }
      })
    }
  }

  render() {
    return <DayProgress goal={this.props.goal} nbSteps={this.state.nbSteps} tabStep={this.state.tabStep} nbCal={this.state.nbCal} km={this.state.km} />
  }
}

const mapStateToProps = (state) => {
  return {
    goal: state.setNewGoal.goal
  }
}

export default connect(mapStateToProps)(DayTab)
