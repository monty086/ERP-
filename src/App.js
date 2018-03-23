import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// import './test.less'
import Login from './pages/login'

export default class App extends React.Component {
  render() {
    return (
      <div>
      
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code className='test-color'>src/App.js</code> and save to reload.
        </p> */}
        {this.props.children || <Login/> }
      </div>
    );
  }
}

