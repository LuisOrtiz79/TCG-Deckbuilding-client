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
  
    useEffect(() => {
      const getStudent = () => {
        const storedToken = localStorage.getItem("authToken");
  
        if (storedToken) {
          axios
          .get(
            `${SERVER_URL}/users/${userId}`,
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
          }
          else {
            setErrorMessage("User not logged in");
          }
      };
      getStudent();
    }, [userId]);

    const editUser = (e) => {
        const storedToken = localStorage.getItem("authToken");
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

    const handleUpdate = () => {
        const storedToken = localStorage.getItem("authToken");
        axios
            .get(`${SERVER_URL}/users/${userId}`,
            { headers: { Authorization: `Bearer ${storedToken}` }})
            .then((response) => {
                setEditedUser(response.data);
            })
            .catch((error) => {
                console.error('Error getting user:', error);
            });

        setIsEditing(true);
    };
  
    return (
      <>{ !isEditing ?
        <div>
            {userProfile && (
                <>
                <img src={userProfile.photo} alt='profile-photo' width={'100vw'} height={'100vh'} />
                <p>Username: {userProfile.username}</p>
                <p>Email: {userProfile.email}</p>
                <button onClick={() => handleUpdate()}>Update</button>
                </>
            )}
        </div>
        :
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
        </form>
        }
      </>
    );
};

export default ProfileInfo;