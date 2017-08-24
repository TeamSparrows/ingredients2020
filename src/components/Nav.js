import React from 'react';
const Nav = (props) => {
  return (
    <div>
      <button className="Logout-btn" onClick={props.logout}>LOG OUT</button>
      <h2 className="App-header">Ingredients 20/20</h2>
    </div>
  )
}

export default Nav;
