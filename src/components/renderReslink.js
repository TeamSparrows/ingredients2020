import React, { Component } from 'react';

class RenderReslink extends Component {

  render() {
    return (
      this.props.searchResLink
      ? <div>{  this.props.searchResName + ' found in database! - '}
        <a href={this.props.searchResLink} target="_blank">{this.props.searchResLink }</a>
      </div>
      : <div>{this.props.searchResName}</div>
    )
  }
}

export default RenderReslink;
