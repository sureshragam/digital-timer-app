// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {min: '25', sec: '00', isRunning: false}
  }

  onDecrement = () => {
    const {isRunning} = this.state
    if (!isRunning) {
      this.setState(prevState => ({min: parseInt(prevState.min) - 1}))
    }
  }

  onIncrement = () => {
    const {isRunning} = this.state
    if (!isRunning) {
      this.setState(prevState => ({min: parseInt(prevState.min) + 1}))
    }
  }

  onPauseOrPlay = () => {
    const {isRunning} = this.state
    if (!isRunning) {
      this.secIntervalId = setInterval(() => {
        const {sec, min} = this.state
        if (min === 0 && sec === 0) {
          clearInterval(this.secIntervalId)
          this.setState({min: '00', sec: '00', isRunning: false})
        } else if (sec === 0 || sec === '00') {
          this.setState(prevState => ({
            sec: 59,
            min: parseInt(prevState.min) - 1,
          }))
        } else {
          this.setState(prevState => ({sec: parseInt(prevState.sec) - 1}))
        }
      }, 1000)
    } else {
      clearInterval(this.secIntervalId)
    }
    this.setState(prevState => ({isRunning: !prevState.isRunning}))
  }

  onReset = () => {
    clearInterval(this.secIntervalId)
    this.setState({min: 25, sec: '00', isRunning: false})
  }

  render() {
    const {min, sec, isRunning} = this.state
    console.log(isRunning)

    return (
      <div className="digital-timer">
        <h1>Digital Timer</h1>
        <div className="row">
          <div className="col-1">
            <div className="circle-container">
              <h1 className="timer">
                {min}:{sec}
              </h1>
              <p>{isRunning ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="col-2">
            <div className="buttons-tab">
              <button type="button" onClick={this.onPauseOrPlay}>
                <img
                  src={
                    isRunning
                      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                  }
                  alt={isRunning ? 'Pause icon' : 'play icon'}
                />{' '}
                {isRunning ? 'Pause' : 'Start'}
              </button>
              <button type="button" onClick={this.onReset}>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                />{' '}
                Reset
              </button>
            </div>
            <p>Set Timer Limit</p>
            <div className="timer">
              <button type="button" onClick={this.onDecrement}>
                -
              </button>
              <input type="text" value={min} />
              <button type="button" onClick={this.onIncrement}>
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
