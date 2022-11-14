import React, { useContext } from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, Button, Link } from '@material-ui/core';
import { RemoveCircleOutline } from '@material-ui/icons';

import useStyles from './styles';
import { UserContext } from '../../../../helpers/Contexts';
import { handleDeleteProduct } from '../../../../helpers/BackendAPICalls';
import { useNavigate } from 'react-router-dom';

const Product = ({ item }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { currentUser, setIsLoading, setErrorMessage } = useContext(UserContext);

    const handleOnCategoryClicked = () => {
        navigate(`/categories=${item.category}`);
        window.scrollTo(0, 0);
    };

    const handleDelete = () => {
        setIsLoading(true);
        handleDeleteProduct(item.cid).then((response) => {
            setIsLoading(false);
            if (response.status === 200) {
                window.location.reload(false);
            } else {
                setErrorMessage('An Error Occurred');
            }
        });
    }

    return (
        <Card className={classes.root}>
            <CardMedia component={Link} href={`/product/edit/${item.cid}`} className={classes.media} image={item.commodityNameEntity.pictureUrl} title={item.commodityNameEntity.name} />
            <CardContent component={Link} href={`/product/edit/${item.cid}`} className={classes.cardContent}>
                <div className={classes.cardContentPrimary}>
                    <Typography variant="h5" color="textPrimary" gutterBottom>
                        {item.commodityNameEntity.name}
                    </Typography>
                    <Typography variant="h6" color="textPrimary">
                        SGD {item.price}/{item.commodityNameEntity.uom}
                    </Typography>
                </div>
                <Typography variant="caption" color="textSecondary" gutterBottom>
                    <b>Available: </b>{item.quantity}{item.commodityNameEntity.uom}
                </Typography>
                <br />
                <Typography variant="caption" color="textSecondary" gutterBottom>
                    <b>Standard Charge: SGD </b>{item.standardCharge}/{item.commodityNameEntity.uom}
                </Typography>
                <br />
                <Typography variant="caption" color="textSecondary" gutterBottom>
                    <b>Express Charge: SGD </b>{item.expressCharge}/{item.commodityNameEntity.uom}
                </Typography>
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <Button
                    onClick={handleOnCategoryClicked}
                    variant="outlined"
                >
                    {item.commodityNameEntity.categoryEntity.name}
                </Button>
                {/* {currentUser &&
                    <IconButton
                        onClick={handleDelete}
                        color="secondary"
                    >
                        <RemoveCircleOutline />
                    </IconButton>
                } */}
            </CardActions>
        </Card>
    )
};

export default Product;
