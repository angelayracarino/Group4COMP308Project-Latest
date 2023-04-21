import React, { useEffect } from 'react';
import { gql, useQuery, useMutation } from "@apollo/client";
//import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
//import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import './list.css';


// alert graphql query
const GET_ALERTS = gql`
    query GetAlerts {
        alerts {
            _id
            responderName
            email
            phoneNumber
            patientName
            address
            message
        }
    }
`;

// alert graphql mutation
const DELETE_ALERT = gql`
    mutation DeleteAlert($id: String!) {
        deleteAlert(id: $id) {
            _id
        }
    }
`;

function AlertList() {
    const { loading, error, data, refetch } = useQuery(GET_ALERTS);
    const [deleteAlert] = useMutation(DELETE_ALERT, {
        onCompleted: () => refetch()
    });

    useEffect(() => {
        refetch();
    }, [refetch]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this alert?')) {
            deleteAlert({ variables: { id } });
        }
    }

    if (loading) return <p>Loading...</p>;
    if (error) {
        console.error(error);
        return <p>Error : ${error.message}(</p>;
    }

    return (    
        <Container>
        <div className="alertList">
            <h1>Alert List</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Responder Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Patient Name</th>
                        <th>Address</th>
                        <th>Message</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.alerts.map((alert) => (
                        <tr key={alert._id}>
                            <td>{alert.responderName}</td>
                            <td>{alert.email}</td>
                            <td>{alert.phoneNumber}</td>
                            <td>{alert.patientName}</td>
                            <td>{alert.address}</td>
                            <td>{alert.message}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleDelete(alert._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
        </Container>
    );
}

export default AlertList;