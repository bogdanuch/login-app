import React, {ReactElement, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Container, CssBaseline, Box, Typography, Button, Checkbox, FormControlLabel, TextField} from "@mui/material";

import {validateEmail, validatePassword} from "../../utils/validators";
import mockRequest from "../../utils/mockRequest";
import useLogin from "../../contexts/useLogin";

import styles from "./styles"

function Login(): ReactElement {
    const [LoginError, setLoginError] = useState('')
    const [isRemember, setIsRemember] = useState(false);
    const [isWrongEmail, setIsWrongEmail] = useState(false);
    const [isWrongPassword, setIsWrongPassword] = useState(false);

    const {login} = useLogin()
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email')?.toString() ?? '';
        const password = data.get('password')?.toString() ?? '';

        const emailValidation = validateEmail(email);
        const passwordValidation = validatePassword(password);
        setIsWrongEmail(!emailValidation);
        setIsWrongPassword(!passwordValidation);

        if (!emailValidation) setLoginError('Please input correct email');
        if (!passwordValidation) setLoginError('Please input password');
        if (emailValidation && passwordValidation) {
            try {
                await mockRequest({email, password}, 1);
                login(email, isRemember);
                navigate('/', {replace: true});
            } catch (e) {
                setLoginError('Incorrect login and password combination');
            }
        } else {
            setLoginError('Please input correct email and password');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={styles.screenWrapper}
            >
                <Typography component="h1" variant="h5"> Sign in </Typography>
                <Box
                    component="form"
                    sx={styles.form}
                    onSubmit={(e) => handleSubmit(e)} noValidate
                >
                    <TextField
                        error={isWrongEmail}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        defaultValue=''
                        name="email"
                        onFocus={() => setIsWrongEmail(false)}
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        error={isWrongPassword}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        onFocus={() => setIsWrongPassword(false)}
                        label="Password"
                        defaultValue=''
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox value={isRemember} onClick={() => setIsRemember(!isRemember)} color="primary"/>
                        }
                        label="Remember me"
                    />
                    {LoginError &&
                        <Typography component="h1" variant="subtitle2" sx={styles.errorMessage}>
                            {LoginError}
                        </Typography>
                    }
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={styles.submitButton}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default Login;