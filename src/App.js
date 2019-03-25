import React, { Component } from 'react';
import AnimatedNumbers from './AnimatedNumbers';
import './App.scss';

class App extends Component {
  state = { value: 200 };

  incrementor = null;


  /**
   * Starts incrementing value after mount
   */
  componentDidMount() {
    this.incrementValue();
  }


  /**
   * Stops increment value and cleanup on unmount
   */
  componentWillUnmount() {
    if (this.incrementor) {
      clearInterval(this.incrementor);
    }
  }


  /**
   * Increments value by 1 every 2secs and sets to state
   */
  incrementValue = () => {
    this.incrementor = setInterval(() => this.setState(state => ({ value: state.value + 1 })), 2000);
  };

  render() {
    const { value } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <div className="smaller">
            <AnimatedNumbers
              value={value}
              fontSize={16}
              formatOptions={{
                style: 'currency',
                currency: 'usd',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              }}
            />
          </div>
          <div className="bigger">
            <AnimatedNumbers
              value={value}
              fontSize={100}
              formatOptions={{
                style: 'currency',
                currency: 'usd',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              }}
            />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
