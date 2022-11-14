import React, { useState, useContext, useEffect } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { handleEditAdminBusinessProfileUrl, handleEditBuyerBusinessProfileUrl, handleEditSellerBusinessProfileUrl } from '../../helpers/BackendAPICalls';
import { RoleEnum } from '../../helpers/Role';
import { TextInput } from '..';
import ErrorIcon from '@mui/icons-material/Error';
import useStyles from './styles';
import { UserContext } from '../../helpers/Contexts';

const EditBusinessProfileUrl = () => {
    const classes = useStyles();
    const methods = useForm();
    const navigate = useNavigate();
    const { currentUser, isLoading, setIsLoading } = useContext(UserContext);
    const [isServerError, setIsServerError] = useState(false);
    const [isExisted, setIsExisted] = useState(false);
    const [businessProfileUrl, setBusinessProfileUrl] = useState(null);

    useEffect(() => {
        if (currentUser) {
            setIsLoading(true);
            setBusinessProfileUrl(currentUser.businessProfileUrl);
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
                response = await handleEditBuyerBusinessProfileUrl(currentUser.id, data.name);
                break;
            case RoleEnum.SELLER:
                response = await handleEditSellerBusinessProfileUrl(currentUser.id, data.name);
                break;
            case RoleEnum.ADMIN:
                response = await handleEditAdminBusinessProfileUrl(currentUser.id, data.name);
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
            {!isLoading && businessProfileUrl && (
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
                        {businessProfileUrl &&
                            <TextInput
                                required
                                name="businessProfileUrl"
                                label="Business Profile URL"
                                value={businessProfileUrl}
                                error={isExisted}
                                helperText="Business Profile URL is already taken."
                            />
                        }
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

export default EditBusinessProfileUrl;
