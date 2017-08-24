import React, { Component } from 'react';

class SelectImage extends Component {
  render() {
    return (
      <form
        className="form-control"
        onSubmit={this.props.handleSubmit}
        encType='multipart/form-data'>
        <input
          className="custom-file-input"
          type='file'
          name='image'
          onChange={this.props.handleFile} />
        <input
          className="Submit-btn neg-margin-t"
          type="submit"
          value="Submit"/>
      </form>
    )
  }
}

export default SelectImage;
