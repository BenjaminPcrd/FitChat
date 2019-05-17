import React, { Component } from "react";
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
    }, () => this.getInfos())
  }

  componentDidMount() {
    this.getInfos()
  }

  async getInfos() {
    var start = new Date(this.props.selectedDay.getFullYear(), this.props.selectedDay.getMonth(), this.props.selectedDay.getDate(), 0, 0, 0, 0)
    var end = new Date(this.props.selectedDay.getFullYear(), this.props.selectedDay.getMonth(), this.props.selectedDay.getDate(), 0, 0, 0, 0)
    start.setDate(start.getDate())
    end.setDate(end.getDate())
    var nbDays = start.getDay();
    if(nbDays == 0) nbDays = 7
    start.setDate(start.getDate() - (nbDays-1))
    start.setHours(0, 0, 0, 0)
    end.setHours(23, 59, 59, 999  )

    var opt = { startDate: start, endDate: end }
    var tabStep = await new Promise(resolve => {
      GoogleFit.getDailyStepCountSamples(opt, (err, res) => {
        resolve(res.filter(obj => obj.source === "com.google.android.gms:estimated_steps")[0].steps)
      })
    })
    this.setState({tabStep: tabStep})
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
