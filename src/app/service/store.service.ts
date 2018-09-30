import { createStore,combineReducers } from 'redux';

export const authReducer = (state = {
    isLogin: false,
    token: ''
}, action) =>{
	switch (action.type) {
		case "LOGIN" :
			state = {
				...state,
                isLogin: true,
                token: action.token
			}
        break;
        case "LOGOUT" :
			state = {
				...state,
                isLogin: false,
                token: ''
			}
		break;
    }
    return state;
}


const reducers = combineReducers({
	auth: authReducer,
});
const store = createStore(reducers);
export { store };