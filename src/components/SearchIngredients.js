import React, { Component } from 'react';
import $ from 'jquery';

class SearchIngredients extends Component {
  searchDb(e) {
    e.preventDefault();
    this.props.setDashboardState({
      search: '',
      searchResName: '',
      searchResLink: '',
      currentFlagged: [],
      data_uri: null,
      processing: false,
      passed: '',
      pastSearches: [],
    })
    var lowerCaseSearch = this.props.search.toLowerCase();
    var username = this.props.username;
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

  renderSearch(searchResName, link) {
    this.props.setDashboardState({
      searchResName: searchResName,
      searchResLink: link || ''
    });
  }

  handleSearch(event) {
    console.log('handleSearch')
    this.props.setDashboardState({
      search: event.target.value
    });
  }
  render() {
    return (
      <form
        className="form-control"
        onSubmit={this.searchDb.bind(this)}>
        <input
          className="Ingredient-input"
          type="text"
          value={this.props.search}
          placeholder="Search for Ingredient"
          onChange={this.handleSearch.bind(this)}
        />
        <input
          className="Submit-btn"
          type="submit"
          value="Submit"
        />
      </form>

    )
  }
}

export default SearchIngredients;
