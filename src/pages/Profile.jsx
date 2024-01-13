import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../services/SERVER_URL';
import { AuthContext } from '../context/auth.context';

const Profile = () => {
  const [userProfile, setUserProfile] = useState([]);
  const { getUser } = useContext(AuthContext);

  const userId = getUser();

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/${userId}`)
      .then((response) => {
        setUserProfile(response.data);
      })
      .catch((error) => console.log(error));
  }, [])

  return (
    <div className='profilePage'>
        <h1>Profile</h1>

        {userProfile && (
          <>
            <img src={userProfile.photo} alt='profile-photo' />
            <p>Username: {userProfile.username}</p>
            <p>Email: {userProfile.email}</p>
          </>
        )}
    </div>
  );
};

export default Profile;
