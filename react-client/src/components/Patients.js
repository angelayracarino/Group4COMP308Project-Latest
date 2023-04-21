import React, { useEffect } from 'react';
import { gql, useQuery, useMutation } from "@apollo/client";
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

const GET_USERS = gql`
    query GetPatients {
        patients {
            _id
            firstName
            lastName
            email
            password
            address
            city
            province
            postalCode
            phone
            role
        }
    }
`;

const DELETE_USERS = gql`
    mutation DeleteUsers($id: String!) {
        deleteUser(id: $id) {
            _id
        }
    }
`;

function UserList() {
    const { loading, error, data, refetch } = useQuery(GET_USERS);
    const [deleteUsers] = useMutation(DELETE_USERS, {
        onCompleted: () => refetch()
    });

    useEffect(() => {
        refetch();
    }, [refetch]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            deleteUsers({ variables: { id } });
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) {
        console.error(error);
        return <p>Error : ${error.message}(</p>;
    }

    return (
        <Container>
            <div className="userList">
                <h1>Users</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.patients.map((user) => (
                            <tr key={user._id}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>
                                <Link to={{
                                        pathname: `/vitals/${user.firstName}/${user.lastName}`,
                                        state: {
                                            fullName: user.firstName + '' +  user.lastName
                                        }
                                    }}>
                                        <Button variant="contained" color="primary" >Vitals</Button>
                                    </Link>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
}

export default UserList;
