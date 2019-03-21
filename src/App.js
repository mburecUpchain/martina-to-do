import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      names: [],
      isCkecked: false
    };

  }

  onHandleChange = (event) => {
    this.setState({
      value: event.target.value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.addNamesToList();
  }

  onKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addNamesToList();
    }
  }

  addNamesToList = () => {

    let names = this.state.names;
    names.push(this.state.value);

    this.setState({
      names
    });
  }

  onCheckBoxChange = () => {

    this.setState({
      isCkecked: !this.state.isCkecked
    });

    if (!this.state.isCkecked) {
      window.alert("this name is checked");
    } else {
      window.alert("this name is unchecked");
    }
  }

  render() {
    const pageTitle = "Infinite loop"
    const title = "Enter team members";
    return (
      <div className="App">
        <div className="title">
          {pageTitle}
        </div>
        <form className="form">
          <label className="label">
            {title}
            <input type="text" className="input" value={this.state.value} onChange={this.onHandleChange} onKeyPress={this.onKeyPress} />
          </label>
          <button className="buttonOK" onClick={this.onSubmit}>OK</button>
        </form>
        <form className="list-form">
          {
            this.state.names.map((name) => {
              return (
                <React.Fragment>
                  <p key={name.toString()}>
                    {name}
                    <input type="checkbox" onChange={this.onCheckBoxChange} defaultChecked={this.state.isCkecked}></input>
                  </p>
                </React.Fragment>
              );
            })
          }
        </form>
      </div>
    );
  }
}

export default App;
