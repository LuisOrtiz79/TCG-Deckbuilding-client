import './App.css'
import { useContext } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from './context/auth.context';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Decks from './pages/Decks';
import Comments from './pages/Comments';
import DeckInfo from './pages/DeckInfo';
import CreateDeck from './pages/CreateDeck';

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
          <Route path='/decks/create' element={<CreateDeck />} />
          <Route path='/comments' element={<Comments />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;