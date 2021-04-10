import React, { Component, useEffect, useState } from 'react';
import { PaginatedList } from 'react-paginated-list';
import _ from 'lodash';
import WordCard from '../components/Card';

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

  return (
    <>
    <div className="d-flex justify-content-center mt-5 py-5 px-5">
      <input
        className="form-control"
        style={{
          width: "30%"
        }}
        type="text"
        onChange={e => setSearch(e.target.value)} 
        value={search}
      />
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