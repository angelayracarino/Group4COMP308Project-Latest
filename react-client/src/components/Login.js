
import React, { useContext, useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Box, Button, Container, FormControl, TextField } from '@mui/material';
import { Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import {
  useAuthToken,
  useAuthUserToken,
  useAuthRole,
} from "../auth/auth";
// mutation for user login
const LOGIN_USER = gql`
mutation loginUser( $email: String!, $password: String! ) {
	loginUser( email: $email, password: $password)
  {
      email
      role
      token
      _id
  }
}
`;

// Login function component
function Login() {

  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');

  const [_, setAuthToken, removeAuthtoken] = useAuthToken();
  const [__, setAuthUserToken, removeAuthUsertoken] = useAuthUserToken();
  const [___, setAuthRole, removeAuthRole] = useAuthRole();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await loginUser({
        variables: {
          email,
          password
        },
      });
      console.log('Logged in as:', data);
      console.log('Logged in as:', data.loginUser);
      sessionStorage.setItem("email", data.loginUser.email);
      sessionStorage.setItem("role", data.loginUser.role);

      setAuthToken(data.loginUser.token);
      setAuthUserToken(data.loginUser.email);
      setAuthRole(data.loginUser.role);
      window.location.href = '/home';

    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (

        <Container maxWidth="xs">
          <Box sx={{ mt: 10, display: 'flex', flexWrap: 'wrap', border: '2px solid #a9acc9', borderRadius: '20px', padding: '15px' }}>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <FormControl sx={{ mt: 1 }} fullWidth>
                <TextField
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email"
                  variant="outlined"
                  color="primary"
                  id="email"
                  type="email"
                />
              </FormControl>
              <FormControl sx={{ mt: 1 }} fullWidth>
                <TextField
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  variant="outlined"
                  color="primary"
                  id="password"
                  type="password"
                />
              </FormControl>

              {loading ? <p style={{ color: 'blue' }}>Submitting</p> : <div></div>}
              {error ? <p style={{ color: 'red' }}>{error.message}</p> : <div></div>}
              <br />
              <br />
              <Box sx={{ mt: 2 }} style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', width: '100%' }}>
                <div>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    class="button"
                    disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                  </Button>
                </div>
                <Box sx={{ mt: 1 }}>
                  <NavLink to={`/register`}>
                    <span>Don't have an account?</span>
                  </NavLink>
                </Box>
              </Box>
            </form>
          </Box>
          
        </Container>
  );
}
//
export default Login;