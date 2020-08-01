import React from 'react';

import '../src/client/styles/login.scss';

export default function Login() {
  return (
    <div className="login--wrapper">
      <div className="login--form">
        <label htmlFor="email">Email:</label>
        <input name="email" placeholder="test@example.com"></input>

        <label htmlFor="password">Password:</label>
        <input name="password" type="password"></input>

        <button>Log in</button>
      </div>
    </div>
  );
}
