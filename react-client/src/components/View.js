//View.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css";
//
import { useQuery, useMutation, gql } from '@apollo/client';
// mutation to log the user out
const LOG_OUT_MUTATION = gql`
  mutation LogOut {
    logOut
  }
`;
// query to check if user is logged in
const LOGGED_IN_USER = gql`
  query IsLoggedIn {
    isLoggedIn
      
  }
`;
//
function View (props) {
  //
  const navigate = useNavigate();
  // read the info from props, coming from the ancestor component
  const { screen, setScreen } = props;
  // return a stateful value and funcion to update it
  const [data, setData] = useState();
  //
  const [logOut, { loading, error }] = useMutation(LOG_OUT_MUTATION);
  //
  const { data: isLoggedInData, loading: isLoggedInLoading, error: isLoggedInError } = useQuery(LOGGED_IN_USER);
      console.log('isLoggedInData: ',isLoggedInData)
    // Show loading indicator if data is still being fetched
    if (isLoggedInLoading) return <p>Loading...</p>;

    // Show error message if there was an error fetching the data
    if (isLoggedInError) return <p>Error: {isLoggedInError.message}</p>;
  //
  
  // called when user clicks on Verify Cookie button
  // end-point demonstrates another example for the use
  // of cookie specific response from the server.
  const verifyToken = async () => {
    try {
      const isLoggedIn = isLoggedInData.isLoggedIn;
      console.log('isLoggedIn:', isLoggedIn);
    } catch (err) {
      console.error(err.message);
    }
  };
  //
  /*
  const handleLogOut = async () => {
    try {
      await logOut();
      setScreen('auth')
      navigate('/login'); // navigate to the Login component after logging out
    } catch (err) {
      console.error(err.message);
    }
  };
  */
  const handleLogOut = () => {
    logOut()
      .then(() => {
        localStorage.removeItem('screen');
        navigate('/home'); // navigate to the Login component after logging out
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const handleCreateCourse = () => {
    navigate('/createcourse');
  };

  const handleMyCourses = () => {
    navigate('/courselist');
  };


  //
  return (
    <div className="App">
      {/* <button onClick={verifyToken}>Verify Token</button> */}
      <button className='button-89' onClick={handleCreateCourse}>Register Patient</button>
      {/*<button className='button-89' onClick={handleMyCourses}>My Courses</button>*/}
      <button className='button-89' onClick={handleLogOut}>Log out</button>        

    </div>
  );
}
//
export default View;
