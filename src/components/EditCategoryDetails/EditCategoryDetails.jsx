import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Divider, Grid, Paper, Typography } from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';

import useStyles from './styles';
import { FormProvider, useForm } from 'react-hook-form';
import { TextInput, BackButton, AvatarIcon } from '..';
import { fetchCategory, handleAddCategory, handleRemoveCategory, handleUpdateCategory } from '../../helpers/BackendAPICalls';
import { UserContext } from '../../helpers/Contexts';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { Edit } from '@material-ui/icons';

const EditCategoryDetails = () => {
    const classes = useStyles();
    const { id } = useParams();
    const methods = useForm();
    const navigate = useNavigate();
    const { currentUser, isLoading, setIsLoading, errorMessage, setErrorMessage } = useContext(UserContext);
    const [category, setCategory] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        if (currentUser && id) {
            if (id === 'add') {
                setCategory({
                    name: '',
                });
                setIsLoading(false);
            } else {
                fetchCategory(id).then((response) => {
                    setIsLoading(false);
                    if (response.status === 404) {
                        setErrorMessage(`404 - Commodity ${id} Not Found`);
                    }
                    else {
                        response.json().then((category) => {
                            setCategory(category);
                        });
                    }
                });
            }
        }
    }, [currentUser, id, setErrorMessage, setIsLoading]);

    const handleResponse = (response) => {
        setIsLoading(false);
        if (response.status === 201 || response.status === 200) {
            navigate('/');
        } else {
            setErrorMessage('An Error Occurred');
        }
    };

    const handleSubmit = (data) => {
        setIsLoading(true);
        const payload = {
            name: data.name,
        };
        if (id === 'add') {
            handleAddCategory(payload).then((response) => {
                handleResponse(response);
            });
        } else {
            handleUpdateCategory(id, payload).then((response) => {
                handleResponse(response);
            });
        }
    }

    const handleDelete = () => {
        setIsLoading(true);
        handleRemoveCategory(id).then((response) => {
            handleResponse(response);
        });
    }

    return (
        <>
            {!isLoading && !errorMessage && category && (
                <Paper className={classes.root} align="center">
                    <BackButton />
                    <br />
                    <br />
                    <AvatarIcon
                        Icon={id === 'add' ? AddCircleOutlineOutlinedIcon : Edit}
                    />
                    <br />
                    <Container align="center">
                        <Typography variant="h5" gutterBottom>
                            {id === 'add' ? 'Add' : 'Edit'} Category
                        </Typography>
                        <Divider />
                        <FormProvider {...methods}>
                            <form onSubmit={methods.handleSubmit((data) => handleSubmit({ ...data }))}>
                                <TextInput
                                    required
                                    name="name"
                                    label="Name"
                                    value={category.name}
                                />
                                <br />
                                <br />
                                <Grid container justifyContent="space-around">
                                    <Grid item>
                                        <Button
                                            type="submit"
                                            color="primary"
                                            variant="contained"
                                        >
                                            {id === 'add' ? 'Add' : 'Update'}
                                        </Button>
                                    </Grid>
                                    {/* {id !== 'add' &&
                                        <Grid item>
                                            <Button
                                                href="/"
                                                onClick={handleDelete}
                                                variant="outlined"
                                                color="secondary"
                                            >
                                                Delete
                                            </Button>
                                        </Grid>
                                    } */}
                                </Grid>
                            </form>
                        </FormProvider>
                    </Container>
                </Paper >
            )}
        </>
    )
};

export default EditCategoryDetails;
