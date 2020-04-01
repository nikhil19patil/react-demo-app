import React, { useReducer } from "react";
import '../css/Main.css'
import { Button, Form, FormGroup, Label, Input, Badge} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as yup from 'yup';

const initialState = {
    email : '',
    password : ''
};

const loginActions = {
    setLoginData: "SET_LOGIN_DATA"
};

const setLoginData = param => {
    return {
        type: loginActions.setLoginData,
        payload: param
    };
};

const loginReducer = (state, action) => {
    switch (action.type) {
      case loginActions.setLoginData:
        return { ...state, ...action.payload };
      default:
        return state;
    }
}

function CenterDivComponent(props) {

    const [state, dispatch] = useReducer(loginReducer, initialState);

    const onTextChange = e => {
        const { value, name } = e.target;
        let formData = { ...state };
        formData[name] = value;
        dispatch(setLoginData(formData));
    };

    let validationSchema = yup.object().shape({
        email: yup.string().email().required(), 
        password: yup.string().required(),
    });

    const onSubmit = e => {
        e.preventDefault();
        validationSchema.isValid(state).then(isValid => {
            alert("Is login data valid: " + isValid + 
            "\nEmail: " + ((state.email == '') ? " required" : state.email) +
             "\nPassword: " + ((state.password == '') ? " required" : state.password));
        });
    };

    return (
        <div class="CenterDiv">
            <Form onSubmit={onSubmit}>
                <FormGroup>
                    <Label for="myEmail">Email</Label>
                    <Input 
                        class="form-control" 
                        type="email" 
                        name="email" 
                        id="myEmail" 
                        placeholder="Enter your email" 
                        onChange={onTextChange}
                        value={state.email} />
                </FormGroup>
                <FormGroup>
                    <Label for="myPass">Password</Label>
                    <Input 
                        type="password" 
                        name="password" 
                        id="myPass" 
                        placeholder="Enter password" 
                        onChange={onTextChange}
                        value={state.password} /> 
                </FormGroup>
                <FormGroup style={{display: 'flex', justifyContent: 'space-between', alignContent: 'center'}}>
                    <Button color="primary" type="submit">Login</Button>
                    <Badge href="#" color="light">Forgot Password</Badge>
                </FormGroup>
                <Badge href="#" color="light">Not a user? Sign in.</Badge>
            </Form>
        </div>
    );
}

export default CenterDivComponent