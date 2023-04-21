//Imports
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { gql, useMutation } from '@apollo/client';

//Create a gql for Tips

const CREATE_TIPS = gql`
    mutation createTip(
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

//Create a component for Tips
const CreateTip = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const clearState = () => {
        setTitle('');
        setDescription('');
    };

    const [createTip, { loading }] = useMutation(CREATE_TIPS);

    const handleSubmit = (event) => {
        e.preventDefault();
        if(
            title === '' ||
            description === ''
        ) {
            toast.error('Please fill out all fields');
        } else {
            createTip({
                variables: {
                    title: title,
                    description: description
                }
            }).then(() => {
                toast.success('Tips added successfully');
                clearState();
            }).catch((error) => {
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
        <div>
                <Container className='my-3 py-3'>
                    <Row>
                    <Col md={{ span: 4, offset: 4 }} className='p-4 custom-shadow' style={{background:"lightGrey"}}>
						<h4 className='text-center'>Add Vitals</h4>
                        <Form className='my-3' onSubmit={handlesubmit} id='courseform'>
                            <Form.Group className='mb-3'>
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter title'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant='primary' type='submit'>
                                Submit
                            </Button>
                        </Form>
                    </Col>
                    </Row>
                </Container>
            </div>
    );
};

export default CreateTip;
                    
