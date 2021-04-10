import React, { Component, useEffect, useState } from 'react';
import { PaginatedList } from 'react-paginated-list';
import _ from 'lodash';
import WordCard from '../components/Card';
import { Link } from 'react-router-dom';

function AllWords() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://vocabulum.herokuapp.com/all-words')
    .then(response => response.json())
    .then(data => setData(data))
  });

  const cards = data
    .filter((details) => {
      return (
        details.word
          .toLowerCase()
          .indexOf(search.toLowerCase()) !== -1
      )
    })
    .map((details, index) => {
      return <WordCard key={index} word={details.word} meaning={details.meaning}></WordCard>;
    })
    
  const groupedCards = _.chunk(cards, 4);

  const normalStyle = {
    input: {
      width: "30%"
    }
  }

  const toggleStyle = {
    input: {
      width: "100%"
    }
  }

  var style = function() {
    if (window.innerWidth > 767) {
      return normalStyle;
    } else {
      return toggleStyle;
    }
  };
  

  return (
    <>
      <div className="d-flex justify-content-center mt-5 py-5 px-5">
        <div className="container">
          <div className="row">
            <div className="col">
              <h2 className="d-flex justify-content-center" style={{ color: "#74808a" }}>
                All Words present in
                <Link className="title ml-2" to="/">Vocabulum</Link>
              </h2><br/>
            </div>
          </div>
          <div className="row">
            <div className="col d-flex justify-content-center">
              <input
                className="form-control"
                placeholder="Search"
                style={style().input}
                type="text"
                onChange={e => setSearch(e.target.value)} 
                value={search}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <PaginatedList
          list={groupedCards} 
          itemsPerPage={3}
          renderList={(groupedCards) => (
            <>
              {groupedCards.map((item) => {
                return (
                  <div className="row">{item}</div>
                );
              })}
            </>
          )}
        />
      </div>
    </>
  )
}

export default AllWords;