import React from 'react';

export default function Login() {
  return (
    <div className="login-background">
      <div className="login--form">
        <label className="login--label" htmlFor="email">
          Email:
        </label>
        <input
          className="login--input"
          name="email"
          placeholder="test@example.com"
        ></input>

        <label className="login--label" htmlFor="password">
          Password:
        </label>
        <input className="login--input" name="password" type="password"></input>

        <button className="login--button">
          Log in
        </button>
      </div>
    </div>
  );
}
