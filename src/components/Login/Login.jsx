import React, { useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Button, CircularProgress, Divider, Link, Paper, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { TextInput, AvatarIcon } from '..';

import { handleLogin } from '../../helpers/BackendAPICalls';
import { UserContext } from '../../helpers/Contexts';

import useStyles from './styles';

const Login = () => {
    const classes = useStyles();
    const methods = useForm();
    const { setCurrentUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailExisted, setIsEmailExisted] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isAccountLocked, setIsAccountLocked] = useState(false);

    const handleSubmit = async (data) => {
        setIsLoading(true);
        setIsEmailExisted(true);
        setIsPasswordValid(true);
        setIsAccountLocked(false);
        const login = {
            email: data.email,
            password: data.password
        }
        handleLogin(login).then((response) => {
            if (response.status === 404) {
                setIsEmailExisted(false);
            } else if (response.status === 401) {
                setIsPasswordValid(false);
            } else if (response.status === 403) {
                setIsAccountLocked(true);
            } else {
                response.json().then((buyer) => {
                    setCurrentUser(buyer);
                });
            }
            setIsLoading(false);
        })
    }

    return (
        <Paper className={classes.root} align="center">
            <AvatarIcon
                Icon={LockOutlinedIcon}
            />
            <br />
            <Typography variant="h5">
                <b>Sign in</b>
            </Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => handleSubmit({ ...data }))}>
                    {isAccountLocked &&
                        <Typography
                            variant="subtitle1"
                            color="error"
                        >
                            <b>Account Locked/Deleted</b>
                        </Typography>
                    }
                    <TextInput
                        required
                        name="email"
                        label="Email"
                        error={!isEmailExisted}
                        helperText="Email does not exist."
                    />
                    <TextInput
                        required
                        name="password"
                        label="Password"
                        type="password"
                        error={!isPasswordValid}
                        helperText="Invalid Password."
                    />
                    {isLoading ?
                        <CircularProgress />
                        :
                        <Button
                            fullWidth
                            type="submit"
                            color="primary"
                            variant="contained"
                            className={classes.button}
                        >
                            Sign in
                        </Button>
                    }
                </form>
            </FormProvider>
            {/* <Typography>
                <Link href="#">
                    Forgot password ?
                </Link>
            </Typography> */}
            <br />
            <br />
            <Divider />
            <Typography >
                <br />
                Do you have an account?
                <br />
                <Link href="/register">
                    Create an account
                </Link>
            </Typography>
        </Paper>
    )
};

export default Login;
