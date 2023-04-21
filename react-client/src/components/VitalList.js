import React, { useEffect, useState } from 'react';
import { gql, useQuery, useMutation } from "@apollo/client";
import { useAuthToken, useAuthUserToken, useAuthRole } from "../auth/auth";
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

const GET_VITALS = gql`
    query GetVitals {
        vitals {
            _id
            bodyTemperature
            heartRate
            bloodPressure
            respiratoryRate
            pulseRate
            date
            time
            patient
        }
    }
`;

const DELETE_VITALS = gql`
    mutation DeleteVitals($id: String!) {
        deleteVital(id: $id) {
            _id
        }
    }
`;

const VitalList = () => {
    const [authUserToken] = useAuthUserToken();
    const [authRole] = useAuthRole();
    const [content, setContent] = useState("");
    
    const { loading, error, data, refetch } = useQuery(GET_VITALS);
    const [deleteVitals] = useMutation(DELETE_VITALS, {
        onCompleted: () => refetch()
    });

    useEffect(() => {
        if (authUserToken && authRole) {
            setContent(authUserToken);
        }
    }, [authUserToken, authRole]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this vital?')) {
            deleteVitals({ variables: { id } });
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) {
        console.error(error);
        return <p>Error : ${error.message}(</p>;
    }

    return (
        <Container>
            <div className="vitalList">
                <h1>Vital List</h1>
                <Box sx={{ mt: 2 }} style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', width: '100%' }}>
                    <Link to={`/add-vitals`}>
                        <Button
                            color="primary"
                            variant="contained"
                            className="button"
                        > Add Vital </Button>
                    </Link>
                </Box>
                <br></br>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Body Temperature</th>
                            <th>Heart Rate</th>
                            <th>Blood Pressure</th>
                            <th>Respiratory Rate</th>
                            <th>Pulse Rate</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Patient</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.vitals.map((vital) => (
                            <tr key={vital._id}>
                                <td>{vital.bodyTemperature}</td>
                                <td>{vital.heartRate}</td>
                                <td>{vital.bloodPressure}</td>
                                <td>{vital.respiratoryRate}</td>
                                <td>{vital.pulseRate}</td>
                                <td>{vital.date}</td>
                                <td>{vital.time}</td>
                                <td>{vital.patient}</td>
                                <td>
                                <>
                                { content && authRole === "nurse" ? (
                                <div>
                                    <Button variant="danger" onClick={() => handleDelete(vital._id)}>Delete</Button>
                                    <Link to={`/edit-vital/${vital._id}`}><Button variant="primary">Edit</Button></Link>
                                </div>

                                ) : (
                                    <div>
                                        <Link to={`/edit-vital/${vital._id}`}><Button variant="primary">Edit</Button></Link>
                                    </div>
                                )}
                            </>
                                    
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
};

export default VitalList;
