/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-comment-textnodes */

import Header from './Header/Header';
import { Route, Routes } from 'react-router-dom';
import About from './About/About';
import SignUp from './SignUp/SignUp';
import Login from './Login/Login';
import Home from './Home/Home';

const App: React.FC = () => {
  

  return (
    <>
      <Header />
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/signup' element={<SignUp />} />
    <Route path='/login' element={<Login />} />
    <Route path='/about' element={<About/>} />
    </Routes>
    </>
  );
};

export default App;
