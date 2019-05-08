import React, { Component } from "react";
import { getAuth, getPeriodStepCount, getDailyCalorieCount, getDailyDistanceCount } from '../../../api/googleFitApi'
import { connect } from 'react-redux';
import GoogleFit from 'react-native-google-fit'
import WeekProgress from './WeekProgress'

class WeekTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabStep: null
    }
  }

  componentDidMount() {
    var start = new Date()
    var end = new Date()
    start.setDate(start.getDate())
    end.setDate(end.getDate())
    var nbDays = start.getDay();
    if(nbDays == 0) nbDays = 7
    start.setDate(start.getDate() - (nbDays-1))
    end.setDate(end.getDate() + (6 - (nbDays-1)))
    start.setHours(0, 0, 0, 0)
    end.setHours(23, 59, 59, 999)

    getPeriodStepCount(start, end, null, (error, result, i) => {
      this.setState({tabStep: result})
    })
  }

  render() {
    return <WeekProgress tabStep={this.state.tabStep} />
  }
}

const mapStateToProps = (state) => {
  return {
    goal: state.setNewGoal.goal
  }
}

export default connect(mapStateToProps)(WeekTab)
