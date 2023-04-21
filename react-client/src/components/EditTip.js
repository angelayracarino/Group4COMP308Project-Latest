//Imports
import React, { Component, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { gql, useQuery, useMutation } from '@apollo/client';
//
import { useParams, useNavigate } from 'react-router-dom';

const GET_TIPS = gql`
    query GetTip($id: String!) {
        tip(id: $id) {
            _id
            title
            description
        }
    }
`;

const UPDATE_TIPS = gql`
    mutation updateTip(
        $id: String!
        $title: String!
        $description: String!
    ) {
        updateTip(
            id: $id
            title: $title
            description: $description
        ) {
            _id
            title
            description
        }
    }
`;

function EditTip() {
    let navigate = useNavigate();
    let { id } = useParams();
    const { loading, error, data } = useQuery(GET_TIPS, {
        variables: { id },
        onCompleted: (data) => {
            const {
                title: currentTitle,
                description: currentDescription
            } = data.tip;
            setTip({
                id,
                title: currentTitle,
                description: currentDescription
            });
        }
    });
    const [updateTip] = useMutation(UPDATE_TIPS);
    const [tip, setTip] = useState({
        id: '',
        title: '',
        description: ''
    });

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTip((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        console.log(tip);
    }

    return (
        <div className="entryform">
            <form
                onSubmit={e => {
                    e.preventDefault();
                    updateTip({
                        variables: {
                            id: tip.id,
                            title: tip.title,
                            description: tip.description
                        }
                    });
                    navigate('/tips');
                }}
            >
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" value={tip.title} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" name="description" value={tip.description} onChange={handleInputChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </form>
        </div>
    );
}

export default EditTip;