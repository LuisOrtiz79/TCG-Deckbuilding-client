import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../services/SERVER_URL';
import { AuthContext } from '../context/auth.context';

const CreateDeck = ({ setIsCreating }) => {
  const { getUser } = useContext(AuthContext);
  const userId = getUser();
  const navigate = useNavigate();

  const [newDeck, setNewDeck] = useState({
    name: '',
    user: userId,
    game: '',
    cards: []
  });

  const handleTextInput = (e) => {
    setNewDeck((prev) => ({...prev, [e.target.name]: e.target.value}));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      ...newDeck
    };

    axios
      .post(`${SERVER_URL}/decks`, requestBody)
      .then((response) => {
        const deck = response.data;

        navigate(`/decks/${deck._id}`);

        setNewDeck({
          name: '',
          user: userId,
          game: '',
          cards: []
        });
      })
      .catch((error) => console.log(error));

    setIsCreating(false);
  };

  return (
    <div className='createDeck'>
      <h2>Create Deck</h2>

      <form onSubmit={handleSubmit} className='formContainer'>
        <label>
          Deck Name
          <input type='text' name='name' value={newDeck.name} onChange={handleTextInput} />
        </label>

        <br />

        <label>
          TCG Game

          <select name='game' value={newDeck.game} onChange={handleTextInput}>
            <option value=''>-- Select Game --</option>
            <option value='Yu-Gi-Oh'>Yu-Gi-Oh</option>
            <option value="MTG">MTG</option>
          </select>
        </label>

        <button type='submit'>Create Deck</button>
      </form>

      <button onClick={() => setIsCreating(false)}>Hide</button>  
    </div>
  );
};

export default CreateDeck;
