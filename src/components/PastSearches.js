import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
class PastSearches extends Component {


  render() {
    return (
      <div className="Button-parent">
        <Button
          className="Saved-items"
          onClick={this.props.renderPastSearches}
          >
            MY PAST SEARCHES</Button>
          {
            this.props.pastSearches.map((ingredient) => {
              return (
                <search
                  key={ingredient._id}>{ingredient.name + ' - ' + ingredient.link}<br/>
                </search>
              )
          })
          }
      </div>




    )
  }
}

export default PastSearches;
