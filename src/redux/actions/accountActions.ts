export interface Account {
    name: string,
    surname: string,
    nat: string,
    city: string,
    email: string,
    password: string,
    date: Date,
    phone: string,
    isLogged: boolean,
    image: string,
}

export interface AccountProps {
    account: Account;
}

export interface AccountAction {
    type: ACCOUNT_ACTIONS;
    payload: Account;
}

export enum ACCOUNT_ACTIONS {
    ADD_ACCOUNT = 'ADD_ACCOUNT',
    LOGIN_ACCOUNT = 'LOGIN_ACCOUNT',
    LOGOUT_ACCOUNT = 'LOGOUT_ACCOUNT',
}

export const signUp = (account: Account) => {
    return {
        type: ACCOUNT_ACTIONS.ADD_ACCOUNT,
        payload: account
    };
};

export const login = (account: Account) => {
    return {
        type: ACCOUNT_ACTIONS.LOGIN_ACCOUNT,
        payload: account,
    };
};

export const logout = () => {
    return {
        type: ACCOUNT_ACTIONS.LOGOUT_ACCOUNT,
    };
};