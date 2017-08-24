import React, { Component } from 'react';
import '../app.css';

class Callback extends Component {

  sendToDashboard() {
    return setTimeout(() => {
      this.props.history.push('/dashboard');
    }, 2000);
  }

  render() {

    return (
      <div>
        <h1>Please wait while we redirect you to the app</h1>
        {this.sendToDashboard()}
      </div>
    );
  }
}

export default Callback;
