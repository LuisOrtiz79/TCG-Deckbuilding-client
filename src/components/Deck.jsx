import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../services/SERVER_URL';
import { AuthContext } from '../context/auth.context';
import placeHolerImage from '../assets/cardBox.jpg';

const Deck = () => {
  const [decks, setDecks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const { getUser } = useContext(AuthContext);

  const [editedDeck, setEditedDeck] = useState({
    user: '',
    name: '',
    game: '',
    main: [],
    extra: [],
    side: []
  });

  const userId = getUser();
  const navigate = useNavigate();

  useEffect(() => {
    if(userId) {
       axios
        .get(`${SERVER_URL}/decks`, { params: { userId } }) // Fix this later
        .then((response) => {
            setDecks(response.data);
        })
        .catch((error) => console.log(error)); 
    }
  }, [userId]);

  const handleDelete = (deckId) => {
    setDecks((prevDecks) => prevDecks.filter((deck) => deck._id !== deckId));
    axios
      .delete(`${SERVER_URL}/decks/${deckId}`)
      .then((response) => {
        console.log("Deleted appointment ===>", response.data)
      })
      .catch((error) => console.log(error));
    navigate('/');
  };

  const getSingleDeck = (deckId) => {
    axios
      .get(`${SERVER_URL}/decks/${deckId}`)
      .then((response) => {
        setEditedDeck(response.data);
      })
      .catch((error) => {
        console.error('Error getting details:', error);
      });
  };

  const handleUpdate = (deckId) => {
    getSingleDeck(deckId);
    setIsEditing(true);
  };

  const editDeck = (e) => {
    e.preventDefault();

    axios
      .put(`${SERVER_URL}/decks/${editedDeck._id}`, {
        user: userId,
        name: editedDeck.name,
        game: editedDeck.game,
        main: [],
        extra: [],
        side: []
      })
      .then((response) => {
        console.log("Updated appointment ===>", response.data);
        navigate('/');
      })
      .catch((error) => console.log(error));
      
    setIsEditing(false);
  };

  const handleTextInput = (e) => {
    setEditedDeck((prev) => ({...prev, [e.target.name]: e.target.value}));
  };

  return (
    <>{ !isEditing ?
        <div>
            <h2> List </h2>

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
                                <button onClick={() => handleUpdate(deck._id)}>Update</button> <button onClick={() => handleDelete(deck._id)}>Delete</button>
                            </div>
                        )
                })}
            </div>
        </div>
        :
        <div>
            <form onSubmit={editDeck}>
                <h2>Create Deck</h2>

                <label>
                Deck Name
                <input type='text' name='name' value={editedDeck.name} onChange={(e) => handleTextInput(e)} />
                </label>

                <br />

                <label>
                TCG Game

                <select name='game' value={editedDeck.game} onChange={(e) => handleTextInput(e)}>
                    <option value=''>-- Select Game --</option>
                    <option value='Yu-Gi-Oh'>Yu-Gi-Oh</option>
                    <option value="MTG">MTG</option>
                </select>
                </label>

                <button type='submit'>Update Deck</button>
            </form> 
        </div>
        }
    </>

  );
};

export default Deck;