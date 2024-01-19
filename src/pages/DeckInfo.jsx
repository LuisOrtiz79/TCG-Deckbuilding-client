import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../services/SERVER_URL';
import CardInfo from '../components/CardInfo';

const DeckInfo = () => {
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();

  const navigate = useNavigate();
  
  // Get all info inside the deck
  const getDeckInfo = () =>{
    axios
      .get(`${SERVER_URL}/decks/${deckId}`)
      .then((response) => {
        setDeck(response.data);
      })
    .catch((error) => console.log(error));
  }

  useEffect(() => {
    getDeckInfo();
  }, []);

  // Based on the card id it deletes it from the main deck
  const handleMainDelete = (cardId) => {
    axios
      .put(`${SERVER_URL}/decks/removemain/${deckId}`, { cardId })
      .then((response) => {
        console.log(response.data)
        getDeckInfo();
      })
      .catch((error) => console.log(error));
  };

  // Based on the card id it deletes it from the extra deck
  const handleExtraDelete = (cardId) => {
    axios
      .put(`${SERVER_URL}/decks/removeextra/${deckId}`, { cardId })
      .then((response) => {
        console.log(response.data);
        getDeckInfo();
      })
      .catch((error) => console.log(error));
  };

  // Based on the card id it deletes it from the side deck
  const handleSideDelete = (cardId) => {
    axios
      .put(`${SERVER_URL}/decks/removeside/${deckId}`, { cardId })
      .then((response) => {
        console.log(response.data);
        getDeckInfo();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className='infoContainer'>
      <div className='deckInfo'>
        <h1>Deck Info</h1>
        <h2>Deck: {deck.name}</h2>
        
        <button>Sort by name</button>
        <button>Sort by type</button>

        <h3>Main Deck: {`(${deck.main?.length} : 60)`}</h3>
        <div className='mainContainer'>
          {deck.main && deck.main.map((card, index) => {
            return (
              <div key={index} className='cards' data-aos='fade-up'>
                <img src={card.card_images[0].image_url} alt='cardBox' width={'100vw'} height={'100vh'}/>
                <button onClick={() => handleMainDelete(card._id)}>Remove</button>
              </div>
            )
          })}
        </div>
        
        <h3>Extra Deck: {`(${deck.extra?.length} : 15)`}</h3>
        <div className='extraContainer'>
          {deck.extra && deck.extra.map((card, index) => {
            return (
              <div key={index} className='cards' data-aos='fade-up'>
                <img src={card.card_images[0].image_url} alt='cardBox' width={'100vw'} height={'100vh'}/>
                <button onClick={() => handleExtraDelete(card._id)}>Remove</button>
              </div>
            )
          })}
        </div>

        <h3>Side Deck: {`(${deck.side?.length} : 15)`}</h3>
        <div className='sideContainer'>
          {deck.side && deck.side.map((card, index) => {
            return (
              <div key={index} className='cards' data-aos="fade-up">
                <img src={card.card_images[0].image_url} alt='cardBox' width={'100vw'} height={'100vh'}/>
                <button onClick={() => handleSideDelete(card._id)}>Remove</button>
              </div>
            )
          })}
        </div>

        <button onClick={() => navigate(-1)}>Back</button>
      </div>

      <div className='searchSide'>
        <CardInfo main={deck.main?.length} extra={deck.extra?.length} side={deck.side?.length}  getDeckInfo={getDeckInfo}/>
      </div>
    </div>
  );
};

export default DeckInfo;