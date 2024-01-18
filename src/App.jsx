import './App.css'
import { useContext } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from './context/auth.context';
import AOS from  'aos';
import 'aos/dist/aos.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Decks from './pages/Decks';
import Comments from './pages/Comments';
import DeckInfo from './pages/DeckInfo';
import OtherComments from './components/OtherComments';
import MyComments from './components/MyComments';

AOS.init({
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 1500, // values from 0 to 3000, with step 50ms
  easing: 'ease' 
})

function App() {
  const { getToken } = useContext(AuthContext);

  const IsLoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to='/login' />;
  };

  const IsLoggedOut = () => {
    return !getToken() ? <Outlet /> : <Navigate to='/' />;
  }

  return (
    <div className='App'>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />

        <Route element={<IsLoggedOut />}>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Route>

        <Route element={<IsLoggedIn/>}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/decks' element={<Decks />} />
          <Route path='/decks/:deckId' element={<DeckInfo />} />
          <Route path='/comments' element={<Comments />} />
          <Route path='/comments/:deckId' element={<OtherComments />} />
          <Route path='/mycomments/:deckId' element={<MyComments />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;