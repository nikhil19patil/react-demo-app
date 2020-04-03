import React, { useReducer, useEffect } from "react";
import '../css/Main.css'
import { Button, Form, FormGroup, Label, Input, Badge, Spinner, Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as yup from 'yup';
import loginActions from '../actions/loginActions';
import { setLoginData, updateToken, updateLoader, updateLoginError} from '../actions/loginActions';

const initialState = {
    email : 'eve.holt@reqres.in',
    password : 'cityslicka',
    // email: '',
    // password: '',
    emailError: '',
    passwordError: '',
    token: '',
    loginError: '',
    isLoading: false
};

const loginReducer = (state, action) => {
    switch (action.type) {
        case loginActions.setLoginData:
            return { ...state, ...action.payload };
        case loginActions.updateLoader:
            return { ...state, isLoading: action.payload };
        case loginActions.updateToken:
            return { ...state, token: action.payload };
        case loginActions.updateLoginError:
            return { ...state, loginError: action.payload };
        case loginActions.resetToLogin:
            return initialState;
      default:
        return state;
    }
}

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors', 
      cache: 'no-cache', 
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });
    return await response.json();
  }

function CenterDivComponent(props) {

    const [state, dispatch] = useReducer(loginReducer, initialState);

    useEffect(() => {
        console.log('useEffect');
        if(state.isLoading == true) {
            document.title = 'Loading';
        } else if(state.token === '' && state.loginError === '') {
            document.title = `Login`;
        } else if(state.token !== '') {
            document.title = 'Welcome';
        } else if(state.error !== '') {
            document.title = 'Error';
        } 
    }, [state.token, state.loginError, state.isLoading]);

    const onTextChange = e => {
        const { value, name } = e.target;
        let formData = { ...state };
        formData[name] = value;
        dispatch(setLoginData(formData));
    };

    const resetToLogin = e => {
        dispatch({type:loginActions.resetToLogin});
    };

    // yup.setLocale({
    //     String: {
    //       email: 'Email can\'t be empty',
    //       password: 'Password can\'t be empty'
    //     },
    // });

    let validationSchema = yup.object().shape({
        email: yup.string().email().required(), 
        password: yup.string().required(),
    });

    const onSubmit = e => {
        e.preventDefault();
        const postBody = {};
        var formData = new FormData(e.target);
        postBody.email = formData.get('email');
        postBody.password = formData.get('password')
        validationSchema.isValid(postBody).then(isValid => {
            // alert("Is login data valid: " + isValid + 
            // "\nEmail: " + ((state.email == '') ? " required" : state.email) +
            //  "\nPassword: " + ((state.password == '') ? " required" : state.password));
            if(isValid) {
                dispatch(updateLoader(true));
                postData('https://reqres.in/api/login', postBody)
                .then((data) => {
                    dispatch(updateLoader(false));
                    console.log(data);
                    if('error' in data) {
                        dispatch(updateLoginError(data.error));
                    } else {
                        dispatch(updateToken(data.token));
                    }
                });
            } else {

            }
        });
        // validationSchema.validate(state).catch(function(err) {
        //     console.log(err.name);
        //     console.log(err.errors);
        // });
    };

    if(state.isLoading) {
        return (
            <div>
              <Spinner color="light" />
            </div>
        );
    } else if(state.loginError !== '') {
        return (
            <div class="CenterDiv">
              <Container className="themed-container">Error: {state.loginError}</Container><br/>
              <Button onClick={resetToLogin} color="danger">Reset</Button>
            </div>
        );
    } else if(state.token === '') {
        return (
            <div class="CenterDiv">
                <Form onSubmit={onSubmit}>
                    <Label for="myEmail">Email</Label>
                    <FormGroup>
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
                    <Label>{state.token}</Label>
                </Form>
            </div>
        );
    } else {
        return (
            <div class="CenterDiv">
                <Badge color="success">Success</Badge>
                <Container className="themed-container">Token: {state.token}</Container>
            </div>
        );
    }
}

export default CenterDivComponent