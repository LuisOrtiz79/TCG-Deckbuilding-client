import { useState } from 'react';
import AllDecks from '../components/AllDecks';
import CreateDeck from '../components/CreateDeck';

const Decks = () => {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div>{!isCreating ? (
      <div className="deckPage">
        <h1>Decks</h1>

        <button onClick={() => setIsCreating(true)}> Create </button>

        <AllDecks />
      </div>
      )
      :
      <div className="deckPage">
        <h1>Decks</h1>

        <CreateDeck setIsCreating={setIsCreating}/>

        <AllDecks />
      </div>}
    </div>
    
  );
};

export default Decks;