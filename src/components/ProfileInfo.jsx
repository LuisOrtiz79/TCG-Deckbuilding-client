import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../services/SERVER_URL';
import { AuthContext } from '../context/auth.context';

const ProfileInfo = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { getUser } = useContext(AuthContext);

  const [editedUser, setEditedUser] = useState({
    username: '',
    email: '',
    password: '',
    photo: ''
  });
  
  const userId = getUser();
  const storedToken = localStorage.getItem("authToken");
  
  useEffect(() => {
    const getStudent = () => {
      if (storedToken) {
        axios
          .get(`${SERVER_URL}/users/${userId}`,
            { headers: { Authorization: `Bearer ${storedToken}` }}
          )
          .then((response) => {
            setUserProfile(response.data);
            setLoading(false);
          })
          .catch((error) => {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
          });
      } else {
        setErrorMessage('User not logged in');
      }
    };

    getStudent();
  }, [userId]);

  // Updates the user
  const editUser = (e) => {
    e.preventDefault();
    
    axios
      .put(`${SERVER_URL}/users/${userId}`, {
        username: editedUser.username,
        email: editedUser.email,
        password: editedUser.password,
        photo: editedUser.photo
        },{ headers: { Authorization: `Bearer ${storedToken}` }})
      .then((response) => {
        console.log('Updated user ===> ', response.data);
        navigate('/');
      })
      .catch((error) => console.log(error));
          
      setIsEditing(false);
  };

  const handleTextInput = (e) => {
    setEditedUser((prev) => ({...prev, [e.target.name]: e.target.value}));
  };

  // Gets the user so that it can be updated
  const handleUpdate = () => {
    axios
      .get(`${SERVER_URL}/users/${userId}`,
        { headers: { Authorization: `Bearer ${storedToken}` }})
      .then((response) => {
        setEditedUser(response.data);
      })
      .catch((error) => console.error('Error getting user:', error));

    setIsEditing(true);
  };
  
  return (
    <div className='profile'>
      <>{ !isEditing ?
        <div className='userProfile'>
          {userProfile && (
            <div className='userContainer'>
              <img src={userProfile.photo} alt='profile-photo' width={'200vw'} height={'200vh'} />
              <div>
                <p>Username: {userProfile.username}</p>
                <p>Email: {userProfile.email}</p>
                <button onClick={() => handleUpdate()}>Edit</button>
              </div>
            </div>
          )}
        </div>
        :
        <>
          <form onSubmit={editUser}>
            <label>
              Username
              <input name='username' type='text' value={editedUser.username} onChange={(e) => handleTextInput(e)} />
            </label>

            <br />

            <label>
              Email
              <input name='email' type='email' value={editedUser.email} onChange={(e) => handleTextInput(e)} />
            </label>

            <br />

            <label>
              Password
              <input name='password' type='password' value={editedUser.password} onChange={(e) => handleTextInput(e)} />
            </label>

            <br />

            <label>
              Photo
              <input name='photo' type='text' value={editedUser.photo} onChange={(e) => handleTextInput(e)} />
            </label>

            <br />

            <button type='submit'>Update</button>

            <br />

            <button onClick={() => setIsEditing(false)}>Back</button>
          </form>
        </>
      }
      </>
    </div>
  );
};

export default ProfileInfo;