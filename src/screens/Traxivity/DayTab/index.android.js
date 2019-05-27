import React, { Component } from "react";
import { connect } from 'react-redux';
import { authorize, getPeriodStepCount, getPeriodDistance, getPeriodCalorie } from '../../../api/googleFitApi'
import DayProgress from './DayProgress'
import { setFSUserDailyStepGoal } from '../../../api/firestoreUtils'

class DayTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nbSteps: null,
      tabStep: null,
      nbCal: null,
      km: null
    }
  }

  componentWillReceiveProps() {
    this.setState({
      nbSteps: null,
      tabStep: null,
      nbCal: null,
      km: null
    }, () => this.getInfos())
  }

  componentDidMount() {
    authorize(() => this.getInfos())
    setFSUserDailyStepGoal(this.props.user, this.props.goal)
  }

  async getInfos() {
    var start = new Date(this.props.selectedDay.getFullYear(), this.props.selectedDay.getMonth(), this.props.selectedDay.getDate(), 0, 0, 0, 0)
    var end = new Date(this.props.selectedDay.getFullYear(), this.props.selectedDay.getMonth(), this.props.selectedDay.getDate(), 0, 0, 0, 0)
    start.setHours(0, 0, 0, 0)
    end.setHours(23, 59, 59, 999)

    var nbSteps = await getPeriodStepCount(start, end).catch(err => console.warn(err))
    var km = await getPeriodDistance(start, end).catch(err => console.warn(err))
    var nbCal = await getPeriodCalorie(start, end).catch(err => console.warn(err))
    var tab = []
    for(i = 0; i < 24; i++) {
      start.setHours(i, 0, 0, 0)
      end.setHours(i, 59, 59, 999)
      var nbS = await getPeriodStepCount(start, end).catch(err => console.warn(err))
      tab[i] = nbS.length > 0 ? nbS[0].value : 0
    }

    this.setState({
      nbSteps: nbSteps[0] ? nbSteps[0].value : 0,
      km: km ? km[0].distance/1000 : 0,
      nbCal: nbCal ? nbCal : 0,
      tabStep: tab
    })
  }

  render() {
    return <DayProgress goal={this.props.goal} nbSteps={this.state.nbSteps} tabStep={this.state.tabStep} nbCal={this.state.nbCal} km={this.state.km} />
  }
}

const mapStateToProps = (state) => {
  return {
    goal: state.setUser.userDailyStepGoal,
    user: state.setUser.user
  }
}

export default connect(mapStateToProps)(DayTab)
