import React, { useEffect, useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { IPerson, ILoginProps } from '../Utils/Interface/Interface';

const Login: React.FC<ILoginProps> = ({ signIn }: ILoginProps) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [userData, setUserData] = useState<IPerson[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      const parsedData: IPerson[] = JSON.parse(storedData);
      setUserData(parsedData);
    }
  }, []);

  const handleLogin = () => {
    if (userData.length === 0) {
      setError('*No user data available');
      return;
    }

    const user: IPerson | undefined = userData.find(
      (user: IPerson) =>
        user.username === username && user.password === password
    );

    if (user) {
      setError('');
      setPassword('');
      signIn();
      navigate('/');
    } else {
      const usernameExists = userData.some(
        (user: IPerson) => user.username === username
      );
      if (usernameExists) {
        setError('*Incorrect password');
      } else {
        setError('*Invalid username');
      }
    }
  };

  return (
    <form
      className="container"
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();
        handleLogin();
      }}
    >
      <div className="inputContainer">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
          required
          aria-label="Username"
        />
      </div>
      <div className="passwordContainer">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          required
          aria-label="Password"
        />
      </div>
      {error && <div className="error">{error}</div>}
      <div>
        <button type="submit" id="loginButton" aria-label="Submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Login;
