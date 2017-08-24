import React from 'react';
const RenderReslink = (props) => {


  return (
      props.searchResLink
        ? <div>{  props.searchResName + ' found in database! - '}
            <a href={props.searchResLink} target="_blank">{props.searchResLink }</a>
          </div>
        : <div>{props.searchResName}</div>
  )
}

export default RenderReslink;
