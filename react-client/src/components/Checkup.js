import React, { useState } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function Checkup() {
    const [data, setData] = useState({
        body_temperature: '',
        heart_rate: '',
        systolic: '',
        diastolic: '',
        respiratory_rate: '',
        pulse_rate: ''
    });

    const [prediction, setPrediction] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const apiUrl = "http://localhost:4000/run";

    const onChange = (e) => {
        e.persist();
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setPrediction(null);
        setError(null);
        axios.post(apiUrl, data)
            .then(res => {
                console.log(res.data);
                setPrediction(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setError('An error occurred. Please try again later.');
                setIsLoading(false);
            })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="input-form App">
                        <h1 className='form-title'>Diagnosis Checkup</h1>
                        <Form onSubmit={onSubmit}>

                            <Form.Group>
                                <Form.Label>Body Temperature</Form.Label>
                                <Form.Control type="number" name="body_temperature" id="body_temperature" placeholder="Enter body temperature" value={data.body_temperature} onChange={onChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Heart Rate</Form.Label>
                                <Form.Control type="number" name="heart_rate" id="heart_rate" placeholder="Enter heart rate" value={data.heart_rate} onChange={onChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Systolic</Form.Label>
                                <Form.Control type="number" name="systolic" id="systolic" placeholder="Enter systolic" value={data.systolic} onChange={onChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Diastolic</Form.Label>
                                <Form.Control type="number" name="diastolic" id="diastolic" placeholder="Enter diastolic" value={data.diastolic} onChange={onChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Respiratory Rate</Form.Label>
                                <Form.Control type="number" name="respiratory_rate" id="respiratory_rate" placeholder="Enter respiratory rate" value={data.respiratory_rate} onChange={onChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Pulse Rate</Form.Label>
                                <Form.Control type="number" name="pulse_rate" id="pulse_rate" placeholder="Enter pulse rate" value={data.pulse_rate} onChange={onChange} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>

                        </Form>
                    </div>
                </div>
                <div className="col-md-6 App" style={{ marginLeft: '-20px' }}>
                    <div className="prediction-result">
                        <h1>Prediction</h1>
                        <h4>The species with the highest prediction is: </h4>
                        <h3 className='species-result'>
                            {prediction && prediction.row1 && prediction.row1.length > 0
                                ? `${prediction.row1.indexOf(Math.max(...prediction.row1)) === 0
                                    ? 'You need to see a doctor!'
                                    : 'You are healthy!'
                                }`
                                : 'No prediction yet'
                            }
                        </h3>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkup;
