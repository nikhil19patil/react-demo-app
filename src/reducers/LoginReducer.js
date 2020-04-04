import loginActions from '../actions/loginActions'

export const initialState = {
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
        case loginActions.updateEmailErrors:
            return { ...state, emailError: action.payload };
        case loginActions.updatePasswordErrors:
            return { ...state, passwordError: action.payload };
      default:
        return state;
    }
}

export default loginReducer;