const loginActions = {
    setLoginData: "SET_LOGIN_DATA",
    updateToken: "UPDATE_TOKEN",
    setLoading: "SET_LOADING",
    updateLoginError: "UPDATE_LOGIN_ERROR",
    resetToLogin: "RESET_TO_LOGIN",
    updateEmailErrors: "UPDATE_EMAIL_ERROR",
    updatePasswordErrors: "UPDATE_PASS_ERROR"
};

export const setLoginData = param => {
    return {
        type: loginActions.setLoginData,
        payload: param
    };
};

export const updateToken = token => {
    return {
        type: loginActions.updateToken,
        payload: token
    };
};

export const updateLoader = isLoading => {
    return {
        type: loginActions.updateLoader,
        payload: isLoading
    };
};

export const updateLoginError = error => {
    return {
        type: loginActions.updateLoginError,
        payload: error
    };
};

export const updateEmailError = param => {
    return {
        type: loginActions.updateEmailErrors,
        payload: param
    };
};

export const updatePasswordError = param => {
    return {
        type: loginActions.updatePasswordErrors,
        payload: param
    };
};

export default loginActions;