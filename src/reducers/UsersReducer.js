import {FETCH_USERS_PENDING, FETCH_USERS_SUCCESS, FETCH_USERS_ERROR} from '../actions/FetchUsersActions';

export const initialState = {
    userData: {},
    fetchError: '',
    isLoading: false
};

export function usersReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_USERS_PENDING: 
            return {
                ...state,
                isLoading: true,
                fetchError: '',
                userData: {}
            }
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                fetchError: '',
                userData: action.payload
            }
        case FETCH_USERS_ERROR:
            return {
                ...state,
                isLoading: false,
                fetchError: action.payload,
                userData: {}
            }
        default: 
            return state;
    }
}