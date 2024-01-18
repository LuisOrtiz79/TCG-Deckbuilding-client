import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../services/SERVER_URL';
import { AuthContext } from '../context/auth.context';

const MyComments = () => {
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();
  const [comments, setComments] = useState([]);
  const [addComments, setAddComments] = useState({
    user: '',
    deck: '',
    comments: ''
  });
  const [isCreating, setIsCreating] = useState(false);
  const { getUser } = useContext(AuthContext);
  
  const userId = getUser();
  const storedToken = localStorage.getItem('authToken');

  const getCommentInfo = () =>{
    axios
      .get(`${SERVER_URL}/comments`,
      { headers: { Authorization: `Bearer ${storedToken}` }}
      )
      .then((response) => {
        setComments(response.data);
      })
    .catch((error) => console.log(error));
  };

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/decks/${deckId}`)
      .then((response) => {
        setDeck(response.data);
      })
      .catch((error) => console.log(error)); 

    getCommentInfo();
  }, []);

  const handleTextInput = (e) => {
    setAddComments((prev) => ({...prev, [e.target.name]: e.target.value}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${SERVER_URL}/comments`, {
        user: userId,
        deck: deckId,
        comments: addComments.comments
      },
      { headers: { Authorization: `Bearer ${storedToken}` }}
      )
      .then((response) => {
        console.log(response.data);
        setAddComments({
          user: '',
          deck: '',
          comments: ''
        });
      })
      .catch((error) => console.log(error));
    
    setIsCreating(false);
    getCommentInfo();
  };

  const handleDelete = (CommentId) => {
    axios
      .delete(`${SERVER_URL}/comments/${CommentId}`)
      .then((response) => {
        console.log('Deleted Comment ===>', response.data)
      })
      .catch((error) => console.log(error));
  }

  const handleUpdate = (CommentId) => {} //FIx tomorrow

  return (
    <div>{!isCreating ? (
      <>
        {deck && (
            <div>
                <h2>Deck: {deck.name}</h2>
            
                <h3>Main Deck: {`(${deck.main?.length} : 60)`}</h3>
                <div className='mainContainer'>
                  {deck.main && deck.main.map((card, index) => {
                      return (
                          <div key={index}>
                              <img src={card.card_images[0].image_url} alt='cardBox' width={'100vw'} height={'100vh'}/>
                          </div>
                      )
                  })}
                </div>
                
            
                <h3>Extra Deck: {`(${deck.extra?.length} : 15)`}</h3>
                <div className='extraContainer'>
                  {deck.extra && deck.extra.map((card, index) => {
                      return (
                          <div key={index}>
                              <img src={card.card_images[0].image_url} alt='cardBox' width={'100vw'} height={'100vh'}/>
                          </div>
                      )
                  })}
                </div>
                
            
                <h3>Side Deck: {`(${deck.side?.length} : 15)`}</h3>
                <div className='sideContainer'>
                  {deck.side && deck.side.map((card, index) => {
                      return (
                          <div key={index}>
                              <img src={card.card_images[0].image_url} alt='cardBox' width={'100vw'} height={'100vh'}/>
                          </div>
                      )
                  })}
                </div>
            </div>
        )}

        <div>
            <h2>User Comments:</h2>
            {comments.map((comment) => {
                return (
                    <div key={comment._id}>
                        <p>{comment.user.username}</p>
                        <p>{comment.comments}</p>
                        <button onClick={() => handleDelete(comment._id)}>Update</button>
                        <button onClick={() => handleUpdate(comment._id)}>Delete</button>
                    </div>
                )
            })}
        </div>

        <button onClick={() => setIsCreating(true)}>Create comment</button>
      </>
      ) : (
        <div>
            <h2>Add Comment:</h2>
            <form onSubmit={handleSubmit} className='formContainer'>
                <label>
                    Comments
                    <textarea name="comments" value={addComments.comments} onChange={handleTextInput} />
                </label>

                <button type="submit">Submit</button>
            </form>
        </div>
      )}
    </div>
  );
};

export default MyComments;