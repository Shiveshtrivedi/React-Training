/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

interface Person {
  id: number;
  name: string;
  username: string;
  password: string;
}

const validatePassword = (password: string) => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const SignUp = () => {
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState<Person[]>([]);
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name || !username || !password) {
      alert('Please fill all the fields');
      return;
    }
    if (!validateEmail(username)) {
      setErrors('Invalid email address');
      return;
    }

    if (!validatePassword(password)) {
      setErrors(
        'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character'
      );
      return;
    }
    const newUser: Person = {
      id: userData.length + 1,
      name,
      username,
      password,
    };
    setUserData([...userData, newUser]);
    const updatedUserData = [...userData, newUser];
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
    setName('');
    setUserName('');
    setPassword('');
    navigate('/login');
  };
  return (
    <>
      <form className="container" onSubmit={handleSubmit}>
        <div className="nameContainer">
          <label htmlFor="name">Name:</label>
          <input
            type="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="username">Username:</label>
          <input
            type="email"
            id="username"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="passwordContainer">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" id="submitButton">
            Submit
          </button>
        </div>
      </form>
      {console.log('usedata ', userData)}
    </>
  );
};
export default SignUp;
function setErrors(arg0: string) {
  throw new Error('Function not implemented.');
}

