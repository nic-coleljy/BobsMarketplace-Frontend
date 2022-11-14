import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Divider, Grid, Paper, Typography } from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';

import useStyles from './styles';
import { FormProvider, useForm } from 'react-hook-form';
import { fetchCommodities, fetchProduct, handleAddProduct, handleDeleteProduct, handleUpdateProduct } from '../../helpers/BackendAPICalls';
import { UserContext } from '../../helpers/Contexts';
import { TextInput, SelectInput, BackButton, AvatarIcon } from '..';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { Edit } from '@material-ui/icons';

const EditProductDetails = () => {
    const classes = useStyles();
    const { id } = useParams();
    const methods = useForm();
    const navigate = useNavigate();
    const { currentUser, isLoading, setIsLoading, errorMessage, setErrorMessage } = useContext(UserContext);
    const [product, setProduct] = useState(null);
    const [commodities, setCommodities] = useState(null);
    const [commodityOptions, setCommodityOptions] = useState(null);

    useEffect(() => {
        if (currentUser) {
            setIsLoading(true);
            fetchCommodities().then((commodities) => {
                setCommodities(commodities);
                setCommodityOptions(commodities.map((commodity) => ({
                    id: commodity.cnid,
                    label: `${commodity.name} - ${commodity.uom}`,
                })));
            });
        }
    }, [currentUser, setIsLoading]);

    useEffect(() => {
        if (id && commodities && commodityOptions) {
            if (id === 'add') {
                setProduct({
                    commodityNameEntity: {
                        label: commodityOptions[0].label,
                    },
                    price: 0,
                    quantity: 1,
                    standardCharge: 0,
                    expressCharge: 0,
                });
                setIsLoading(false);
            } else {
                fetchProduct(id).then((response) => {
                    setIsLoading(false);
                    if (response.status === 404) {
                        setErrorMessage(`404 - Commodity ${id} Not Found`);
                    }
                    else {
                        response.json().then((product) => {
                            setProduct(product);
                        });
                    }
                });
            }
        }
    }, [id, commodities, commodityOptions, setIsLoading, setErrorMessage]);

    const handleResponse = (response) => {
        setIsLoading(false);
        if (response.status === 201 || response.status === 200) {
            navigate('/product');
        } else {
            setErrorMessage('An Error Occurred');
        }
    };

    const handleSubmit = (data) => {
        setIsLoading(true);
        let commodityNameEntity;
        commodities.forEach((commodity) => {
            if (`${commodity.name} - ${commodity.uom}` === data.commodity) {
                commodityNameEntity = {
                    cnid: commodity.cnid,
                };
            }
        });
        const payload = {
            commodityNameEntity: commodityNameEntity,
            price: data.price,
            quantity: data.quantity,
            standardCharge: data.standardCharge,
            expressCharge: data.expressCharge,
            sellerEntity: {
                id: currentUser.id,
            }
        }
        if (id === 'add') {
            handleAddProduct(payload).then((response) => {
                handleResponse(response);
            });
        } else {
            handleUpdateProduct(id, payload).then((response) => {
                handleResponse(response);
            });
        }
    }

    const handleDelete = () => {
        setIsLoading(true);
        handleDeleteProduct(id).then((response) => {
            handleResponse(response);
        });
    }

    return (
        <>
            {!isLoading && !errorMessage && product && (
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
                            {id === 'add' ? 'Add' : 'Edit'} Product
                        </Typography>
                        <Divider />
                        <br />
                        <FormProvider {...methods}>
                            <form onSubmit={methods.handleSubmit((data) => handleSubmit({ ...data }))}>
                                <SelectInput
                                    defaultValue={product.commodityNameEntity.label ? product.commodityNameEntity.label : `${product.commodityNameEntity.name} - ${product.commodityNameEntity.uom}`}
                                    values={commodityOptions}
                                    name="commodity"
                                    label="Commodity"
                                />
                                <TextInput
                                    required
                                    name="price"
                                    label="Price"
                                    value={product.price}
                                    type="number"
                                    InputProps={{ inputProps: { min: 0, step: "0.01" } }}
                                />
                                <TextInput
                                    required
                                    name="quantity"
                                    label="Quantity"
                                    value={product.quantity}
                                    type="number"
                                    InputProps={{ inputProps: { min: 1 } }}
                                />
                                <TextInput
                                    required
                                    name="standardCharge"
                                    label="Standard Charge (SGD per unit)"
                                    value={product.standardCharge}
                                    type="number"
                                    InputProps={{ inputProps: { min: 0 } }}
                                />
                                <TextInput
                                    required
                                    name="expressCharge"
                                    label="Express Charge (SGD per unit)"
                                    value={product.expressCharge}
                                    type="number"
                                    InputProps={{ inputProps: { min: 0 } }}
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

export default EditProductDetails;
