import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../services/SERVER_URL';
import { AuthContext } from '../context/auth.context';

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { getUser } = useContext(AuthContext);

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

  return (
    <div className='profilePage'>
        <h1>Profile</h1>

        {userProfile && (
          <>
            <img src={userProfile.photo} alt='profile-photo' width={'100vw'} height={'100vh'} />
            <p>Username: {userProfile.username}</p>
            <p>Email: {userProfile.email}</p>
          </>
        )}
    </div>
  );
};

export default Profile;
