import React, { Component } from 'react';

class SearchIngredients extends Component {

  render() {
    return (
      <form
        className="form-control"
        onSubmit={this.props.searchDb}>
        <input
          className="Ingredient-input"
          type="text"
          value={this.props.search}
          placeholder="Search for Ingredient"
          onChange={this.props.handleSearch}
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
