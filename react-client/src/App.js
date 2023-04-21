import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Navigate,
  Routes
} from "react-router-dom";
import React, { useState, Fragment, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faBell, faComment, faDumbbell, faHospitalUser, faHouse, faUser, faVial } from '@fortawesome/free-solid-svg-icons';

//
// This app requires react-bootstrap and bootstrap installed: 
//  npm install react-bootstrap bootstrap
//
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Modal, Navbar, Nav } from 'react-bootstrap';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import UserProfile from './components/User';
import CreateVital from './components/CreateVital';
import CreateTip from './components/CreateTip';
import VitalList from './components/VitalList';
import TipList from './components/TipList';
import EditVital from './components/EditVital';
import EditTip from './components/EditTip';
import CreateAlert from './components/CreateAlert';
import CreateSymptom from './components/CreateSymptom';
import AlertList from './components/AlertList';
import Game from './components/Game';
import Patients from './components/Patients';
import UserVitals from './components/UserVitals';
import {
  useAuthToken,
  useAuthUserToken,
  useAuthRole,
  useLogout
} from "./auth/auth";
import Checkup from './components/Checkup';

//
function App() {

  // query for checking if user is logged in
  const PAYLOAD = gql`
  query Payload {
    payload{
      _id
      email
      role
    }
  }
  `;

  const LOGOUT_USER = gql`
  mutation logOut
  {
    logOut
  }
  `;

  //const [, updateState] = React.useState();
  //const forceUpdate = React.useCallback(() => updateState({}), []);
  const [logoutUser] = useMutation(LOGOUT_USER);

  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [authToken] = useAuthToken();
  const [authUserToken] = useAuthUserToken();
  const [authRole] = useAuthRole();

  useEffect(() => {
    if (authToken) {
      setCurrentUser(authUserToken);
    }
  }, [authToken, authUserToken]);

  const NurseProtectedRoute = ({ children }) => {
    if (!isNurse()) {
      return <Navigate to="/login" replace />
    }
    return children;
  }

  const RedirectHomeRoute = ({ children }) => {
    if (isLoggedIn()) {
      return <Navigate to="/home" replace />
    }
    return children;
  }

  const { loading, error, data } = useQuery(PAYLOAD, {
    onCompleted: (data) => {
      console.log(data.payload)
      setRole(data.payload.role);
      setEmail(data.payload.email);
      sessionStorage.setItem('user_id', data.payload._id);
      sessionStorage.setItem('email', data.payload.email);
    }
  });

  const logout = () => {
    logoutUser()
      .then(() => {
        sessionStorage.clear();
        window.location.href = '/login'
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const isLoggedIn = () => {
    return sessionStorage.getItem('email') !== undefined
      && sessionStorage.getItem('email') !== ''
      && sessionStorage.getItem('email') !== null;
  }

  const isNurse = () => {
    return isLoggedIn() && sessionStorage.getItem('role') === 'nurse';
  }

  const user_email = sessionStorage.getItem('email');
  const user_role = sessionStorage.getItem('role');

  return (
    <div>
      <Router>
        <Navbar className='navbar' variant="light" expand="lg">
          <Container>
            <Navbar.Brand href="/">
              <img
                src="medical-nav.png"
                width="120px"
                height="45px"
                className="d-inline-block align-top"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Nav className="ml-auto">
              <Nav.Link className='ms-auto'as={Link} to="/home" > <FontAwesomeIcon icon={faHouse} /> Home</Nav.Link>
                {
                  !isLoggedIn() ?
                    <Fragment>
                     <Nav.Link className='ms-auto'as={Link} to="/register" > <FontAwesomeIcon icon={faAddressCard} /> Register</Nav.Link>
                     <Nav.Link className='ms-auto'as={Link} to="/login" > <FontAwesomeIcon icon={faUser} /> Login</Nav.Link>
                    </Fragment>
                    :
                    <Fragment>
                      {isNurse() ?
                        <Fragment>
                          <Nav.Link className='ms-auto'as={Link} to="/add-tip" > <FontAwesomeIcon icon={faComment} /> Create Tip</Nav.Link>
                          <Nav.Link className='ms-auto'as={Link} to="/add-vitals" > <FontAwesomeIcon icon={faVial} /> Create Vitals</Nav.Link>
                          <Nav.Link className='ms-auto'as={Link} to="/patients" > <FontAwesomeIcon icon={faHospitalUser} /> Patients</Nav.Link>
                          <Nav.Link className='ms-auto'as={Link} to="/alerts" > <FontAwesomeIcon icon={faBell} /> Alerts</Nav.Link>
                          <Nav.Link className='ms-auto'as={Link} to="/vitals" > <FontAwesomeIcon icon={faVial} /> Vitals</Nav.Link>
                          <Nav.Link className='ms-auto'as={Link} to="/tips" > <FontAwesomeIcon icon={faComment} /> Tips</Nav.Link>
                          {/* <Nav.Link className='ms-auto'as={Link} to="/add-vitals" > <FontAwesomeIcon icon={faVial} /> Create Vitals</Nav.Link> */}
                        </Fragment>
                        :
                        <Fragment>
                          <Nav.Link className='ms-auto'as={Link} to="/add-vitals" > <FontAwesomeIcon icon={faVial} /> Enter Vitals</Nav.Link>
                          <Nav.Link className='ms-auto'as={Link} to="/add-alert" > <FontAwesomeIcon icon={faBell} /> Submit Alert</Nav.Link>
                          <Nav.Link className='ms-auto'as={Link} to="/tips" > <FontAwesomeIcon icon={faComment} /> Tip List</Nav.Link>
                          <Nav.Link className='ms-auto'as={Link} to="/symptoms" > <FontAwesomeIcon icon={faBell} /> Create Symptoms</Nav.Link>
                          <Nav.Link className='ms-auto'as={Link} to="/fitness" > <FontAwesomeIcon icon={faDumbbell} /> Fitness</Nav.Link>
                        </Fragment>
                      }
                      <div className={`nav-link`} style={{ cursor: "pointer" }} onClick={() => logout()}> Logout {user_email} ({user_role}) </div>
                    </Fragment>
                }
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={< Home />} />
            <Route path="/login" element={< Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add-vitals" element={<CreateVital />} />
            <Route path="/vitals" element={<VitalList />} />
            <Route path="/edit-vital/:id" element={<EditVital />} />
            <Route path="/add-tip" element={<CreateTip />} />
            <Route path="/tips" element={<TipList />} />
            <Route path="/edit-tip/:id" element={<EditTip />} />
            <Route path="/add-alert" element={<CreateAlert />} />
            <Route path="/alerts" element={<AlertList />} />
            <Route path="/symptoms" element={<CreateSymptom />} />
            <Route path="/fitness" element={<Game />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/vitals/:firstName/:lastName" element={<UserVitals />} />
            <Route path="/add-covid" element={<CreateSymptom />} />
            <Route path="/checkup" element={<Checkup />} />
            <Route path="/create/record/:patientIdnew" element={<CreateVital nurseId={data} />} />
          </Routes>
        </div>
      </Router>


      <div className="footer App">
        &copy;{new Date().getFullYear()} LifeCheck
      </div>
    </div>


  );
}
//<Route render ={()=> < App />} path="/" />
export default App;