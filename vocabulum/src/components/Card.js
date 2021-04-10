import React, { Component } from 'react';

function WordCard(props) {
  return (
    <div className="col-sm-3 py-2">
      <div className="card card-body h-100 d-flex flex-column">
        <h5 className="card-title">{props.word}</h5>
        <p class="card-text">{props.meaning}</p>
      </div>
    </div>
  )
}

export default WordCard;