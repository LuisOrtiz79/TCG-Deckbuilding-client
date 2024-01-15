import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../services/SERVER_URL';
import Searchbar from '../components/Searchbar';

const Card = ({main, extra, side}) => {
  const [cards, setCards] = useState([]);
  const [searchCard, setSearchCard ]=  useState('');

  const { deckId } = useParams();

  const addCard = (cardId, type) => {
    if(extra <= 15 && type === 'fusion' || type === 'synchro' || type === 'xyz' || type === 'link') {
      axios
      .put(`${SERVER_URL}/decks/extra/${deckId}`, { cardId })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
    }else if (main <= 60 && type !== 'fusion' || type !== 'synchro' || type !== 'xyz' || type !== 'link' || type !== 'skill') {
      axios
      .put(`${SERVER_URL}/decks/main/${deckId}`, { cardId })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
    }

    if(main > 60 && extra > 15 && type !== 'skill'){
      axios
      .put(`${SERVER_URL}/decks/side/${deckId}`, { cardId })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
    }
    
  }

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/cards`)
      .then((response) => {
          setCards(response.data);
      })
      .catch((error) => console.log(error));

  }, []);

  let filtered = searchCard ? cards.filter((card) => card.name.toLowerCase().includes(searchCard.toLowerCase())) : cards;

  return (
    <div>
      <Searchbar searchCard={searchCard} setSearchCard={setSearchCard}/>

      {cards && filtered.map((cards) => (
        <div key={cards._id}>
          <img src={cards.card_images[0].image_url} alt='cardBox' width={'60vw'} height={'60vh'}/> 
          <p>{cards.name}</p>
          <button onClick={() => addCard(cards._id, cards.frameType)}>+</button>
        </div>
      ))}
    </div>
  );
};

export default Card;