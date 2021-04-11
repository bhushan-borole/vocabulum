import React, { useEffect, useState } from 'react';
import { PaginatedList } from 'react-paginated-list';
import _ from 'lodash';
import WordCard from '../components/Card';
import { Link } from 'react-router-dom';
import { auth } from "../services/firebase";
import { db } from "../services/firebase";

function AllWords() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [currentUser, setCurrentUser] = useState(auth().currentUser);
  const [loadingWords, setLoadingWords] = useState(false);
  const [error, setError] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    setLoadingWords(true);
    try {
      db.ref("words/" + currentUser.uid).on("value", snapshot => {
        let data = [];
        snapshot.forEach((snap) => {
          data.push(snap.val());
        })
        if (data.length === 0) {
          setIsEmpty(true);
        } else {
          setData(data);
        }
        setLoadingWords(false);
      })
    } catch (error) {
      setError(error.message);
    }
    setLoadingWords(false);
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
        {loadingWords ? <div className="spinner-border text-success" role="status">
          <span className="sr-only">Loading...</span>
        </div> : ""}
        {
          isEmpty 
            ? <h4
                className="d-flex justify-content-center"
                style={{ color: "rgb(116, 128, 138)"}}>
                  No Words present
              </h4>
            : <PaginatedList
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
        }
      </div>
      <div className="container">
        <div className="py-5 mx-3 d-flex justify-content-center" style={{ color: "rgb(116, 128, 138)", textAlign: "center" }}>
          Logged in as: <strong className="text-info">{currentUser.email}</strong>
        </div>
      </div>
    </>
  )
}

export default AllWords;