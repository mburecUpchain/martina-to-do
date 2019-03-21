import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

  }

  onHandleChange = (event) => {
    this.setState({
      value: event.target.value
    });
  }

  onSubmit = (event) => {
    console.log('clicked');
  }

  onKeyPress = (event) => {
    if (event.key === 'Enter') {
      console.log('enter');
    }
  }


  render() {
    return (
      <div className="App">
        <form className="form">
          <label className="label">
            Infinite loop team members:
            <input type="text" className="input" value={this.state.value} onChange={this.onHandleChange} onKeyPress={this.onKeyPress} />
          </label>
          <button className="buttonOK" onClick={this.onSubmit}>OK</button>
        </form>
      </div>
    );
  }
}

export default App;
