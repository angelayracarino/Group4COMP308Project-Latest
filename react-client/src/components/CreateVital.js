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


//Create a gql for Vitals

const CREATE_VITALS = gql`
    mutation createVital(
        $bodyTemperature: String!
        $heartRate: String!
        $bloodPressure: String!
        $respiratoryRate: String!
        $pulseRate: String!
        $date: String!
        $time: String!
        $patient: String!
    ) {
        createVital(
            bodyTemperature: $bodyTemperature
            heartRate: $heartRate
            bloodPressure: $bloodPressure
            respiratoryRate: $respiratoryRate
            pulseRate: $pulseRate
            date: $date
            time: $time
            patient: $patient
        ) {
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

const CreateVital = () => {

    let navigate = useNavigate();

    let bodyTemperature, heartRate, bloodPressure, respiratoryRate, pulseRate, date, time, patient;
    const [createVital, { data, loading, error }] = useMutation(CREATE_VITALS);

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    return (
        <Container maxWidth="xs">
        <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap' }}></Box>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    createVital({
                        variables: {
                            bodyTemperature: bodyTemperature.value,
                            heartRate: heartRate.value,
                            bloodPressure: bloodPressure.value,
                            respiratoryRate: respiratoryRate.value,
                            pulseRate: pulseRate.value,
                            date: date.value, 
                            time: time.value, 
                            patient: patient.value
                        }
                    });

                    bodyTemperature.value = '';
                    heartRate.value = '';
                    bloodPressure.value = '';
                    respiratoryRate.value = '';
                    pulseRate.value = '';
                    date.value = '';
                    time.value = '';
                    patient.value = '';

                    navigate('/');
                }}
            >
                <Form.Group>
                    <Form.Label>Body Temperature</Form.Label>
                    <Form.Control type="number" placeholder="Enter body temperature" ref={node => { bodyTemperature = node; }} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Heart Rate</Form.Label>
                    <Form.Control type="number" placeholder="Enter heart rate" ref={node => { heartRate = node; }} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Blood Pressure</Form.Label>
                    <Form.Control type="number" placeholder="Enter blood pressure" ref={node => { bloodPressure = node; }} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Respiratory Rate</Form.Label>
                    <Form.Control type="number" placeholder="Enter respiratory rate" ref={node => { respiratoryRate = node; }} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Pulse Rate</Form.Label>
                    <Form.Control type="number" placeholder="Enter pulse rate" ref={node => { pulseRate = node; }} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" placeholder="Enter date" ref={node => { date = node; }} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Time</Form.Label>
                    <Form.Control type="time" placeholder="Enter time" ref={node => { time = node; }} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Patient</Form.Label>
                    <Form.Control type="text" placeholder="Enter patient" ref={node => { patient = node; }} />
                </Form.Group>

                <Box sx={{mt: 2}} style={{display: 'flex', flexDirection: 'column', textAlign: 'center', width:'100%'}}>
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
};

export default CreateVital;
