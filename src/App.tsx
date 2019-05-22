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
    }
  }

  onHandleChange = (event) => {
    this.setState({
      value: event.target.value,
      uncheckedNames: this.state.uncheckedNames,
      checkedNames: this.state.checkedNames,
      isCkecked: this.state.isCkecked
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
        isCkecked: this.state.isCkecked,
        value: this.state.value
      });
    }
  }

  onNameClick = (item) => {

    var selectedName = this.state.uncheckedNames.includes(item);

    this.setState({
      uncheckedNames: selectedName ? this.state.uncheckedNames.filter(i => i !== item) : [...this.state.uncheckedNames, item],
      checkedNames: selectedName ? [...this.state.checkedNames, item] : this.state.checkedNames.filter(i => i !== item)
    });

    if (selectedName === true && !this.state.isCkecked) {
      this.setState({
        isCkecked: this.state.isCkecked
      });
    } else if (selectedName === false && this.state.isCkecked) {
      this.setState({
        isCkecked: !this.state.isCkecked
      });
    }
  }

  removeUncheckedNameFromList(item) {
    // var newUncheckedNames = this.state.uncheckedNames.filter((_newItem) => {
    //   return _newItem != item
    // });

    var newUncheckedNames = this.state.uncheckedNames;
    newUncheckedNames.splice(newUncheckedNames.indexOf(item), 1);


    this.setState({
      uncheckedNames: newUncheckedNames
    });

    console.log(item);
  }

  removeCheckedNameFromList(item) {
    // var newCheckedNames = this.state.checkedNames.filter((_newItem) => {
    //   return _newItem != item
    // });

    var newCheckedNames = this.state.checkedNames;
    newCheckedNames.splice(newCheckedNames.indexOf(item), 1);

    this.setState({
      checkedNames: newCheckedNames
    });

    console.log(item);
  }

  getLastCheckTime = () => {
    const lastCheckTime = new Date();
    console.log(lastCheckTime);
  }

  getLastUncheckTime = () => {
    const lastUncheckTime = new Date();
    console.log(lastUncheckTime);
  }

  onCheckboxChange = (item) => {

    //micanje itema na prvo mjesto u listi ako je checkbox označen
    var unceheckedNames = this.state.uncheckedNames;
    var checkedNames = this.state.checkedNames;
    if (this.state.isCkecked) {

      this.getLastUncheckTime();

      //ako je checkirani item na poziciji 0, pozicija se ne mijenja, a ako nije na poziciji 0
      if (unceheckedNames.indexOf(item) > 0) {
        //uzmemo index checkiranog itema i pomoću .splice mičemo iz polja 
        //splice - miče elemnt iz polja i na njegovo mjesto stavlja novi element vračajući izbrisani element
        unceheckedNames.splice(unceheckedNames.indexOf(item), 1);
        //vraćamo nazad item u polje na početak pomoću .unshift
        unceheckedNames.unshift(item);

        this.setState({
          uncheckedNames: unceheckedNames
        });
      }
    } else if (!this.state.isCkecked) {
     
      console.log("nameee");
      this.getLastCheckTime();
      if (checkedNames.indexOf(item) < unceheckedNames.length) {
        this.setState({
          checkedNames: checkedNames.concat(item)
        });
      }
    }
    this.setState({
      isCkecked: !this.state.isCkecked
    });
  }


  sortNames = () => {

    var sortedNamesUnchecked = this.state.uncheckedNames;
    if (sortedNamesUnchecked.length > 0) {
      sortedNamesUnchecked.sort();
    } else {
      window.alert("The unchecked list is empty. There is nothing to sort.");
    }


    // var sortedNamesChecked = this.state.checkedNames;
    // if (sortedNamesChecked.length > 0) {
    //   sortedNamesChecked.sort();
    // } else {
    //   window.alert("The checked list is empty. There is nothing to sort.");
    // }

    this.setState({
      uncheckedNames: sortedNamesUnchecked
      //checkedNames: sortedNamesChecked
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
          <button className="buttonSubmit" onClick={this.sortNames}>Sort</button>
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
                          <div className="flex-item" key={name.toString()} /*onClick={() => this.onNameClick(name)}*/>
                            {name}
                          </div>
                          <input className="checkbox" type="checkbox" onChange={() => this.onCheckboxChange(name)} defaultChecked={this.state.isCkecked}></input>
                          <img className="clear-button" src={buttonClear} onClick={this.removeUncheckedNameFromList.bind(this, name)} />
                        </div>
                      </div>
                    );
                  })
                }
              </div>
            </div>
            {/* <div className="spacer"></div>
            <button className="button-sort" onClick={this.sortNames}>Sort</button>
            <div className="spacer"></div>
            <div className="column">
              <div className="list-checked">List of checked team members:</div>
              <div className="list-form-checked">
                {
                  this.state.checkedNames &&
                  this.state.checkedNames.map((name) => {
                    return (
                      <div>
                        <div id="flex-container">
                          <div className="flex-item" key={name.toString()} onClick={() => this.onNameClick(name)}>
                            {name}
                          </div>
                          <input className="checkbox" type="checkbox" onChange={() => this.onCheckedCheckboxChange(name)} defaultChecked={!this.state.isCkecked}></input>
                          <img className="clear-button" src={buttonClear} onClick={this.removeCheckedNameFromList.bind(this, name)} />
                        </div>
                      </div>
                    );
                  })
                }
              </div>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
