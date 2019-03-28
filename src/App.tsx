import * as React from 'react';
import './App.css';
import logo from './images/inf.png';
import buttonClear from './images/clear.png';

interface Props {

}

interface State {
  value: string,
  uncheckedNames: any[],
  checkedNames: any[],
  isCkecked: boolean,
  selectedName: any
}

class App extends React.Component<Props, State> {


  constructor(props: Props) {
    super(props);

    this.state = {
      value: '',
      uncheckedNames: [],
      checkedNames: [],
      isCkecked: false,
      selectedName: null
    }

  }

  onHandleChange = (event) => {
    this.setState({
      value: event.target.value,
      uncheckedNames: this.state.uncheckedNames,
      checkedNames: this.state.checkedNames,
      isCkecked: false
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

    if (this.state.value !== '') {
      this.setState({
        uncheckedNames: this.state.uncheckedNames.concat(this.state.value),
        checkedNames: this.state.checkedNames,
        isCkecked: false,
        value: this.state.value
      });
    }
  }

  moveNames = () => {

    if (this.state.uncheckedNames.length > 0) {
      this.setState({
        checkedNames: this.state.uncheckedNames,
        isCkecked: true,
        uncheckedNames: this.state.uncheckedNames,
        value: this.state.value
      });
    } else if (this.state.checkedNames.length > 0) {
      this.addNamesToList();
      this.setState({
        checkedNames: this.state.uncheckedNames,
        isCkecked: true,
        uncheckedNames: this.state.uncheckedNames,
        value: this.state.value
      });
    }
  }

  onNameClick = () => {

    if (this.state.checkedNames.length > 0 && this.state.isCkecked === true) {
      this.addNamesToList();
    } else if (this.state.uncheckedNames.length > 0 && this.state.isCkecked === false) {
      this.moveNames();
    }
  }

  removeUncheckedNameFromList(item) {
    var newUncheckedNames = this.state.uncheckedNames.filter((_newItem) => {
      return _newItem != item
    });
    this.setState({
      uncheckedNames: newUncheckedNames
    });
  }

  removeCheckedNameFromList(item) {
    var newCheckedNames = this.state.checkedNames.filter((_newItem) => {
      return _newItem != item
    });
    this.setState({
      checkedNames: newCheckedNames
    });
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
            <input type="text" className="input" value={this.state.value} onChange={(event) => this.onHandleChange(event)} onKeyPress={(event) => this.onKeyPress(event)} />
          </label>
          <button className="buttonSubmit" onClick={(event) => this.onSubmit(event)}>Insert</button>
        </div>
        <div className="container">
          <div className="row">
            <div className="column">
              <div className="list-unchecked">List of unchecked team members:</div>
              <div className="list-form-uncehecked">
                {
                  this.state.uncheckedNames &&
                  this.state.uncheckedNames.map((name) => {
                    return (
                      <div>
                        <div id="flex-container">
                          <div className="flex-item" key={name.toString()} onClick={this.onNameClick}>
                            {name}
                          </div>
                          <input className="checkbox" type="checkbox" defaultChecked={this.state.isCkecked}></input>
                          <img className="clear-button" src={buttonClear} onClick={this.removeUncheckedNameFromList.bind(this, name)} />
                        </div>
                      </div>
                    );
                  })
                }
              </div>
            </div>
            <div className="column">
              <div className="list-checked">List of checked team members:</div>
              <div className="list-form-checked">
                {
                  this.state.checkedNames &&
                  this.state.checkedNames.map((name) => {
                    return (
                      <div>
                        <div id="flex-container">
                          <div className="flex-item" key={name.toString()} onClick={this.onNameClick}>
                            {name}
                          </div>
                          <input className="checkbox" type="checkbox" defaultChecked={this.state.isCkecked}></input>
                          <img className="clear-button" src={buttonClear} onClick={this.removeCheckedNameFromList.bind(this, name)} />
                        </div>
                      </div>
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