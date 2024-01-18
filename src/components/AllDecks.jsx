import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../services/SERVER_URL';
import { AuthContext } from '../context/auth.context';
import placeHolerImage from '../assets/cardBox.jpg';

const AllDecks = () => {
  const [decks, setDecks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const { getUser } = useContext(AuthContext);

  const [editedDeck, setEditedDeck] = useState({
    user: '',
    name: '',
    game: ''
  });

  const userId = getUser();
  const navigate = useNavigate();

  useEffect(() => {
    if(userId) {
      axios
        .get(`${SERVER_URL}/decks/user`, { params: { userId } })
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
        console.log('Deleted deck ===>', response.data)
      })
      .catch((error) => console.log(error));
    navigate('/');
  };

  const handleUpdate = (deckId) => {
    axios
      .get(`${SERVER_URL}/decks/${deckId}`)
      .then((response) => {
        setEditedDeck(response.data);
      })
      .catch((error) => console.error('Error getting decks:', error));
    
    setIsEditing(true);
  };

  const editDeck = (e) => {
    e.preventDefault();

    axios
      .put(`${SERVER_URL}/decks/${editedDeck._id}`, {
        user: userId,
        name: editedDeck.name,
        game: editedDeck.game
      })
      .then((response) => {
        console.log('Updated Deck ===>', response.data);
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
        <div className='deckContainer'>
          {decks && 
            decks.map((deck, index) => {
              return(
                <div key={index}>
                  <Link to={`/decks/${deck._id}`}>
                    <div className='decks'>
                      <img src={placeHolerImage} alt='cardBox' width={'100vw'} height={'100vh'}/>
                      <span>{deck.name}</span>
                    </div>
                  </Link>
                  <button onClick={() => handleUpdate(deck._id)}>Edit</button> <button onClick={() => handleDelete(deck._id)}>Delete</button>
                </div>
              )
          })}
        </div>
      :
      <div>
        <h2>Update Deck</h2>
        <form onSubmit={editDeck} className='formContainer'>
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

          <button type='submit'>Edit</button>
        </form>
        <button onClick={() => setIsEditing(false)}>Back</button>
      </div>
    }
    </>
  );
};

export default AllDecks;