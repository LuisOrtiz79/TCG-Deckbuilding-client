import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../services/SERVER_URL';
import Card from '../components/Card';

const DeckInfo = () => {
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();

  useEffect(() => {
    axios
        .get(`${SERVER_URL}/decks/${deckId}`)
        .then((response) => {
            setDeck(response.data);
        })
        .catch((error) => console.log(error));
  }, []);

  const handleMainDelete = (cardId) => {
    axios
      .put(`${SERVER_URL}/decks/removemain/${deckId}`, { cardId })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  const handleExtraDelete = (cardId) => {
    axios
      .put(`${SERVER_URL}/decks/removeextra/${deckId}`, { cardId })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  const handleSideDelete = (cardId) => {
    axios
      .put(`${SERVER_URL}/decks/removeside/${deckId}`, { cardId })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className='deckInfo'>
        <h1>Deck Info</h1>
          <h2>Deck: {deck.name}</h2>
          
          <h3>Main Deck: {`(${deck.main?.length} : 60)`}</h3>
          {deck.main && deck.main.map((card, index) => {
              return (
                  <div key={index}>
                      <img src={card.card_images[0].image_url} alt='cardBox' width={'100vw'} height={'100vh'}/>
                      <button onClick={() => handleMainDelete(card._id)}>Remove</button>
                  </div>
              )
          })}

          <h3>Extra Deck: {`(${deck.extra?.length} : 15)`}</h3>
          {deck.extra && deck.extra.map((card, index) => {
              return (
                  <div key={index}>
                      <img src={card.card_images[0].image_url} alt='cardBox' width={'100vw'} height={'100vh'}/>
                      <button onClick={() => handleExtraDelete(card._id)}>Remove</button>
                  </div>
              )
          })}

          <h3>Side Deck: {`(${deck.side?.length} : 15)`}</h3>
          {deck.side && deck.side.map((card, index) => {
              return (
                  <div key={index}>
                      <img src={card.card_images[0].image_url} alt='cardBox' width={'100vw'} height={'100vh'}/>
                      <button onClick={() => handleSideDelete(card._id)}>Remove</button>
                  </div>
              )
          })}
      </div>

      <div className='searchSide'>
        <Card main={deck.main?.length} extra={deck.extra?.length} side={deck.side?.length} />
      </div>
    </>
  )
};

export default DeckInfo;