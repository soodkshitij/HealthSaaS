import * as actionTypes from './action';

const initialState = {
    logged_in : false,
    user: {}
};

const reducer = ( state = initialState, action ) => {
    console.log("action type ",action);
    console.log("old state ",state);
    switch ( action.type ) {
        case actionTypes.AUTH_ACTIVITY:
            return Object.assign({}, state, {
                logged_in: true,
                user : action.user
            })
        case actionTypes.UNAUTH_ACTIVITY:
            return Object.assign({}, state, {
                logged_in: false,
                user : action.user
            })

    }
    console.log("new state ",state);
    return state;
};

export default reducer;