import React, { Component } from "react";
import { getAuth, getPeriodStepCount, getDailyCalorieCount, getDailyDistanceCount } from '../../../api/googleFitApi'
import { connect } from 'react-redux';
import GoogleFit from 'react-native-google-fit'
import WeekProgress from './WeekProgress'

class WeekTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nbSteps: null,
      tabStep: null
    }
  }

  componentDidMount() {
    var start = new Date()
    var end = new Date()
    start.setHours(0, 0, 0, 0)
    end.setHours(23, 59, 59, 999)

    getPeriodStepCount(start, end, (error, result) => {
      this.setState({ nbSteps: result[0].value })
    })
  }

  render() {
    return <WeekProgress nbSteps={this.state.nbSteps} tabStep={this.state.tabStep} />
  }
}

const mapStateToProps = (state) => {
  return {
    goal: state.setNewGoal.goal
  }
}

export default connect(mapStateToProps)(WeekTab)
