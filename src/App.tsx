import * as React from 'react';
import './App.css';

interface Props {

}

interface State {
  value: string,
  names: any[],
  isCkecked: boolean
}

class App extends React.Component<Props, State> {

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

    if (this.state.value === '') {
      window.alert('Please insert name');
    } else {
      this.addNamesToList();
    }

    this.setState({
      isCkecked: false,
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
        isCkecked: false,
        value: ''
      });
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
      window.alert("This name is checked");
    } else {
      window.alert("This name is unchecked");
    }
  }

  render() {
    const pageTitle = "Infinite loop";
    const text = "Enter team member";
    const buttonText = "Insert";
    const subtitle = "List of team members:";

    return (
      <div className="App">
        <div className="title">
          {pageTitle}
        </div>
        <form className="form">
          <label className="label">
            {text}
            <input type="text" className="input" value={this.state.value} onChange={this.onHandleChange} onKeyPress={this.onKeyPress} />
          </label>
          <button className="buttonSubmit" onClick={this.onSubmit}>{buttonText}</button>
        </form>
        <div className="list-title">{subtitle}</div>
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
