import React, { Component } from 'react';
import { render } from 'react-dom';
import Timer from './Timer';
import './style.css';

interface AppProps { }
interface AppState {
  name: string;
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Timer />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
