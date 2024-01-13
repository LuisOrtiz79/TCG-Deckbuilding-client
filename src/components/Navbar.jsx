import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

const Navbar = () => {
  const { logOutUser, getToken } = useContext(AuthContext);

  return (
    <nav className='navbar'>
        <Link to='/'>Home</Link>
        {
            !getToken() &&
            <>
                <Link to='/login'>Login</Link>
            </>
        }
        {
            getToken() &&
            <>
                <Link to='/profile'>Profile</Link>
                <Link to='/decks'>Decks</Link>
                <Link to='/comments'>Comments</Link>
                <button onClick={logOutUser}>Logout</button>
            </>
        }
    </nav>
  );
};

export default Navbar;