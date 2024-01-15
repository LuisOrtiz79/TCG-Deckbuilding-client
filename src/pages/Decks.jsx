import Deck from '../components/Deck';
import CreateDeck from './CreateDeck';

const Decks = () => {
  return (
    <div className="deckPage">
        <h1>Decks</h1>

        <CreateDeck />

        <Deck />
    </div>
  )
};

export default Decks;