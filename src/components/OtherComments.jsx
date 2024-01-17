import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../services/SERVER_URL';

const OtherComments = () => {
    const [deck, setDeck] = useState([]);
    const [comments, setComments] = useState([]);
    const { deckId } = useParams();
  
    useEffect(() => {
      axios
        .get(`${SERVER_URL}/decks/${deckId}`)
        .then((response) => {
          setDeck(response.data);
        })
        .catch((error) => console.log(error)); 
  
      axios
        .get(`${SERVER_URL}/comments`)
        .then((response) => {
          setComments(response.data);
        })
        .catch((error) => console.log(error));
    }, []);
  
    return (
      <div>
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
  
        <div>
            <h2>User Comments:</h2>
            {comments.map((comment) => (
                <div key={comment._id}>
                    <p>{comment.user.username}</p>
                    <p>{comment.Comment}</p>
                </div>
            ))}
        </div>
      </div>
    );
  };

export default OtherComments;