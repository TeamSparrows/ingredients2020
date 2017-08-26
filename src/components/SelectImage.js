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
    _this.props.setDashboardState(obj)


    var data = {
      data_uri: this.props.data_uri,
      filename: this.props.filename,
      filetype: this.props.filetype,
      username: this.props.username
    }
    console.log('data', data)
    $.ajax({
      url: '/api/image',
      type: 'POST',
      data: data,
      dataType: 'json'
    })
    .done(function(data){
      console.log('.done data', data);
      if(data.slice(1).length === 0){
        _this.props.setDashboardState({
          passed: 'No Flagged Ingredients!'
        })
      }
      _this.props.renderCurrentFlagged({
        currentFlagged: data
      });
    })
  }

  handleFile(e) {
    console.log('hi')
    this.props.setDashboardState({
      search: '',
      searchResName: '',
      searchResLink: '',
      currentFlagged: [],
      processing: false,
      passed: '',
      pastSearches: [],
    })

    const reader = new FileReader();
    // console.log('FileReader', FileReader);
    const file = e.target.files[0];

    reader.onload = (upload) => {
      console.log('hii')
      this.props.setDashboardState({
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
        0
        <form
          className="form-control"
          onSubmit={this.handleSubmit.bind(this)}
          encType='multipart/form-data'>
          1
          <input
            className="custom-file-input"
            type='file'
            name='image'
            onChange={this.handleFile.bind(this)} />
            2
          <input
            className="Submit-btn neg-margin-t"
            type="submit"
            value="Submit"/>
            3
        </form>

      </div>
    )
  }
}

export default SelectImage;
