// Home.js
import React from 'react';
import "../App.css"
import { Container, Row, Col } from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { faSyringe, faHouseChimneyMedical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import car1 from "../images/car1.png";
import car2 from "../images/car2.png";




function Home(props) {
    return (
        <div>
            <header className="jumbotron">
                <Container>
                    <Row className="justify-content-center align-items-center">
                        <Col className="text-center">
                        <Carousel interval={3000}>
                                <Carousel.Item>
                                    <img src={car1} className="carousel1" />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img src={car2} className="carousel2" />
                                </Carousel.Item>

                            </Carousel>
                            <br></br>
                            <br></br>
                            <p className='p-header'>Allows for early detection and prevention of potential health problems, better management of chronic conditions</p>
                            <p className='p-header'>Improved overall health, and better communication with healthcare providers. </p>
                            <p className='p-header'>It helps individuals maintain good health and prevent more serious health issues from developing.</p>


                        </Col>
                    </Row>
                </Container>
            </header>

        </div>
    );
}

export default Home;