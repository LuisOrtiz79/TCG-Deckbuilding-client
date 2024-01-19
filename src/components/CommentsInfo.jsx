import { useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../services/SERVER_URL';
import { AuthContext } from '../context/auth.context';
import placeHolerImage from '../assets/cardBox.jpg';

const CommentInfo = () => {
  const [decks, setDecks] = useState([]);
  const [userDecks, setUserDecks] = useState([]);
  const { getUser } = useContext(AuthContext);
  
  const userId = getUser();

  // Get the decks that correspond to the user
  const getUserDecks = () => {
    if(userId) {
      axios
        .get(`${SERVER_URL}/decks/user`, { params: { userId } })
        .then((response) => {
          setUserDecks(response.data);
        })
        .catch((error) => console.log(error)); 
    }
  }

  // Get all the decks
  const getDecks = () => {
    axios
      .get(`${SERVER_URL}/decks`)
      .then((response) => {
        setDecks(response.data);
      })
      .catch((error) => console.log(error)); 
  }

  useEffect(() => {
    getDecks();
    getUserDecks();
  }, []);

  // Filter the decks that don't have the same id as the user
  let filtered = decks.filter((deck) => deck.user._id !== userId);

  return (
    <>
      <div>
        <h2>All Decks:</h2>
        
        <div>
          {decks && 
            filtered.map((deck, index) => {
              return(
                <div key={index}>
                  <Link to={`/mycomments/${deck._id}`}>
                    <div>
                      <img src={placeHolerImage} alt='cardBox' width={'100vw'} height={'100vh'}/>
                      <span>{deck.name}</span>
                    </div>
                  </Link>
                </div>
              );
          })}
        </div>
      </div>

      <div>
        <h2>My Decks:</h2>

        <div>
          {userDecks && 
            userDecks.map((deck, index) => {
              return(
                <div key={index}>
                  <Link to={`/comments/${deck._id}`}>
                    <div>
                      <img src={placeHolerImage} alt='cardBox' width={'100vw'} height={'100vh'}/>
                      <span>{deck.name}</span>
                    </div>
                  </Link>
                </div>
              )
          })}
        </div>
      </div>
    </>
  );
};

export default CommentInfo;