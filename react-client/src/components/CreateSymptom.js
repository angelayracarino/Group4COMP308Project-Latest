// Imports
import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import Form from 'react-bootstrap/Form';
//import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
//import { Container } from 'react-bootstrap';
import {
    Box,
    Button,
    Container,
    FormControl,
    TextField,
} from '@mui/material';


// Create a gql mutation for Symptom
const CREATE_SYMPTOM = gql`
    mutation createSymptom(
        $selectedSymptom: [String]!
        $patient: String!
        $date: String!
        $time: String!
    ) { 
        createSymptom(
            selectedSymptom: $selectedSymptom
            patient: $patient
            date: $date
            time: $time
        ) {
            selectedSymptom
            patient
            date
            time
        }
    }
`;

// Create a mutation for Symptom
function CreateSymptom() {
    let navigate = useNavigate();
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [patient, setPatient] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');


    const [createSymptom, { data, loading, error }] = useMutation(
        CREATE_SYMPTOM
    );

    const predefinedSymptom = [
        'Fever',
        'Cough',
        'Fatigue',
        'Headache',
        'Loss of taste or smell',
        'Sore throat',
        'Shortness of breath',
        'Muscle aches',
        'Nausea or vomiting',
        'Diarrhea',
        'Runny or stuffy nose',
        'Chills'
    ];

    const handleCheckboxChange = (event) => {
        const symptom = event.target.value;
        const isChecked = event.target.checked;
        if (isChecked) {
            setSelectedSymptoms([...selectedSymptoms, symptom]);
        } else {
            setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        createSymptom({
            variables: {
                selectedSymptom: selectedSymptoms,
                patient: patient,
                date: date,
                time: time
            }
        })
        .then(() => {
            setSelectedSymptoms([]);
            setPatient('');
            setDate('');    
            setTime('');
            navigate('/');
            if (selectedSymptoms.includes('Fever') || 
                selectedSymptoms.includes('Shortness of breath') || 
                selectedSymptoms.includes('Nausea or vomiting') || 
                selectedSymptoms.includes('Diarrhea')) {
                alert('You have selected a symptom that could indicate a severe case of COVID-19. Please seek medical attention immediately.');
            }
            else{
                alert('Your symptoms have been submitted. Please stay home and quarantine.');
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };
    

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;


    return (
        <Container maxWidth="xs">
        <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap' }}></Box>
                <form 
                onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Symptoms</Form.Label>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {predefinedSymptom.map((symptom, index) => (
                                <Form.Check
                                    key={index}
                                    inline
                                    label={symptom}
                                    value={symptom}
                                    type="checkbox"
                                    checked={selectedSymptoms.includes(symptom)}
                                    onChange={handleCheckboxChange}
                                />
                            ))}
                        </div>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Patient Name</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={(e) => setPatient(e.target.value)}
                            placeholder="Enter patient name"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="date"
                            onChange={(e) => setDate(e.target.value)}
                            placeholder="Enter date"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Time</Form.Label>
                        <Form.Control
                            type="time"
                            onChange={(e) => setTime(e.target.value)}
                            placeholder="Enter time"
                        />
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
}

export default CreateSymptom;