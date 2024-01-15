import { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../services/SERVER_URL';

const Randomizer = () => {
  const [card, setCard] = useState(null);
  const [deck, setDeck] = useState([]);

  useEffect(() => {
    axios
        .get(`${SERVER_URL}/decks/all`)
        .then((response) => {
            const decks = response.data;
            const randomIndex = Math.floor(Math.random() * decks.length);
            setDeck(decks[randomIndex]);
        })
        .catch((error) => console.log(error));

    axios
        .get(`${SERVER_URL}/cards`)
        .then((response) => {
            const cards = response.data;
            const randomIndex = Math.floor(Math.random() * cards.length);
            setCard(cards[randomIndex]);
        })
        .catch((error) => console.log(error));
  }, []);

  return (
    <div>
        <h2>Random Card:</h2>
        {card && (
            <div>
                <img src={card.card_images[0].image_url} alt='cardBox' width={'100vw'} height={'100vh'}/>
            </div>
        )}

        <h2>Random Deck:</h2>
        {deck && (
            <div>
                <h2>Deck: {deck.name}</h2>
          
                <h3>Main Deck: {`(${deck.main?.length} : 60)`}</h3>
                {deck.main && deck.main.map((card, index) => {
                    return (
                        <div key={index}>
                            <img src={card.card_images[0].image_url} alt='cardBox' width={'100vw'} height={'100vh'}/>
                        </div>
                    )
                })}
        
                <h3>Extra Deck: {`(${deck.extra?.length} : 15)`}</h3>
                {deck.extra && deck.extra.map((card, index) => {
                    return (
                        <div key={index}>
                            <img src={card.card_images[0].image_url} alt='cardBox' width={'100vw'} height={'100vh'}/>
                        </div>
                    )
                })}
        
                <h3>Side Deck: {`(${deck.side?.length} : 15)`}</h3>
                {deck.side && deck.side.map((card, index) => {
                    return (
                        <div key={index}>
                            <img src={card.card_images[0].image_url} alt='cardBox' width={'100vw'} height={'100vh'}/>
                        </div>
                    )
                })}
            </div>
        )}
    </div>
  );
};

export default Randomizer;