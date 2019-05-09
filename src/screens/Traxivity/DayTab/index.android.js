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

  componentWillReceiveProps() {
    this.setState({
      nbSteps: null,
      tabStep: null,
      nbCal: null,
      km: null
    })
    setTimeout(() => {
      this.getInfos()
    }, 5);
  }

  componentDidMount() {
    GoogleFit.onAuthorize((res) => {
      this.getInfos()
    })
  }

  getInfos() {
    var start = new Date(this.props.selectedDay.getFullYear(), this.props.selectedDay.getMonth(), this.props.selectedDay.getDate(), 0, 0, 0, 0)
    var end = new Date(this.props.selectedDay.getFullYear(), this.props.selectedDay.getMonth(), this.props.selectedDay.getDate(), 0, 0, 0, 0)
    start.setHours(0, 0, 0, 0)
    end.setHours(23, 59, 59, 999)

    getPeriodStepCount(start, end, null, (error, result, i) => {
      this.setState({ nbSteps: result[0] ? result[0].value : 0 })
    })

    getDailyCalorieCount(start, end, (error, result) => {
      this.setState({ nbCal: result ? result : 0 });
    })

    getDailyDistanceCount(start, end, (error, result) => {
      this.setState({ km: result ? result[0].distance/1000 : 0 });
    })

    var tab = []
    for(i = 0; i < 24; i++) {
      start.setHours(i, 0, 0, 0)
      end.setHours(i, 59, 59, 999)
      getPeriodStepCount(start, end, i, (error, result, i) => {
        tab[i] = result.length > 0 ? result[0].value : 0
      })
    }
    Promise.all(tab).then(() => {
      this.setState({tabStep: tab})
    })
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
