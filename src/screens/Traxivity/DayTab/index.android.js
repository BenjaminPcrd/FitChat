import React, { Component } from "react";
import { getAuth } from '../../../api/googleFitApi'
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

  async getInfos() {
    var start = new Date(this.props.selectedDay.getFullYear(), this.props.selectedDay.getMonth(), this.props.selectedDay.getDate(), 0, 0, 0, 0)
    var end = new Date(this.props.selectedDay.getFullYear(), this.props.selectedDay.getMonth(), this.props.selectedDay.getDate(), 0, 0, 0, 0)
    start.setHours(0, 0, 0, 0)
    end.setHours(23, 59, 59, 999)
    var opt = { startDate: start, endDate: end }

    var nbSteps = await new Promise(resolve => { // daily steps
      GoogleFit.getDailyStepCountSamples(opt, (err, res) => {
        resolve(res.filter(obj => obj.source === "com.google.android.gms:estimated_steps")[0].steps)
      })
    })

    var km = await new Promise(resolve => { // daily km
      GoogleFit.getDailyDistanceSamples(opt, (err, res) => {
        resolve(res)
      })
    })

    opt = { startDate: start, endDate: end, basalCalculation: false }
    var nbCal = await new Promise(resolve => { // daily cal
      GoogleFit.getDailyCalorieSamples(opt, (err, res) => {
        resolve(res[0].calorie)
      })
    })

    var tab = []
    for(i = 0; i < 24; i++) {
      start.setHours(i, 0, 0, 0)
      end.setHours(i, 59, 59, 999)
      opt = { startDate: start, endDate: end }
      var nbS = await new Promise(resolve => { // daily steps
        GoogleFit.getDailyStepCountSamples(opt, (err, res) => {
          resolve(res.filter(obj => obj.source === "com.google.android.gms:estimated_steps")[0].steps)
        })
      })
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
    goal: state.setNewGoal.goal
  }
}

export default connect(mapStateToProps)(DayTab)
