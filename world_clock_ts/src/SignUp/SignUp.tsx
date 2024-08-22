/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IPerson } from '../Utils/Interface/Interface';
import message from '../Utils/Message.json';
import './SignUp.css';

const validatePassword = (password: string) => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function setErrors(arg: string) {
  throw new Error('Function not implemented.');
}

const SignUp = () => {
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState<IPerson[]>([]);
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name || !username || !password) {
      alert('Please fill all the fields');
      return;
    }
    if (!validateEmail(username)) {
      setErrors(message.emailError);
      return;
    }

    if (!validatePassword(password)) {
      setErrors(message.passwordError);
      return;
    }
    const newUser: IPerson = {
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
    navigate('/login', { replace: true });
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
            aria-label="Name"
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="username">Username:</label>
          <input
            type="email"
            id="username"
            onChange={(e) => setUserName(e.target.value)}
            aria-label="Username"
          />
        </div>
        <div className="passwordContainer">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
          />
        </div>
        <div>
          <button type="submit" id="submitButton" aria-label="Submit">
            Submit
          </button>
        </div>
      </form>
      {console.log('usedata ', userData)}
    </>
  );
};
export default SignUp;
