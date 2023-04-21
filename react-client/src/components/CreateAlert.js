//Imports
import React from 'react';
import { gql, useMutation } from '@apollo/client';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
//import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
    FormControl,
    TextField,
} from '@mui/material';


//Create a gql for Alert

const CREATE_ALERT = gql`
    mutation createAlert(
        $responderName: String!
        $email: String!
        $phoneNumber: String!
        $patientName: String!
        $address: String!
        $message: String!
    ) { 
        createAlert(
            responderName: $responderName
            email: $email
            phoneNumber: $phoneNumber
            patientName: $patientName
            address: $address
            message: $message
        ) {
            responderName
            email
            phoneNumber
            patientName
            address
            message
        }
    }
`;

//Create a mutation for Alert

function CreateAlert() {
    let navigate = useNavigate();
    let responderName, email, phoneNumber, patientName, address, message;
    const [createAlert, { data, loading, error }] = useMutation(CREATE_ALERT);
    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap' }}></Box>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    createAlert({
                        variables: {
                            responderName: responderName.value,
                            email: email.value,
                            phoneNumber: phoneNumber.value,
                            patientName: patientName.value,
                            address: address.value,
                            message: message.value
                        }
                    });
                    responderName.value = '';
                    email.value = '';
                    phoneNumber.value = '';
                    patientName.value = '';
                    address.value = '';
                    message.value = '';
                    navigate('/');
                }}
            >
                <Form.Group>
                    <Form.Label>Responder Name</Form.Label>
                    <Form.Control
                        type="text"
                        ref={node => {
                            responderName = node;
                        }
                        }
                        placeholder="Enter responder name"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="text"
                        ref={node => {
                            email = node;
                        }
                        }
                        placeholder="Enter email"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="text"
                        ref={node => {
                            phoneNumber = node;
                        }
                        }
                        placeholder="Enter phone number"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Patient Name</Form.Label>
                    <Form.Control
                        type="text"
                        ref={node => {
                            patientName = node;
                        }
                        }
                        placeholder="Enter patient name"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        ref={node => {
                            address = node;
                        }
                        }
                        placeholder="Enter address"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                        as="textarea"
                        ref={node => {
                            message = node;
                        }
                        }
                        placeholder="Enter message"
                    />
                </Form.Group>

                <Box sx={{ mt: 2 }} style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', width: '100%' }}>
                    <div>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            className="button"
                        > Submit </Button>
                    </div>
                </Box>
            </form>
        </Container>



    );
}

export default CreateAlert;
