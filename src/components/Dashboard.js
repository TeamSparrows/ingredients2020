import React, { Component } from 'react';
import SearchIngredients from './SearchIngredients';
import PastSearches from './PastSearches';
import SelectImage from './SelectImage';
import '../App.css';
import { bindAll } from 'lodash';
import $ from 'jquery';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      searchResName: '',
      searchResLink: '',
      currentFlagged: [],
      data_uri: null,
      processing: false,
      passed: '',
      pastSearches: [],
      username: localStorage.getItem('username')
    };

    bindAll(this, 'renderPastSearches', 'handleFile', 'handleSearch', 'handleSubmit', 'searchDb', 'renderSearch', 'logout', 'renderCurrentFlagged', 'renderSearchResLink');
  }

  logout() {
    this.props.auth.logout();
    this.props.history.push('/');
  }

  renderPastSearches() {
    var data = {
      username: this.state.username
    }
    //here we need to create a get method to populate pastSearches array

    $.post('/api/pastSearches', {
      data: data
    })
    .done((items) => {
      //on sucess we set the new state
      var totalIngredients = items.reduce(function(total, el){
        return total.concat(el);
      }, []);
      this.setState({
        pastSearches: totalIngredients
      });
    })
    .fail(() => {
      console.log('failed getting items');
    });

  }

  handleSearch(event) {
    this.setState({
      search: event.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const _this = this;
    _this.setState({
      search: '',
      searchResName: '',
      searchResLink: '',
      currentFlagged: [],
      processing: false,
      passed: '',
      pastSearches: [],
    })
    var data = {
      data_uri: this.state.data_uri,
      filename: this.state.filename,
      filetype: this.state.filetype,
      username: this.state.username
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

  renderSearch(searchResName, link) {
    this.setState({
      searchResName: searchResName,
      searchResLink: link || ''
    });
  }

  searchDb(e) {
    e.preventDefault();
    this.setState({
      search: '',
      searchResName: '',
      searchResLink: '',
      currentFlagged: [],
      data_uri: null,
      processing: false,
      passed: '',
      pastSearches: [],
    })
    var lowerCaseSearch = this.state.search.toLowerCase();
    var username = this.state.username;
    var data = { ingredient: lowerCaseSearch, username: username }

    $.post('/api/ingredients', {
      data: data
    })
    .done((obj) => {
      this.renderSearch(obj.name, obj.link);
    })
    .fail((obj) => {
      this.renderSearch(obj.responseText);
    })
  }

  renderCurrentFlagged() {
    return (
      this.state.currentFlagged.map(function(ingredient) {
        <search className="Search-render" key={ingredient._id}>
          <h3>{ingredient.name}</h3>
          <p>{ingredient.link}</p>
        </search>
      })
    )
  }
  renderSearchResLink() {
    return this.state.searchResLink
      ? <div>{  this.state.searchResName + ' found in database! - '}
          <a href={this.state.searchResLink} target="_blank">{this.state.searchResLink }</a>
        </div>
      : <div>{ this.state.searchResName }</div>
  }


  render() {
    return (
      <div className="Dashboard-btns">
        <button className="Logout-btn" onClick={this.logout}>LOG OUT</button>
        <h2 className="App-header">Ingredients 20/20</h2>

        <SearchIngredients
          searchDb={this.searchDb}
          search={this.state.search}
          handleSearch={this.handleSearch}
        />

        <SelectImage
          handleSubmit={this.handleSubmit}
          handleFile={this.handleFile}
        />

        <img src={this.state.data_uri} className="Image-size" alt="" />

        <div className="Search-parent">
          { this.renderCurrentFlagged() }
          { this.state.passed && <div>{ this.state.passed }</div> }
        </div>

        { this.renderSearchResLink() }

        <PastSearches
          pastSearches={this.state.pastSearches} renderPastSearches={this.renderPastSearches}
        />
      </div>
    );
  }
}

export default Dashboard;
