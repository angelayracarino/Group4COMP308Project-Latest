import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import "../App.css";
import fit1 from "../images/fitness.png";

// Exercise data with name and duration
const exercisesData = [{ name: 'Push-ups', duration: 10, gifUrl: 'https://media.giphy.com/media/g37mGHexrv5ug/giphy.gif' },
{ name: 'Jumping jacks', duration: 10, gifUrl: 'https://media.giphy.com/media/L6pR869dhwG6Q/giphy.gif' }, 
{ name: 'Plank', duration: 10, gifUrl: 'https://media.giphy.com/media/qmtZWoxt5jYvEi9ovV/giphy.gif' }, 
{ name: 'Squats', duration: 10, gifUrl: 'https://media.giphy.com/media/xUOwFYXGggEpEp0vvO/giphy.gif' }, 
{ name: 'Burpees', duration: 10, gifUrl: 'https://media.giphy.com/media/l41YgS3UPP5Qjwr8Q/giphy.gif' },];

const messages = [
    "Push yourself, because no one else is going to do it for you.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "Don't watch the clock; do what it does. Keep going.",
    "You don't have to be great to start, but you have to start to be great.",
    "The only way to do great work is to love what you do.",
    "The best way to predict the future is to create it.",
    "You miss 100% of the shots you don't take.",
    "The harder the battle, the sweeter the victory.",
    "Don't stop when you're tired. Stop when you're done.", "You got this!",
    "Keep pushing yourself!",
    "Stay focused!",
    "One step at a time!",
    "Never give up!",
    "Believe in yourself!",
    "You can do it!",
    "Stay motivated!",
    "Push harder!",
    "Make it happen!"
];

const FitnessGame = () => {
    const [exerciseIndex, setExerciseIndex] = useState(0); // Index of current exercise
    const [timeRemaining, setTimeRemaining] = useState(0); // Time remaining for current exercise
    const [gameOver, setGameOver] = useState(false); // Game over state
    const [startGame, setStartGame] = useState(false); // Start game state
    const [isPaused, setIsPaused] = useState(false); // Pause game state
    const [exerciseCounter, setExerciseCounter] = useState(0); // Exercise counter state
    const [message, setMessage] = useState("");

    const [currentMessage, setCurrentMessage] = useState("");

    useEffect(() => {
        let countdownTimer;

        if (startGame && exerciseIndex < exercisesData.length && !gameOver && !isPaused) {
            countdownTimer = setInterval(() => {
                setTimeRemaining((prevTime) => prevTime - 1);
            }, 1000);
        }

        if (timeRemaining === 0 && !gameOver) {
            clearInterval(countdownTimer);
            setExerciseCounter((prevCounter) => prevCounter + 1);
            setExerciseIndex((prevIndex) => prevIndex + 1);
            setTimeRemaining(exercisesData[exerciseIndex + 1]?.duration || 0);
        }

        if (exerciseIndex === exercisesData.length) {
            setGameOver(true);
        }

        return () => {
            clearInterval(countdownTimer);
        };
    }, [startGame, exerciseIndex, timeRemaining, gameOver, isPaused]);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * messages.length);
            setMessage(messages[randomIndex]);
        }, 10000);

        return () => {
            clearInterval(interval);
        };
    }, []);


    const handleStartGame = () => {
        setStartGame(true);
        setTimeRemaining(exercisesData[0]?.duration || 0);
    };

    const handleStopGame = () => {
        setIsPaused(true);
    };

    const handleResumeGame = () => {
        setIsPaused(false);
    };

    const handleRestartGame = () => {
        setStartGame(false);
        setGameOver(false);
        setExerciseIndex(0);
        setTimeRemaining(0);
        setIsPaused(false);
        setExerciseCounter(0);
    };

    return (
        <div className="game-container">
           

        <div>
            <div>
          <img src={fit1} alt="Welcome Banner" className="fit1" />

        </div>
            <div className="game-container">
                {!startGame && !gameOver && (
                    <Button className="start-button" variant="success" size="lg" onClick={handleStartGame}>
                        Start Game
                    </Button>
                )}
                {startGame && !gameOver && !isPaused && (
                    <div className="game">
                        <h2 className="game-title">{message}</h2>
                        <h2 className="exercise-name">
                            Exercise: {exercisesData[exerciseIndex]?.name}
                        </h2>
                        <h3 className="time-remaining">
                            Time Remaining: {timeRemaining} seconds
                        </h3>
                        {/* <h3 className="exercise-counter">
                            Exercise Counter: {exerciseCounter} / {exercisesData.length}
                        </h3> */}
                        <Button className="stop-button" variant="danger" size="lg" onClick={handleStopGame}>
                            Stop
                        </Button>
                        <img src={exercisesData[exerciseIndex]?.gifUrl} alt="exercise" />
                    </div>
                )}
                {startGame && !gameOver && isPaused && (
                    <div className="game">
                        <h2 className="game-title">{message}</h2>
                        <h2 className="exercise-name">
                            Exercise: {exercisesData[exerciseIndex]?.name}
                        </h2>
                        <h3 className="time-remaining">
                            Time Remaining: {timeRemaining} seconds (Paused)
                        </h3>
                        {/* <h3 className="exercise-counter">
                            Exercise Counter: {exerciseCounter} / {exercisesData.length}
                        </h3> */}
                        <Button className="resume-button" variant="warning" size="lg" onClick={handleResumeGame}>
                            Resume
                        </Button>
                        <Button className="restart-button" variant="primary" size="lg" onClick={handleRestartGame}>
                            Restart Game
                        </Button>
                        <img src={exercisesData[exerciseIndex]?.gifUrl} alt="exercise" />
                    </div>
                )}
                {gameOver && (
                    <div className="game">
                        <h2 className="congratulations">
                            Congratulations! You've completed the fitness game!
                        </h2>
                        <h3 className="total-exercises">
                            Total Exercises Completed: All {exercisesData.length} exercises!
                        </h3>
                        <Button className="restart-button" variant="primary" size="lg" onClick={handleRestartGame}>
                            Restart Game
                        </Button>
                    </div>
                )}
            </div>
        </div>
    </div>
    );
};

export default FitnessGame;
