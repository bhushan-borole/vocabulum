import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { signup, signInWithGoogle, signInWithGitHub } from '../helper/auth';

function SignUp() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await signup(email, password);
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
          Sign Up to
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
            value={email}>
          </input>
        </div>
        <div className="form-group d-flex justify-content-center">
          <input 
            className="form-control"
            placeholder="Password" 
            name="password" 
            onChange={e => setPassword(e.target.value)} 
            value={password} 
            type="password">
          </input>
        </div>
        <div className="form-group d-flex justify-content-center">
          {error ? <p className="text-danger">{error}</p> : null}
          <button className="btn btn-primary px-5" type="submit">Sign up</button>
        </div>
        <hr></hr>
        <p className="d-flex justify-content-center" style={{ color: "rgb(116, 128, 138)" }}>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  )
}

export default SignUp;