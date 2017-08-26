import React, { Component } from 'react';
import SearchIngredients from './SearchIngredients';
import PastSearches from './PastSearches';
import SelectImage from './SelectImage';
import RenderReslink from './RenderReslink';
import Nav from './Nav';
import '../App.css';
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

    bindAll(this, 'setDashboardState', 'logout', 'renderCurrentFlagged', 'renderReslink');
  }

  setDashboardState(data) {
    this.setState(data);
  }
  logout() {
    this.props.auth.logout();
    this.props.history.push('/');
  }
  renderReslink() {
    return (
        this.state.searchResLink
          ? <div>{  this.state.searchResName + ' found in database! - '}
              <a href={this.state.searchResLink} target="_blank">{this.state.searchResLink }</a>
            </div>
          : <div>{this.state.searchResName}</div>
    )
  }

  renderCurrentFlagged(data) {
    if (data) {
      this.setState(data);
    }
    console.log('renderCurrentFlagged', Array.isArray(this.state.currentFlagged) );
    console.log('this.state.currentFlagged', JSON.stringify(this.state.currentFlagged, null, 2));

    return (
      this.state.currentFlagged.map(function(ingredient) {
        return (
          <search className="Search-render" key={ingredient._id}>
            <h3>{ingredient.name}</h3>
            <p>{ingredient.link}</p>
          </search>
        )
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
          renderCurrentFlagged={this.renderCurrentFlagged}
          setDashboardState={this.setDashboardState}
        />
        <img src={this.state.data_uri} className="Image-size" alt="" />
        <div className="Search-parent">
          { this.renderCurrentFlagged() }
          {console.log('i ran')}
          {console.log(this.state.currentFlagged)}
          { this.state.passed && <div>{ this.state.passed }</div> }
        </div>

        { this.renderReslink() }

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
