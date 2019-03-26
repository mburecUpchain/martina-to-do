import * as React from 'react';
import './App.css';
import logo from './images/inf.png';

interface Props {

}

interface State {
  value: string,
  uncheckedNames: any[],
  checkedNames: any[],
  isCkecked: boolean
}

class App extends React.Component<Props, State> {


  constructor(props: Props) {
    super(props);

    this.state = {
      value: '',
      uncheckedNames: [],
      checkedNames: [],
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

    if (this.state.value === '') {
      window.alert('Please insert name');
    } else {
      this.addNamesToList();
    }

    this.setState({
      isCkecked: this.state.isCkecked,
      value: ''
    });
  }

  onKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (this.state.value === '') {
        window.alert('Please insert name');
      } else {
        this.addNamesToList();
      }
      this.setState({
        isCkecked: this.state.isCkecked,
        value: ''
      });
    }
  }

  addNamesToList = () => {

    let uncheckedNames = this.state.uncheckedNames;
    uncheckedNames.push(this.state.value);

    this.setState({
      uncheckedNames: uncheckedNames,
      isCkecked: !this.state.isCkecked,
      checkedNames: this.state.checkedNames
    });
  }

  moveNames = () => {

    let checkedNames = this.state.checkedNames;
    checkedNames.push(this.state.uncheckedNames);

    this.setState({
      checkedNames: checkedNames,
      isCkecked: !this.state.isCkecked,
      uncheckedNames: this.state.uncheckedNames
    });
  }

  // onCheckBoxChange = () => {

  //   if (!this.state.isCkecked) {
  //     this.moveNames();
  //   } else {
  //     this.addNamesToList();
  //   }
  // }

  onNameClick = () => {
    if (!this.state.isCkecked) {
      this.moveNames();
    } else {
      this.addNamesToList();
    }
  }

  render() {

    return (
      <div className="App">
        <div className="title">
          <img className="left-logo" src={logo} />
          Infinite loop
          <img className="right-logo" src={logo} />
        </div>
        <div className="form">
          <label className="label">
            Enter team member
            <input type="text" className="input" value={this.state.value} onChange={this.onHandleChange} onKeyPress={this.onKeyPress} />
          </label>
          <button className="buttonSubmit" onClick={this.onSubmit}>Insert</button>
        </div>
        <div className="container">
          <div className="row">
            <div className="column">
              <div className="list-unchecked">List of unchecked team members:</div>
              <div className="list-form-uncehecked">
                {
                  this.state.uncheckedNames.map((name) => {
                    return (
                      <p key={name.toString()} onClick={this.onNameClick}>
                        {name}
                        <input type="checkbox" defaultChecked={this.state.isCkecked}></input>
                      </p>
                    );
                  })
                }
              </div>
            </div>
            <div className="column">
              <div className="list-checked">List of checked team members:</div>
              <div className="list-form-checked">
                {
                  this.state.checkedNames.map((name) => {
                    return (
                      <p key={name.toString()} onClick={this.onNameClick}>
                        {name}
                        <input type="checkbox" defaultChecked={!this.state.isCkecked}></input>
                      </p>
                    );
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
