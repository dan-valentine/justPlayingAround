import axios from 'axios';
const initialState = {
    user : {}
};

// Actions
const GET_USER_INFO = 'GET_USER_INFO';

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_INFO+'_FULFILLED': 
            return Object.assign({}, {user : action.payload});
        default: return state;
    }
};

// Action Creators
export function getUserInfo() {
    const userInfo = axios.get('/auth/me').then(res=>res.data)

    return{
        type: GET_USER_INFO,
        payload: userInfo
    }
};
