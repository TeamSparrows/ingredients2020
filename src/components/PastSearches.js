import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import $ from 'jquery';
class PastSearches extends Component {
  renderPastSearches() {

    var data = {
      username: this.props.username
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
      this.props.setDashboardState({
        pastSearches: totalIngredients
      })
    })
    .fail(() => {
      console.log('failed getting items');
    });
  }

  render() {
    return (
      <div className="Button-parent">
        <Button
          className="Saved-items"
          onClick={this.renderPastSearches.bind(this)}
          >
            MY PAST SEARCHES</Button>
          {
            this.props.pastSearches.map((ingredient, i) => {
              return (
                <search
                  key={i}>{ingredient.name + ' - ' + ingredient.link}<br/>
                </search>
              )
          })
          }
      </div>




    )
  }
}

export default PastSearches;
