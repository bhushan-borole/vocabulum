import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <section>
        <div className="jumbotron jumbotron-fluid py-5" style={{ background: "rgba(46, 45, 43, 1)" }}>
          <div className="container text-center py-5"><br/>
            <h1 className="display-4" style={{ color: "#fff" }}>Welcome to Vocabulum</h1>
            <p className="lead" style={{ color: "#74808a" }}>It's your personal dictionary.</p>
            <div className="mt-4">
              <Link className="btn btn-primary px-5 mr-3" to="/add-word">Add Word</Link>
              <Link className="btn btn-secondary px-5" to="/all-words">All Words</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home;