import React, { useEffect } from 'react';
import { gql, useQuery, useMutation } from "@apollo/client";
//import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
//import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
// import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import './list.css';
import {
    Box,
    Button,
    FormControl,
    TextField,
} from '@mui/material';

const GET_TIPS = gql`
    query GetTips {
        tips {
            _id
            title
            description
        }
    }
`;

const DELETE_TIPS = gql`
    mutation DeleteTips($id: String!) {
        deleteTip(id: $id) {
            _id
        }
    }
`;

function TipList() {
    const { loading, error, data, refetch } = useQuery(GET_TIPS);
    const [deleteTips] = useMutation(DELETE_TIPS, {
        onCompleted: () => refetch()
    });

    useEffect(() => {
        refetch();
    }, [refetch]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this tip?')) {
            deleteTips({ variables: { id } });
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) {
        console.error(error);
        return <p>Error : ${error.message}(</p>;
    }

    return (
        <Container>
            <div className="tipList">
            <h1>Tip List</h1>
                <Box sx={{ mt: 2 }} style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', width: '100%' }}>
                    <Link to={`/add-tip`}>
                        <Button
                            color="primary"
                            variant="contained"
                            class="button"
                        > Add Tip </Button>
                    </Link>
                </Box>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.tips.map((tip) => (
                            <tr key={tip._id}>
                                <td>{tip.title}</td>
                                <td>{tip.description}</td>
                                <td>
                                    <Button variant="danger" onClick={() => handleDelete(tip._id)}>Delete</Button>
                                    <Link to={`/edit-tip/${tip._id}`}><Button variant="primary">Edit</Button></Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
}

export default TipList;
