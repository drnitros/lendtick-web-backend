import { createStore,combineReducers } from 'redux';

export const authReducer = (state = {
    isLogin: false,
    token: null,
    id_role_master: null,
    is_new: null
}, action) =>{
	switch (action.type) {
		case "LOGIN" :
			state = {
				...state,
                isLogin: true,
                token: action.token,
                id_role_master: action.id_role_master,
                is_new: action.is_new
			}
        break;
        case "LOGOUT" :
			state = {
				...state,
                isLogin: false,
                token: null,
                id_role_master: null,
                is_new: null
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