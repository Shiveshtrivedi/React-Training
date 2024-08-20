/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import './SignUp.css';

interface Person {
  id: number;
  name: string;
  username: string;
  password: string;
}

const SignUp = () => {
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState<Person[]>([]);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
  };
  return (
    <>
      <form className="container" onSubmit={handleSubmit}>
        <div className="nameContainer">
          <label htmlFor="name">Name</label>
          <input
            type="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="username">Username</label>
          <input
            type="email"
            id="username"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="passwordContainer">
          <label htmlFor="password">Password</label>
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
