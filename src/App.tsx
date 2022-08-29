import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Home from './components/Home'
import Login from './components/Login'
import ScreenWrapper from './components/ScreenWrapper'
import './App.css';
import useLogin from "./contexts/useLogin";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#334776',
        },
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                input: {
                    "&:-webkit-autofill": {
                        "-webkit-box-shadow": "0 0 0 100px #1c2741 inset",
                        "-webkit-text-fill-color": "#999ab5",
                    },
                }
            }
        }
    }
});

function App() {
    const {userName} = useLogin()
    return (
        <BrowserRouter>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline/>
                <ScreenWrapper>
                    <Routes>
                        <Route path="/"
                               element={userName ? <Home/> : <Navigate replace to="/login"/>}
                        />
                        <Route path="/login" element={<Login/>}/>
                        <Route path="*" element={<Navigate to="/"/>}/>
                    </Routes>
                </ScreenWrapper>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
