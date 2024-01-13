import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../services/SERVER_URL';
import placeHolerImage from '../assets/cardBox.jpg';

const Deck = () => {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    axios
        .get(`${SERVER_URL}/decks`)
        .then((response) => {
            setDecks(response.data);
        })
        .catch((error) => console.log(error));
  }, []);

  return (
    <div>
        {decks && 
            decks.map((deck, index) => {
                return(
                    <div key={index}>
                        <Link to={`/decks/${deck._id}`}>
                            <div>
                                <img src={placeHolerImage} alt='cardBox' width={'100vw'} height={'100vh'}/>
                                <span>{deck.name}</span>
                            </div>
                        </Link>  
                    </div>
                )
        })}
    </div>
  );
};

export default Deck;
