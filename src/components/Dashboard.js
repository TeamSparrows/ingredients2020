import React, { Component } from 'react';
import SearchIngredients from './searchIngredients';
import PastSearches from './pastSearches';
import SelectImage from './selectImage';
import RenderReslink from './renderReslink';
import Nav from './nav';
import '../app.css';
import { bindAll } from 'lodash';

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

    bindAll(this, 'setDashboardState', 'logout', 'renderCurrentFlagged');
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

  render() {
    return (
      <div className="Dashboard-btns">
        <Nav logout={this.logout}/>
        <SearchIngredients
          setDashboardState={this.setDashboardState}
          search={this.state.search}
          username={this.state.username}
        />

        <SelectImage
          imgSrc={this.state.data_uri}
          data_uri={this.state.data_uri}
          filename={this.state.filename}
          filetype={this.state.filetype}
          username={this.state.username}
        />

        <div className="Search-parent">
          { this.renderCurrentFlagged() }
          { this.state.passed && <div>{ this.state.passed }</div> }
        </div>

        <RenderReslink
          searchReslink={this.state.searchResLink}
          searchResName={this.state.searchResName}
        />

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
