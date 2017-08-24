import React, { Component } from 'react';
import $ from 'jquery';
class SelectImage extends Component {

  handleSubmit(e) {
    e.preventDefault();
    const _this = this;
    const obj = {
      search: '',
      searchResName: '',
      searchResLink: '',
      currentFlagged: [],
      processing: false,
      passed: '',
      pastSearches: [],
    }
    console.log('obj', JSON.stringify(obj, null, 2));
    _this.setState(obj)


    var data = {
      data_uri: this.props.data_uri,
      filename: this.props.filename,
      filetype: this.props.filetype,
      username: this.props.username
    }

    $.ajax({
      url: '/api/image',
      type: 'POST',
      data: data,
      dataType: 'json'
    })
    .done(function(data){
      console.log(data);
      if(data.slice(1).length === 0){
        _this.setState({
          passed: 'No Flagged Ingredients, feel free to gobble this up!'
        })
      }
      _this.setState({
        currentFlagged: data
      });
    })
  }

  handleFile(e) {
    this.setState({
      search: '',
      searchResName: '',
      searchResLink: '',
      currentFlagged: [],
      processing: false,
      passed: '',
      pastSearches: [],
    })
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = (upload) => {
      this.setState({
        data_uri: upload.target.result,
        filename: file.name,
        filetype: file.type
      });
    };
    reader.readAsDataURL(file);
  }

  render() {
    return (
      <div>
        <form
          className="form-control"
          onSubmit={this.handleSubmit.bind(this)}
          encType='multipart/form-data'>
          <input
            className="custom-file-input"
            type='file'
            name='image'
            onChange={this.handleFile.bind(this)} />
          <input
            className="Submit-btn neg-margin-t"
            type="submit"
            value="Submit"/>
        </form>
        <img src={this.props.imgSrc} className="Image-size" alt="" />
      </div>
    )
  }
}

export default SelectImage;
