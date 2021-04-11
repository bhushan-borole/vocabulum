import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import { signin, signInWithGoogle } from "../helper/auth";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await signin(email, password);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="container d-flex justify-content-center">
      <form
        className="mt-5 py-5 px-5"
        autoComplete="off"
        onSubmit={handleSubmit}>
        <h1 className="d-flex justify-content-center" style={{ color: "#74808a" }}>
          Login to
          <Link className="title ml-2" to="/">Vocabulum</Link>
        </h1>
        <br/>
        <div className="form-group d-flex justify-content-center">
          <input
            className="form-control"
            placeholder="Email"
            name="email"
            type="email"
            onChange={e => setEmail(e.target.value)} 
            value={email}
          />
        </div>
        <div className="form-group d-flex justify-content-center">
          <input
            className="form-control"
            placeholder="Password"
            name="password"
            onChange={e => setPassword(e.target.value)} 
            value={password}
            type="password"
          />
        </div>
        <div className="form-group d-flex justify-content-center">
          {error ? ( <p className="text-danger">{error}</p> ) : null}
          <button className="btn btn-primary px-5" type="submit">Login</button>
        </div>
        <hr />
        <p className="d-flex justify-content-center" style={{ color: "rgb(116, 128, 138)" }}>
          Don't have an account? <Link to="/signup"> Sign up</Link>
        </p>
      </form>

    </div>
  )
}

export default Login;