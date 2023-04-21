//Imports
import React from 'react';
import { gql, useMutation } from '@apollo/client';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
//import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import { 
    Box, 
    Button,
    Container,
    FormControl,
    TextField,
} from '@mui/material';
//
import { useNavigate } from 'react-router-dom';

//Create gql for Tips

const CREATE_TIP = gql`
    mutation CreateTip(
        $title: String!
        $description: String!
    ) {
        createTip(
            title: $title
            description: $description
        ) {
            title
            description
        }
    }
`;

function CreateTip() {
    let navigate = useNavigate();
    let title, description;
    const [createTip, { data, loading, error }] = useMutation(CREATE_TIP);
    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;
    return (

        <Container maxWidth="xs">
            <Box sx={{ mt: 5, display: 'flex', flexWrap: 'wrap' }}></Box>
            <form
                onSubmit={e => { 
                    e.preventDefault();
                    createTip({
                        variables: {
                            title: title.value,
                            description: description.value
                        }
                    });
                    title.value = '';
                    description.value = '';
                    navigate('/tips');
                }}
            >
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" ref={node => {
                        title = node;
                    }} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" ref={node => {
                        description = node;
                    }} />
                </Form.Group>
                <Box sx={{mt: 2}} style={{display: 'flex', flexDirection: 'column', textAlign: 'center', width:'100%'}}>
                    <div>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            class="button"
                        > Submit </Button>
                    </div>
                </Box>
            </form>
        </Container>
    );
}

export default CreateTip;



