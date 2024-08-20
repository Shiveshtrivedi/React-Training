/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import './Login.css';

interface Person {
  id: number;
  name: string;
  username: string;
  password: string;
}

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData);
    }
  }, []);
  const [userData, setUserData] = useState<Person[]>([]);

  const handleLogin = () => {
    const user = userData.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      setError('');
      alert('Login successful!');
    } else {
      setError('*Invalid username or password');
    }
  };
  return (
    <form
      className="container"
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
    >
      <div className="inputContainer">
        <label htmlFor="username">Username</label>
        <input
          type="email"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="passwordContainer">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <div className="error">{error}</div>}
      <div>
        <button type="submit" id="loginButton">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Login;
