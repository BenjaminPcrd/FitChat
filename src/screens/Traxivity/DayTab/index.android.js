import React, { Component } from "react";
import { getAuth, getDayStepCount, getDailyCalorieCount, getDailyDistanceCount } from '../../../api/googleFitApi'
import { connect } from 'react-redux';
import GoogleFit from 'react-native-google-fit'
import DayProgress from './DayProgress'

class DayTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nbSteps: 0,
      nbCal: 0,
      km: 0
    }
    getAuth()
  }

  componentDidMount() {
    GoogleFit.onAuthorize((res) => {
      getDayStepCount((error, result) => {
        this.setState({nbSteps: result})
        /*let percentProgress = 0;
        setInterval(() => {
          percentProgress += 1
          if(percentProgress > ((this.state.nbSteps/this.props.goal) * 100).toFixed(0)) {
            percentProgress = ((this.state.nbSteps/this.props.goal) * 100).toFixed(0)
          }
          this.setState({percentProgress });
        }, 10);*/
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
