import { Link } from 'react-router-dom';
import Deck from '../components/Deck';

const Decks = () => {
  return (
    <div className="deckPage">
        <h1>Decks</h1>

        <Link to='/decks/create'>
            <button>Create Deck</button>
        </Link>

        <Deck />
    </div>
  )
};

export default Decks;