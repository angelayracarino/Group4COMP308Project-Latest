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


const GET_PATIENTS = gql`
    query GetPatients {
        patients {
            _id
            patientName
            email
            phoneNumber
        }
    }
`;

//create gql to get vitals of a patient
const GET_VITALS = gql`
    query GetVitals($patientId: String!) {
        vitals(patientId: $patientId) {
            _id
            bodyTemperature
            heartRate
            bloodPressure
            respiratoryRate
            pulseRate
            date
            time
        }
    }
`;

const DELETE_PATIENT = gql`
    mutation DeletePatient($id: String!) {
        deletePatient(id: $id) {
            _id
        }
    }
`;

//include a fetching of vitals of a patient
const PatientList = () => {
    const { loading, error, data, refetch } = useQuery(GET_PATIENTS);
    const [deletePatient] = useMutation(DELETE_PATIENT, {
        onCompleted: () => refetch()
    });

    useEffect(() => {
        refetch();
    }, [refetch]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this patient?')) {
            deletePatient({ variables: { id } });
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) {
        console.error(error);
        return <p>Error : ${error.message}(</p>;
    }

    return (
        <div className="patientList">
            <h2>Patient List</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Patient Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.patients.map((patient) => (
                        <tr key={patient._id}>
                            <td>{patient.patientName}</td>
                            <td>{patient.email}</td>
                            <td>{patient.phoneNumber}</td>
                            <td>
                                <Link to={`/patients/${patient._id}`} className="btn btn-primary">Vitals</Link>
                                <Button variant="danger" onClick={() => handleDelete(patient._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default PatientList;
    