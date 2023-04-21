import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    Box,
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@mui/material';
import { gql, useMutation } from '@apollo/client';
import banner2 from "../images/banner2.jpg";
//import { UserContext } from '../shared/UserContext';


const CREATE_USER = gql`
    mutation createUser(
		$firstName: String!
		$lastName: String!
		$email: String!
		$password: String!
        $address: String!
		$city: String!
        $province: String!
		$postalCode: String!
        $phone: String!
        $role: String!
    ) {
        createUser(
            firstName: $firstName
			lastName: $lastName
			email: $email
			password: $password
            address: $address
			city: $city
            province: $province
			postalCode: $postalCode
            phone: $phone
            role: $role
        ) {
            _id
            firstName
			lastName
			email
			password
            address
			city
            province
			postalCode
            phone
            role
        }
    }
`;

const CreateUser = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');

    const navigate = useNavigate();

    const clearState = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setAddress('');
        setCity('');
        setProvince('');
        setPostalCode('');
        setPhone('');
        setRole('');
    };

    const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

    const handleRegister = async (e) => {
        e.preventDefault();
        if (
            firstName === '' ||
            lastName === '' ||
            email === '' ||
            password === '' ||
            address === '' ||
            city === '' ||
            province === '' ||
            postalCode === '' ||
            phone === '' ||
            role === ''
        ) {
            toast.error('Please Fill Personal Information!!');
        } else {
            createUser({
                variables: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    address: address,
                    city: city,
                    province: province,
                    postalCode: postalCode,
                    phone: phone,
                    role: role,
                }
            })
                .then(() => {
                    toast.success('User Added');
                    console.log(firstName + ' ' + lastName, 'was successfully added!!!');
                    window.location.href = '/login';
                    clearState();
                })
                .catch((error) => {
                    toast.error(error.message);
                });
        }
    };

    if (loading)
        return (
            <Container className='my-3 py-3'>
                <p>Submitting...</p>
            </Container>
        );

    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <img src={banner2} className="banner2" />
        <Container>
                    <Container maxWidth="xs" >
                        <Box sx={{ mt: 0.8, flexWrap: 'wrap', border: '2px solid #d7baad', borderRadius: '10px', padding: '15px'}}>
                            <form autoComplete="off" noValidate onSubmit={handleRegister}>
                                
                                <Box sx={{ mt: 0, display: 'flex', justifyContent: 'space-between' }}>
                                    <FormControl sx={{ mr: 1 }} fullWidth>
                                        <TextField
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            label="Enter First Name"
                                            variant="outlined"
                                            color="primary"
                                            type="text"
                                            required
                                        />
                                    </FormControl>
                                    <FormControl sx={{ ml: 1 }} fullWidth>
                                        <TextField
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            label="Enter Last Name"
                                            variant="outlined"
                                            color="primary"
                                            type="text"
                                            required
                                        />
                                    </FormControl>
                                </Box>
                                <FormControl sx={{ mt: 1 }} fullWidth>
                                    <TextField
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        label="Enter Email Address"
                                        variant="outlined"
                                        color="primary"
                                        type="email"
                                        required
                                    />
                                </FormControl>
                                <FormControl sx={{ mt: 1 }} fullWidth>
                                    <TextField
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        label="Enter Password"
                                        variant="outlined"
                                        color="primary"
                                        type="password"
                                        required
                                    />
                                </FormControl>
                                <FormControl sx={{ mt: 1 }} fullWidth>
                                    <TextField
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        label="Enter Address Line 1"
                                        variant="outlined"
                                        color="primary"
                                        type="text"
                                        required
                                    />
                                </FormControl>
                                <FormControl sx={{ mt: 1 }} fullWidth>
                                    <TextField
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        label="Enter City"
                                        variant="outlined"
                                        color="primary"
                                        type="text"
                                        required
                                    />
                                </FormControl>
                                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
                                    <FormControl sx={{ mr: 1 }} fullWidth>
                                        <TextField
                                            value={province}
                                            onChange={(e) => setProvince(e.target.value)}
                                            label="Enter Province"
                                            variant="outlined"
                                            color="primary"
                                            type="text"
                                            required
                                        />
                                    </FormControl>
                                    <FormControl sx={{ ml: 1 }} fullWidth>
                                        <TextField
                                            value={postalCode}
                                            onChange={(e) => setPostalCode(e.target.value)}
                                            label="Enter Postal Code"
                                            variant="outlined"
                                            color="primary"
                                            type="text"
                                            required
                                        />
                                    </FormControl>
                                </Box>
                                <FormControl sx={{ mt: 1 }} fullWidth>
                                    <TextField
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        label="Enter Phone Number"
                                        variant="outlined"
                                        color="primary"
                                        type="text"
                                        required
                                    />
                                </FormControl>
                                <FormControl sx={{ mt: 1 }} fullWidth>
                                    <InputLabel>Select Role</InputLabel>
                                    <Select
                                        value={role}
                                        label="SelectRole"
                                        required
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <MenuItem value={'patient'}>Patient</MenuItem>
                                        <MenuItem value={'nurse'}>Nurse</MenuItem>
                                    </Select>
                                </FormControl>
                                <br />
                                <br />
                                <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                                    <Button
                                        variant='outlined'
                                        type='button'
                                        class="button"
                                        onClick={() => navigate(-1)}
                                    > Cancel
                                    </Button>
                                    <Button
                                        type='submit'
                                        color="primary"
                                        variant="contained"
                                        class="button"
                                    > Register </Button>
                                </div>
                            </form>
                        </Box>
                    </Container>
            </Container>
          
        </div>



    );
};

export default CreateUser;