import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../services/SERVER_URL';

const DeckInfo = () => {
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios
        .get(`${SERVER_URL}/decks/${deckId}`)
        .then((response) => {
            setDeck(response.data);
        })
        .catch((error) => console.log(error));
  }, []);

  return (
    <div className='deckInfo'>
      <h1>Deck Info</h1>
        <h1>Deck: {deck.name}</h1>
        
        {deck.cards && deck.cards.map((card, index) => {
            return (
                <div key={index}>
                    <img src={card.card_images[0].image_url} alt='cardBox' width={'100vw'} height={'100vh'}/>
                </div>
            )
        })}
    </div>
  )
};

export default DeckInfo;