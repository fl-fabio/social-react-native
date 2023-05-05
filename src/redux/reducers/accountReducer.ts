import { InitialState } from '@react-navigation/native';
import {
    ACCOUNT_ACTIONS,
    Account,
    AccountAction,
    AccountProps
} from '../actions/accountActions';


const initialState: AccountProps = {
    account: {
        name: '',
        surname: '',
        nat: '',
        city: '',
        phone: '',
        date: new Date(),
        email: '', 
        password: '', 
        image: '',
        isLogged: false}
} 
/* const initialState: AccountProps = {
    account: { email: "", password: "", isLogged: false },
  }; */
const accountReducer = (state= initialState, action: AccountAction) => {
    switch (action.type) {
        case ACCOUNT_ACTIONS.ADD_ACCOUNT:
            return {
                ...state,
                account: action.payload,
            };
        case ACCOUNT_ACTIONS.LOGIN_ACCOUNT:
            if(
                state.account.email === action.payload.email &&
                state.account.password === action.payload.password
            )
            return {
                ...state,
                account: {
                    ...state.account,
                    isLogged: true,
                },
            };
        case ACCOUNT_ACTIONS.LOGOUT_ACCOUNT:
            return {
                ...state,
                account: {
                    ...state.account,
                    isLogged: false
                },
            };
        case ACCOUNT_ACTIONS.REMOVE_ACCOUNT: 
            return {
                ...state,
                account: {}
            }
        default:
            return state;
    }
};

export default accountReducer;