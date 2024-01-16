import AllDecks from '../components/AllDecks';
import CreateDeck from '../components/CreateDeck';

const Decks = () => {
  return (
    <div className="deckPage">
        <h1>Decks</h1>

        <CreateDeck />

        <AllDecks />
    </div>
  );
};

export default Decks;