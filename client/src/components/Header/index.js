import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
  // executes to run the .logout() method we created in the AuthService class
  const logout = event => {
    // override <a> elements defualt nature of having the browser load a different resource
    event.preventDefault();
    // instead, execute logout method (remove token from localStorage and refresh app to homepage)
    Auth.logout();
  }

  return (
    <header className="bg-secondary mb-4 py-2 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link to="/">
          <h1>Deep Thoughts</h1>
        </Link>
        
        <nav className="text-center">
          {Auth.loggedIn() ? (
            <>
            <Link to="/profile">Me</Link>
            <a href="/" onClick={logout}>
              Logout
            </a>
            </>
          ):(
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
