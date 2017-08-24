import React, { Component } from 'react';
import SearchIngredients from './SearchIngredients';
import PastSearches from './PastSearches';
import SelectImage from './SelectImage';
import Nav from './Nav';
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

    bindAll(this, 'setDashboardState', 'logout', 'renderCurrentFlagged', 'renderSearchResLink');
  }

  setDashboardState(state) {
    this.setState(state);
  }
  logout() {
    this.props.auth.logout();
    this.props.history.push('/');
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
        <Nav />
        <SearchIngredients
          setDashboardState={this.setDashboardState}
          search={this.state.search}
          username={this.state.username}
          handleSearch={this.handleSearch}
        />

        <SelectImage imgSrc={this.state.data_uri}/>

        <div className="Search-parent">
          { this.renderCurrentFlagged() }
          { this.state.passed && <div>{ this.state.passed }</div> }
        </div>

        { this.renderSearchResLink() }

        <PastSearches
          pastSearches={this.state.pastSearches}
          username={this.state.username}
          setDashboardState={this.setDashboardState}
        />
      </div>
    );
  }
}

export default Dashboard;
