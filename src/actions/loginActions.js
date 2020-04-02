const loginActions = {
    setLoginData: "SET_LOGIN_DATA",
    setValidationErrors: "SET_VALIDATION_ERRORS",
    updateToken: "UPDATE_TOKEN",
    setLoading: "SET_LOADING",
    updateLoginError: "UPDATE_LOGIN_ERROR",
    resetToLogin: "RESET_TO_LOGIN"
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

export default loginActions;