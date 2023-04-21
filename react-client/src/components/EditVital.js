//Imports
import React, { Component, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { gql, useQuery, useMutation } from '@apollo/client';
//
import { useParams, useNavigate } from 'react-router-dom';


//Create a gql for Vitals

const GET_VITALS = gql`
    query GetVital($id: String!) {
        vital(id: $id) {
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

const UPDATE_VITALS = gql`
    mutation updateVital(
        $id: String!
        $bodyTemperature: String!
        $heartRate: String!
        $bloodPressure: String!
        $respiratoryRate: String!
        $pulseRate: String!
        $date: String!
        $time: String!
        $patient: String!
    ) {
        updateVital(
            id: $id
            bodyTemperature: $bodyTemperature
            heartRate: $heartRate
            bloodPressure: $bloodPressure
            respiratoryRate: $respiratoryRate
            pulseRate: $pulseRate
            date: $date
            time: $time
            patient: $patient
        ) {
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


//Create a mutation for Vitals

function EditVital(props) {
    let navigate = useNavigate();
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_VITALS, {
        variables: { id },
        onCompleted: (data) => {
            const {
                bodyTemperature: currentBodyTemperature,
                heartRate: currentHeartRate,
                bloodPressure: currentBloodPressure,
                respiratoryRate: currentRespiratoryRate,
                pulseRate: currentPulseRate,
                date: currentDate,
                time: currentTime,
                patient: currentPatient
            } = data.vital;
            setVital({
                id,
                bodyTemperature: currentBodyTemperature,
                heartRate: currentHeartRate,
                bloodPressure: currentBloodPressure,
                respiratoryRate: currentRespiratoryRate,
                pulseRate: currentPulseRate,
                date: currentDate,
                time: currentTime,
                patient: currentPatient
            });
        }
    });

    const [updateVital] = useMutation(UPDATE_VITALS);
    const [vital, setVital] = useState({
        id: '',
        bodyTemperature: '',
        heartRate: '',
        bloodPressure: '',
        respiratoryRate: '',
        pulseRate: '',
        date: '',
        time: '',
        patient: ''
    });

    if (loading) return <p>Loading...</p>;
    if (error) {
        console.error(error);
        return <p>Error : ${error.message}(</p>;
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setVital((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        console.log(vital);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        updateVital({
            variables: {
                id: vital.id,
                bodyTemperature: vital.bodyTemperature,
                heartRate: vital.heartRate,
                bloodPressure: vital.bloodPressure,
                respiratoryRate: vital.respiratoryRate,
                pulseRate: vital.pulseRate,
                date: vital.date,
                time: vital.time,
                patient: vital.patient
            }
        });
        navigate('/');
    }

    const handleCancel = (event) => {
        event.preventDefault();
        navigate('/');
    }
    

    return (
        <div className="entryform">
            <form onSubmit={handleSubmit}>
                <Form.Group controlId="formBodyTemperature">
                    <Form.Label>Body Temperature</Form.Label>
                    <Form.Control
                        type="number"
                        name="bodyTemperature"
                        placeholder="Enter Body Temperature"
                        value={vital.bodyTemperature}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formHeartRate">
                    <Form.Label>Heart Rate</Form.Label>
                    <Form.Control
                        type="number"
                        name="heartRate"
                        placeholder="Enter Heart Rate"
                        value={vital.heartRate}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formBloodPressure">
                    <Form.Label>Blood Pressure</Form.Label>
                    <Form.Control
                        type="number"
                        name="bloodPressure"
                        placeholder="Enter Blood Pressure"
                        value={vital.bloodPressure}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formRespiratoryRate">
                    <Form.Label>Respiratory Rate</Form.Label>
                    <Form.Control
                        type="number"
                        name="respiratoryRate"
                        placeholder="Enter Respiratory Rate"
                        value={vital.respiratoryRate}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formPulseRate">
                    <Form.Label>Pulse Rate</Form.Label>
                    <Form.Control
                        type="number"
                        name="pulseRate"
                        placeholder="Enter Pulse Rate"
                        value={vital.pulseRate}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formDate">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="date"
                        placeholder="Enter Date"
                        value={vital.date}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formTime">
                    <Form.Label>Time</Form.Label>
                    <Form.Control
                        type="time"
                        name="time"
                        placeholder="Enter Time"
                        value={vital.time}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formPatient">
                    <Form.Label>Patient</Form.Label>
                    <Form.Control
                        type="text"
                        name="patient"
                        placeholder="Enter Patient"
                        value={vital.patient}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Button variant="secondary" onClick={handleCancel}>
                    Cancel
                </Button>
            </form>
        </div>
    );
};

export default EditVital;
