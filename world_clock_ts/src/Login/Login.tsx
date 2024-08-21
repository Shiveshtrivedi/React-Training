/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

interface Person {
  id: number;
  name: string;
  username: string;
  password: string;
}

interface LoginProps {
  signIn: () => void; 
}

const Login: React.FC<LoginProps> = ({ signIn }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [userData, setUserData] = useState<Person[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      const parsedData: Person[] = JSON.parse(storedData);
      setUserData(parsedData);
    }
  }, []);

  const handleLogin = () => {
    const user = userData.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      setError('');
      signIn();
      navigate('/');
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
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="passwordContainer">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
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
