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

  componentWillReceiveProps() {
    this.setState({
      tabStep: null
    })
    setTimeout(() => {
      this.getInfos()
    }, 10);
  }

  componentDidMount() {
    this.getInfos()
  }

  getInfos() {
    var start = new Date(this.props.selectedDay.getFullYear(), this.props.selectedDay.getMonth(), this.props.selectedDay.getDate(), 0, 0, 0, 0)
    var end = new Date(this.props.selectedDay.getFullYear(), this.props.selectedDay.getMonth(), this.props.selectedDay.getDate(), 0, 0, 0, 0)
    start.setDate(start.getDate())
    end.setDate(end.getDate())
    var nbDays = start.getDay();
    if(nbDays == 0) nbDays = 7
    start.setDate(start.getDate() - (nbDays-1))
    start.setHours(0, 0, 0, 0)
    end.setHours(23, 59, 59, 999  )

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