import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { userActions } from "../_actions";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(userActions.logout());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);
    if (username && password && password) {
      const user = { username: username, email: email, password: password };

        dispatch(userActions.register(user));
    }

      
        
  
  };

  return (
    <div className="jumbotron">
      <div className="col-md-6 col-md-offset-3 mx-auto">
        <h2>Registration</h2>
        <form name="form" onSubmit={e => handleSubmit(e)}>
          <div
            className={
              "form-group" + (submitted && !username ? " has-error" : "")
            }
          >
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {submitted && !username && (
              <div className="help-block">Username is required</div>
            )}
          </div>
          <div
            className={"form-group" + (submitted && !email ? " has-error" : "")}
          >
            <label htmlFor="email">email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {submitted && !email && (
              <div className="help-block">email is required</div>
            )}
          </div>
          <div
            className={
              "form-group" + (submitted && !password ? " has-error" : "")
            }
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {submitted && !password && (
              <div className="help-block">Password is required</div>
            )}
          </div>
            <div className="form-group">
              <button
                className="btn btn-primary"
              >
                Sign up
              </button>
              <Link to="/login" className="btn btn-link">Cancel</Link>
            </div>
            
      
        </form>
        
      </div>
    </div>
  );
}

export { RegisterPage };
