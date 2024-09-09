import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from './Header/Header';
import About from './About/About';
import SignUp from './SignUp/SignUp';
import Login from './Login/Login';
import Home from './Home/Home';
import Protected from './Protected/Protected';

const App: React.FC = () => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  const signIn = () => {
    setIsSignedIn(true);
  };

  const signOut = () => {
    setIsSignedIn(false);
    localStorage.removeItem('userData');
  };

  return (
    <>
      <Header isSignedIn={isSignedIn} signOut={signOut} />
      <Routes>
        <Route
          path="/"
          element={!isSignedIn ? <Navigate to="/signup" /> : <Home />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/login"
          element={
            !isSignedIn ? <Login signIn={signIn} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/about"
          element={isSignedIn ? <About /> : <Navigate to="/login" />}
        />
        <Route
          path="/protected"
          element={
            <Protected isSignedIn={isSignedIn}>
              <Home />
            </Protected>
          }
        />
      </Routes>
      <div className="d-grid mt-5">
        {!isSignedIn && (
          <button className="btn-dark" onClick={signIn}>
            Sign in
          </button>
        )}
      </div>
    </>
  );
};

export default App;
