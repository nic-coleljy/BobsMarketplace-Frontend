import { Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { handleRegister } from '../../helpers/BackendAPICalls';
import { RoleEnum } from '../../helpers/Role';
import { CheckboxInput, TextInput, ModalBox } from '..';
import ErrorIcon from '@mui/icons-material/Error';
import { CheckCircle } from '@mui/icons-material';

const RegisterForm = ({ roleSelected, setRoleSelected }) => {
    const methods = useForm();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordMatched, setIsPasswordMatched] = useState(true);
    const [isServerError, setIsServerError] = useState(false);
    const [isFieldCollided, setIsFieldCollided] = useState(false);
    const [isBusinessProfileExisted, setIsBusinessProfileExisted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleToLogin = () => {
        navigate("/login");
        window.scrollTo(0, 0);
    }

    const handleSubmit = (data) => {
        setIsLoading(true);
        setIsServerError(false);
        setIsFieldCollided(false);
        setIsBusinessProfileExisted(false);
        if (data.password !== data.confirmPassword) {
            setIsPasswordMatched(false);
            setIsLoading(false);
            return;
        }
        setIsPasswordMatched(true);
        const register = {
            email: data.email,
            password: data.password,
            companyName: data.companyName,
            role: roleSelected,
        };
        if (roleSelected === RoleEnum.BUYER) {
            register.businessProfileUrl = data.businessProfileUrl;
        }
        handleRegister(register).then((response) => {
            setIsLoading(false);
            if (response.status === 409) {
                setIsFieldCollided(true);
                return;
            } else if (response.status === 500) {
                setIsServerError(true);
                return;
            } else if (response.status === 404) {
                setIsBusinessProfileExisted(true);
                return;
            }
            setIsModalOpen(true);
        });
    };

    return (
        <>
            {isLoading ?
                <CircularProgress />
                :
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit((data) => (handleSubmit({ ...data })))}>
                        <Typography variant="caption">
                            Please fill this form to create a
                            <Typography variant="caption" color="primary">
                                {" " + roleSelected + " "}
                            </Typography>
                            account:
                        </Typography>
                        <br />
                        {isServerError &&
                            <Typography variant="subtitle1" color="error">
                                <br />
                                <ErrorIcon />
                                <br />
                                <b>Server error, please try again later.</b>
                                <br />
                                <br />
                            </Typography>
                        }
                        {isFieldCollided &&
                            <Typography variant="subtitle1" color="error" >
                                <br />
                                <ErrorIcon />
                                <br />
                                <b>Email/Name already existed, please try other.</b>
                                <br />
                                <br />
                            </Typography>
                        }
                        <TextInput
                            required
                            name="email"
                            label="Email"
                        />
                        <TextInput
                            required
                            name="password"
                            label="Password"
                            type="password"
                        />
                        <TextInput
                            required
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            error={!isPasswordMatched}
                            helperText="Please make sure your passwords match."
                        />
                        <TextInput
                            required
                            name="companyName"
                            label="Name"
                        />
                        {roleSelected === RoleEnum.BUYER &&
                            <TextInput
                                required
                                name="businessProfileUrl"
                                label="Business Profile URL: "
                                error={isBusinessProfileExisted}
                                helperText="Please make sure your URL is exists."
                            />
                        }
                        <CheckboxInput
                            required
                            name="termsAndConditions"
                            label="I accept the terms and conditions."
                        />
                        <br />
                        <br />
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    onClick={() => setRoleSelected(null)}
                                >
                                    Back
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    type='submit'
                                    color='primary'
                                    variant="contained"
                                >
                                    Sign up
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </FormProvider>
            }
            <ModalBox
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                noClose
                title="Success"
                Content={() => {
                    return (
                        <>
                            <br />
                            <CheckCircle color="success"/>
                            <Typography variant="body2">
                                Registered successful!
                            </Typography>
                        </>
                    )
                }}
                Buttons={() => {
                    return (
                        <>
                            {isLoading ?
                                <CircularProgress />
                                :
                                <Grid container justifyContent="space-around">
                                    <Grid item>
                                        <Button
                                            color='primary'
                                            variant="contained"
                                            onClick={handleToLogin}
                                        >
                                            To Login
                                        </Button>
                                    </Grid>
                                </Grid>
                            }
                        </>
                    )
                }}
            />
        </>
    )
}

export default RegisterForm