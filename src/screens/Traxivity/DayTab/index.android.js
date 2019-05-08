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
      nbCal: null,
      km: null
    }
    getAuth()
  }

  componentDidMount() {
    GoogleFit.onAuthorize((res) => {
      var start = new Date()
      var end = new Date()
      const UTC_OFFSET = start.getTimezoneOffset()/60
      start.setHours(0 - UTC_OFFSET, 0, 0, 0)
      end.setHours(23 - UTC_OFFSET, 59, 59, 999)

      getPeriodStepCount(start, end, (error, result) => {
        this.setState({nbSteps: result[0].value})
      })

      getDailyCalorieCount((error, result) => {
        this.setState({nbCal: result });
      })

      getDailyDistanceCount((error, result) => {
        this.setState({km: result });
      })
    })
  }

  render() {
    return <DayProgress goal={this.props.goal} nbSteps={this.state.nbSteps} nbCal={this.state.nbCal} km={this.state.km} />
  }
}

const mapStateToProps = (state) => {
  return {
    goal: state.setNewGoal.goal
  }
}

export default connect(mapStateToProps)(DayTab)
