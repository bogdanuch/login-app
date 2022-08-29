import React, {ReactElement, useState} from 'react';

type TLoginContext = {
    userName: string,
    login: (user: string, rememberUser: boolean) => void,
    logout: () => void
}

const LoginContext = React.createContext<TLoginContext>({
    userName: '',
    login: (): void => undefined,
    logout: (): void => undefined
});

export const LoginContextApp = ({children}: { children: ReactElement }): ReactElement => {
    const [userName, setUserName] = useState<string>(localStorage.getItem('login') ?? '');

    function login(user:string, rememberUser=false): void {
        setUserName(user);
        if(rememberUser) localStorage.setItem('login', user)
    }

    function logout(): void {
        setUserName('');
        localStorage.removeItem('login');
        window.location.reload();
    }

    return (
        <LoginContext.Provider value={{userName, login, logout}}>
            {children}
        </LoginContext.Provider>
    )

}

export const useLogin = () => React.useContext(LoginContext);

export default useLogin;