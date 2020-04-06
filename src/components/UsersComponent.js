import React, {useReducer, useEffect} from "react";
import {Table, Spinner, Container, Media, Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Main.css'
import { usersReducer, userState } from '../reducers/UsersReducer';
import fetchUsers from "../utils/fetchUsers"
import {fetchUsersPending, fetchUsersSuccess, fetchUsersError} from '../actions/FetchUsersActions';
import { initialState } from "../reducers/LoginReducer";

function UsersComponent(props) {

    const [state, dispatch] = useReducer(usersReducer, initialState);

    useEffect(() => {
        dispatch(fetchUsersPending());
        fetchUsers('https://reqres.in/api/users?page=1&per_page=12', null)
        .then((res) => {
            if('error' in res) {
                dispatch(fetchUsersError(res.error));
            } else {
                console.log(res);
                dispatch(fetchUsersSuccess(res));
            }
        });
    }, []);

    if(state.isLoading) {
        return (
            <div class="CenterContent">
                <Spinner color="primary" />
            </div>
        );
    } else if(state.userData) {
        const items = [];
        const imgStyle = {
            maxHeight: 60,
            maxWidth: 60
        };         
        state.userData.data.forEach( element => {
            items.push(<tr>
                <th scope="row">{element.id}</th>
                    <td><Media object src={element.avatar} style={imgStyle} /></td>
                    <td>{element.first_name}</td>
                    <td>{element.last_name}</td>
                    <td>{element.email}</td>
                    <td><a href="#">Edit</a></td>
                    <td><a href="#">Delete</a></td>
                </tr>);
        })
        return (
            <div className="UsersContainer">
                <div class="RightAllign">
                    <Button color="primary">Add User</Button>
                </div>
                <Table bordered={true}>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Pic</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th></th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody id="tableBody">
                        {items}
                    </tbody>
                </Table>
            </div>
        );  
    } else if(state.fetchError !== '') {
        return (
            <div class="CenterContent">
                <Container className="themed-container">Error : {state.fetchError}</Container>
            </div>
        );
    }
}

export default UsersComponent;