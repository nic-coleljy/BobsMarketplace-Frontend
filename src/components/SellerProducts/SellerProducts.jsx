import React, { useContext, useEffect, useState } from 'react';

import { Divider, Paper, Typography, Grid, Button } from '@material-ui/core';

import { UserContext } from '../../helpers/Contexts';

import useStyles from './styles';
import { fetchSellerProducts } from '../../helpers/BackendAPICalls';
import { Items, Product } from '..';
import { useNavigate } from 'react-router-dom';

const SellerProducts = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { currentUser, isLoading, setIsLoading, errorMessage } = useContext(UserContext);
    const [products, setProducts] = useState(null);

    useEffect(() => {
        if (currentUser) {
            setIsLoading(true);
            fetchSellerProducts(currentUser.id).then((products) => {
                setProducts(products);
                setIsLoading(false);
            });
        }
    }, [currentUser, setIsLoading]);

    const handleAdd = () => {
        navigate(`/product/edit/add`);
        window.scrollTo(0, 0);
    }

    return (
        <>
            {!isLoading && !errorMessage && products && (
                <Paper className={classes.root}>
                    <div className={classes.header}>
                        <Typography variant='h3' align='center'>
                            {currentUser.companyName}
                        </Typography>
                        <Button
                            onClick={handleAdd}
                            variant="contained"
                            color="primary"
                        >
                            + Add
                        </Button>
                    </div>
                    <Divider />
                    {products &&
                        <Items
                            items={products}
                            Item={Product}
                        />
                    }
                </Paper>
            )}
        </>
    )
};

export default SellerProducts;
