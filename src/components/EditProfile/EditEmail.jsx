import React, { useState, useContext, useEffect } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { handleEditAdminEmail, handleEditBuyerEmail, handleEditSellerEmail } from '../../helpers/BackendAPICalls';
import { RoleEnum } from '../../helpers/Role';
import { TextInput } from '..';
import ErrorIcon from '@mui/icons-material/Error';
import useStyles from './styles';
import { UserContext } from '../../helpers/Contexts';

const EditEmail = () => {
    const classes = useStyles();
    const methods = useForm();
    const navigate = useNavigate();
    const { currentUser, isLoading, setIsLoading } = useContext(UserContext);
    const [isServerError, setIsServerError] = useState(false);
    const [isExisted, setIsExisted] = useState(false);
    const [email, setEmail] = useState(null);

    useEffect(() => {
        if (currentUser) {
            setIsLoading(true);
            setEmail(currentUser.email);
            setIsLoading(false);
        }
    }, [currentUser, setIsLoading]);

    const handleBack = () => {
        navigate(-1);
        window.scrollTo(0, 0);
    };

    const handleSubmit = async (data) => {
        setIsLoading(true);
        setIsServerError(false);
        setIsExisted(false);
        let response;
        switch (currentUser.role) {
            case RoleEnum.BUYER:
                response = await handleEditBuyerEmail(currentUser.id, data.email);
                break;
            case RoleEnum.SELLER:
                response = await handleEditSellerEmail(currentUser.id, data.email);
                break;
            case RoleEnum.ADMIN:
                response = await handleEditAdminEmail(currentUser.id, data.email);
                break;
            default:
                break;
        }
        setIsLoading(false);
        if (response.status === 409) {
            setIsExisted(true);
            return;
        } else if (response.status === 500) {
            setIsServerError(true);
            return;
        }
        handleBack();
    };

    return (
        <>
            {!isLoading && email && (
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit((data) => (handleSubmit({ ...data })))}>
                        {isServerError &&
                            <Typography variant="subtitle1" className={classes.error}>
                                <br />
                                <ErrorIcon />
                                <br />
                                <b>Server error, please try again later.</b>
                                <br />
                                <br />
                            </Typography>
                        }
                        <TextInput
                            required
                            name="email"
                            label="Email"
                            value={email}
                            error={isExisted}
                            helperText="Email is already taken."
                        />
                        <br />
                        <br />
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    onClick={handleBack}
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
                                    Confirm
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </FormProvider>
            )}
        </>
    )
};

export default EditEmail;
