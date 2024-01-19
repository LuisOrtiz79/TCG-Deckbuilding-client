import { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../services/SERVER_URL';

const Randomizer = () => {
  const [card, setCard] = useState(null);
  const [deck, setDeck] = useState([]);

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/decks`)
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
    <div className='randomizerContainer'>
        <div className='randomDeck'>
           <h2>Deck:</h2>
            {deck && (
                <div>
                    <h2>{deck.name}</h2>
            
                    <h3>Main Deck: {`(${deck.main?.length} : 60)`}</h3>

                    <div className='mainContainer'>
                      {deck.main && deck.main.map((card, index) => {
                            return (
                                <div className='cards' data-aos='flip-right'>
                                    <div key={index}>
                                        <img src={card.card_images[0].image_url} alt='cardBox' width={'100vw'} height={'100vh'}/>
                                    </div>
                                </div>
                            )
                        })}  
                    </div>
                    
                    <h3>Extra Deck: {`(${deck.extra?.length} : 15)`}</h3>

                    <div className='extraContainer'>
                        {deck.extra && deck.extra.map((card, index) => {
                            return (
                                <div className='cards' data-aos='flip-right'>
                                    <div key={index}>
                                        <img src={card.card_images[0].image_url} alt='cardBox' width={'100vw'} height={'100vh'}/>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
            
                    <h3>Side Deck: {`(${deck.side?.length} : 15)`}</h3>
                    
                    <div className='sideContainer'>
                        {deck.side && deck.side.map((card, index) => {
                            return (
                                <div className='cards' data-aos='flip-right'>
                                    <div key={index}>
                                        <img src={card.card_images[0].image_url} alt='cardBox' width={'100vw'} height={'100vh'}/>
                                    </div>
                                </div> 
                            )
                        })}
                    </div>
                </div>
            )}
        </div>

        <div className='randomCard'>
            <h2>Card:</h2>

            {card && (
                <div data-aos='fade-down'>
                    <img src={card.card_images[0].image_url} alt='cardBox' width={'100vw'} height={'100vh'}/>
                    <p>{card.name}</p>
                    <p>{card.type} | {card.race}</p>
                    <p>{card.desc}</p>
                </div>
            )}
        </div>
    </div>
  );
};

export default Randomizer;