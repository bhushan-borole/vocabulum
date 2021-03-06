import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from "../services/firebase";
import { db } from "../services/firebase";


function AddWord() {
  const [word, setWord] = useState();
  const [meaning, setMeaning] = useState();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [currentUser, setCurrentUser] = useState(auth().currentUser);

  useEffect(() => {
    setTimeout(() => {
      setSuccess('');
      setError('');
    }, 8000);
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await db.ref("words/" + currentUser.uid).push({
        word: word,
        meaning: meaning
      });
      setSuccess('Word added successfully!');
    } catch (error) {
      setError(error.message);
    }
  }
  
  return (
    <div className="container d-flex justify-content-center">
      <form
        className="mt-5 py-5 px-5"
        autoComplete="off"
        onSubmit={onSubmit}>
        <h1 className="d-flex justify-content-center" style={{ color: "#74808a" }}>
          Add Word to
          <Link className="title ml-2" to="/">Vocabulum</Link>
        </h1>
        <br/>
        <div className="form-group d-flex justify-content-center">
          <input
            className="form-control"
            placeholder="word"
            name="word"
            id="word"
            type="text"
            onChange={e => setWord(e.target.value)} 
            value={word}
          />
        </div>
        <div className="form-group d-flex justify-content-center">
          <textarea
            className="form-control"
            placeholder="meaning"
            name="meaning"
            id="meaning"
            onChange={e => setMeaning(e.target.value)} 
            value={meaning}
            cols="80"
          />
        </div>
        <div className="form-group d-flex justify-content-center">
          {error ? ( <p className="text-danger d-flex justify-content-center">{error}</p> ) : null}
          {success ? ( <p className="text-success d-flex justify-content-center">{success}</p> ) : null}
        </div>
        <div className="form-group d-flex justify-content-center">
          <button className="btn btn-primary px-5" type="submit">Add Word</button>
        </div>
        <div className="py-5 mx-3 form-group d-flex justify-content-center" style={{ color: "rgb(116, 128, 138)", textAlign: "center" }}>
          Logged in as: <strong className="text-info">{currentUser.email}</strong>
        </div>
      </form>
      
    </div>
  );
}

export default AddWord;