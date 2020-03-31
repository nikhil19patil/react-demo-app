import React, { Component, useReducer } from "react";
import '../css/Main.css'
import { Button, Form, FormGroup, Label, Input, Badge} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as yup from 'yup';
import { string } from "prop-types";

const initialState = {
    email : '',
    password : ''
};

const loginActions = {
    setLoginData: "SET_LOGIN_DATA"
};

// function loginReducer(state, action) {
//     switch (action.type) {
//       case loginActions.setLoginData:
//         return { ...state, ...action.payload };
//       default:
//         throw new Error();
//     }
// }

// const [state, dispatch] = useReducer(loginReducer, initialState);

let validationSchema = yup.object().shape({
    email: yup.string().email('Email is invalid').required("Email is required"), 
    password: yup.string().required('password is required'),
});

const onSubmit = e => {
    // e.preventDefault();
    // validationSchema.isValid(state).then(isValid => {
    //     console.log("Login data validated: ", isValid);
    // });
};

class CenterDivComponent extends Component {

    render() {
        return (
            <div class="CenterDiv">
                <Form onSubmit={onSubmit}>
                    <FormGroup>
                        <Label for="myEmail">Email</Label>
                        <Input class="form-control" type="email" name="email" id="myEmail" placeholder="Enter your email" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="myPass">Password</Label>
                        <Input type="password" name="password" id="myPass" placeholder="Enter password"/> 
                    </FormGroup>
                    <FormGroup style={{display: 'flex', justifyContent: 'space-between', alignContent: 'center'}}>
                        <Button color="primary" type="submit">Login</Button>{' '}
                        <Badge href="#" color="light">Forgot Password</Badge>
                    </FormGroup>
                    <Badge href="#" color="light">Not a user? Sign in.</Badge>
                </Form>
            </div>
        );
    }
}

export default CenterDivComponent