import React, { useContext } from 'react';
import { Button, Container, Divider, Paper, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

import useStyles from './styles';
import { FormProvider, useForm } from 'react-hook-form';
import { TextInput, BackButton, AvatarIcon } from '..';
import { handleAddLicense } from '../../helpers/BackendAPICalls';
import { UserContext } from '../../helpers/Contexts';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

const AddLicense = () => {
    const classes = useStyles();
    const methods = useForm();
    const navigate = useNavigate();
    const { currentUser, isLoading, setIsLoading, errorMessage, setErrorMessage } = useContext(UserContext);

    const handleSubmit = (data) => {
        setIsLoading(true);
        handleAddLicense(currentUser.id, {
            typeOfGood: data.typeOfGood,
            issuedBy: data.issuedBy,
            expiryDate: data.expiryDate,
        }).then((response) => {
            console.log(response);
            setIsLoading(false);
            if (response.status === 201) {
                navigate(-1);
            } else {
                setErrorMessage('An Error Occurred');
            }
        });
    }

    return (
        <>
            {!isLoading && !errorMessage && currentUser && (
                <Paper className={classes.root} align="center">
                    <BackButton />
                    <br />
                    <br />
                    <AvatarIcon
                        Icon={AddCircleOutlineOutlinedIcon}
                    />
                    <br />
                    <Container align="center">
                        <Typography variant="h5" gutterBottom>
                            Add License
                        </Typography>
                        <Divider />
                        <FormProvider {...methods}>
                            <form onSubmit={methods.handleSubmit((data) => handleSubmit({ ...data }))}>
                                <TextInput
                                    required
                                    name="typeOfGood"
                                    label="Type Of Good"
                                />
                                <TextInput
                                    required
                                    name="issuedBy"
                                    label="Issued By"
                                />
                                <TextInput
                                    required
                                    name="expiryDate"
                                    label="Expiry Date"
                                />
                                <br />
                                <br />
                                <Button
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                >
                                    Add
                                </Button>
                            </form>
                        </FormProvider>
                    </Container>
                </Paper >
            )}
        </>
    )
};

export default AddLicense;
