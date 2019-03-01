import { createStore,combineReducers } from 'redux';
declare var window: any;

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

export const memberReducer = (state = {
    jmlCalongAnggota: 0,
}, action) =>{
	switch (action.type) {
		case "COUNTER" :
			state = {
				...state,
                jmlCalongAnggota: action.jmlCalongAnggota
			}
        break;
    }
    return state;
}

const reducers = combineReducers({
    auth: authReducer,
    member: memberReducer
});
const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export { store };