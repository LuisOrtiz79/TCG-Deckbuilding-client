import { useState, useEffect, useContext } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../services/SERVER_URL';
import { AuthContext } from '../context/auth.context';

const CommentInfo = () => {
  const [comment, setComment] = useState({
    user: '',
    deck: '',
    comments: ''
  });
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);

  const { getUser } = useContext(AuthContext);

  const userId = getUser();
  const navigate = useNavigate();

  const handleTextInput = (e) => {
    setComment((prev) => ({...prev, [e.target.name]: e.target.value}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${SERVER_URL}/comments`, {
        user: userId,
        deck: comment.deck,
        comments: comment.comment
      })
      .then((response) => {
        console.log(response.data);
        setComment({
          user: '',
          deck: '',
          comments: ''
        });
      })
      .catch((error) => console.log(error))
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${SERVER_URL}/comments`);
        setConversation(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  return (
    <div>
      <div>
        {/* Display comments */}
        {loading ? (
          <p>Loading comments...</p>
        ) : (
          conversation.map((comment) => (
            <div key={comment._id}>
              <p>{comment.user.username}</p>
              <p>{comment.Comment}</p>
            </div>
          ))
        )}
      </div>

      {/* Form for adding new comments */}
      <form onSubmit={handleSubmit}>
        <label>
          Comments
          <textarea
            name="comments"
            value={comment.comments}
            onChange={handleTextInput}
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CommentInfo;