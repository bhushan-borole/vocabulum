import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-sm fixed-top navbar-light">
        <Link className="navbar-brand" to="/" style={{ color: "#fff" }}>Vocabulum</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <div className="navbar-nav" style={{ background: "rgba(46, 45, 43, 1)" }}>
            <Link className="nav-item nav-link mr-3" to="/add-word" style={{ color: "#74808a" }}>Add Word</Link>
            <Link className="nav-item nav-link mr-3" to="/all-words" style={{ color: "#74808a" }}>All Words</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;