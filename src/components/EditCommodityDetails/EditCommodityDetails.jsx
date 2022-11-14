import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Divider, Grid, Paper, Typography } from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';

import useStyles from './styles';
import { FormProvider, useForm } from 'react-hook-form';
import { fetchCategories, fetchCommodity, handleAddCommodity, handleRemoveCommodity, handleUpdateCommodity } from '../../helpers/BackendAPICalls';
import { UserContext } from '../../helpers/Contexts';
import { TextInput, SelectInput, BackButton, AvatarIcon } from '..';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { Edit } from '@material-ui/icons';

const EditCommodityDetails = () => {
    const classes = useStyles();
    const { id } = useParams();
    const methods = useForm();
    const navigate = useNavigate();
    const { currentUser, isLoading, setIsLoading, errorMessage, setErrorMessage } = useContext(UserContext);
    const [commodity, setCommodity] = useState(null);
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        if (currentUser) {
            setIsLoading(true);
            fetchCategories().then((categories) => {
                setCategories(categories.map((category) => ({
                    id: category.catid,
                    label: category.name,
                })));
            });
        }
    }, [currentUser, setIsLoading]);

    useEffect(() => {
        if (id && categories) {
            if (id === 'add') {
                setCommodity({
                    name: '',
                    pictureUrl: '',
                    categoryEntity: {
                        id: categories[0].id,
                        name: categories[0].label,
                    },
                });
                setIsLoading(false);
            } else {
                fetchCommodity(id).then((response) => {
                    setIsLoading(false);
                    if (response.status === 404) {
                        setErrorMessage(`404 - Commodity ${id} Not Found`);
                    }
                    else {
                        response.json().then((commodity) => {
                            setCommodity(commodity);
                        });
                    }
                });
            }
        }
    }, [id, categories, setIsLoading, setErrorMessage]);

    useEffect(() => {
        if (commodity) {
            setImage(commodity.pictureUrl);
        }
    }, [commodity]);

    const handleChangeCommodityImage = (event) => {
        setImage(event.target.value);
    };

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
        let categoryEntity;
        categories.forEach((category) => {
            if (category.label === data.category) {
                categoryEntity = {
                    catid: category.id,
                }
            }
        })
        const commodityToSend = {
            name: data.name,
            pictureUrl: data.imageUrl,
            categoryEntity: categoryEntity,
            uom: data.uom,
        }
        if (id === 'add') {
            handleAddCommodity(commodityToSend).then((response) => {
                handleResponse(response);
            });
        } else {
            handleUpdateCommodity(id, commodityToSend).then((response) => {
                handleResponse(response);
            });
        }
    }

    const handleDelete = () => {
        setIsLoading(true);
        handleRemoveCommodity(id).then((response) => {
            handleResponse(response);
        });
    }

    return (
        <>
            {!isLoading && !errorMessage && commodity && (
                <Paper className={classes.root} align="center">
                    <BackButton />
                    <br />
                    <br />
                    <AvatarIcon
                        Icon={id === 'add' ? AddCircleOutlineOutlinedIcon : Edit}
                    />
                    <br />
                    <Container>
                        <Typography variant="h5" gutterBottom>
                            {id === 'add' ? 'Add' : 'Edit'} Commodity
                        </Typography>
                        <Divider />
                        <br />
                        <FormProvider {...methods}>
                            <form onSubmit={methods.handleSubmit((data) => handleSubmit({ ...data }))}>
                                <Typography variant="body1" color="textSecondary">
                                    Image:
                                </Typography>
                                <img
                                    className={classes.image}
                                    src={image}
                                    alt={commodity.name}
                                    width="200px"
                                />
                                <br />
                                <TextInput
                                    required
                                    name="imageUrl"
                                    label="Image URL"
                                    value={commodity.pictureUrl}
                                    handleChange={handleChangeCommodityImage}
                                />
                                <TextInput
                                    required
                                    name="name"
                                    label="Name"
                                    value={commodity.name}
                                />
                                <SelectInput
                                    defaultValue={commodity.categoryEntity.name}
                                    values={categories}
                                    name="category"
                                    label="Category"
                                />
                                <TextInput
                                    required
                                    name="uom"
                                    label="Unit Of Measure"
                                    value={commodity.uom}
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

export default EditCommodityDetails;
