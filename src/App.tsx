import * as React from 'react';
import './App.css';

interface Props {

}

interface State {
  value: string,
  names: any[],
  isCkecked: boolean
}

const emptyFieldMessage = 'Please insert name';
const checked = 'This name is checked';
const unchecked = 'This name is unchecked';


class App extends React.Component<Props, State> {


  constructor(props: Props) {
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
      window.alert(emptyFieldMessage);
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
        window.alert(emptyFieldMessage);
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
      window.alert(checked);
    } else {
      window.alert(unchecked);
    }
  }

  render() {
    const pageTitle = 'Infinite loop';
    const text = 'Enter team member';
    const buttonText = 'Insert';
    const subtitle = 'List of team members:';

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
                <p key={name.toString()}>
                  {name}
                  <input type="checkbox" onChange={this.onCheckBoxChange} defaultChecked={this.state.isCkecked}></input>
                </p>
              );
            })
          }
        </form>
      </div>
    );
  }
}

export default App;
