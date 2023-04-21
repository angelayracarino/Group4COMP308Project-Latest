import React, { useEffect } from 'react';
import { gql, useQuery } from "@apollo/client";
//import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
//import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import "../App.css";
//
//
// To parse the GraphQL operations, we use a special function
// called a tagged template literal to allow us to express them
// as JavaScript strings. This function is named gql
//
// note the backquotes here
const GET_USER= gql`
  query GetUser {
    user {
        _id
        firstName
        lastName
    }
  }
`;
//
const User = () => {

    const { loading, error, data, refetch } = useQuery(GET_USER);

    useEffect(() => {
        refetch();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div className='App container'>
            <Table>
                <thead>
                    <tr>
                        <th>Patient ID</th>
                        <th>Email</th>
                        <th>Password</th>
                    </tr>
                </thead>
                <tbody>
                    {data.user.map((patient, index) => (
                        <tr key={index}>
                            <td>{patient.studentNumber}</td>
                            <td>{patient.firstName} {patient.lastName}</td>
                            <td>{patient.email}</td>
                            <td>{patient.program}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </div>
    );
}

export default User

