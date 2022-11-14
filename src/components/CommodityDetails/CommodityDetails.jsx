import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Divider, Grid, Typography, Paper } from '@material-ui/core';
import { ShoppingBasket } from '@material-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { LineChart, XAxis, YAxis, Tooltip, CartesianGrid, Line, ResponsiveContainer } from 'recharts';

import useStyles from './styles';
import { RoleEnum } from '../../helpers/Role';
import { UserContext } from '../../helpers/Contexts';
import { fetchCommodity } from '../../helpers/BackendAPICalls';
import { BackButton } from '..';

const CommodityDetails = () => {
    const classes = useStyles();
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser, isLoading, setIsLoading, errorMessage, setErrorMessage } = useContext(UserContext);
    const [commodity, setCommodity] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        if (currentUser && id) {
            fetchCommodity(id).then((response) => {
                setIsLoading(false);
                if (response.status === 404) {
                    setErrorMessage(`404 - Commodity ${id} Not Found`);
                } else {
                    response.json().then((commodity) => {
                        commodity.pastPrices.forEach((dateTimePrice) => {
                            console.log(dateTimePrice);
                            dateTimePrice.dateTime = dateTimePrice.dateTime.substring(0, 19).replace('T', ', ');
                        })
                        setCommodity(commodity);
                    });
                }
            });
        }
    }, [currentUser, id, setErrorMessage, setIsLoading]);

    const handleOnCategoryClicked = () => {
        navigate(`/search=${commodity.categoryEntity.name}&categories=${commodity.categoryEntity.name}`);
        window.scrollTo(0, 0);
    };

    return (
        <>
            {!isLoading && !errorMessage && commodity &&
                <Paper className={classes.root}>
                    <BackButton />
                    <br />
                    <br />
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <img src={commodity.pictureUrl} alt={commodity.name} width="100%" className={classes.image} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Grid container direction="column" className={classes.info}>
                                <Grid container justifyContent="space-between" direction="row">
                                    <Grid item>
                                        <Button
                                            onClick={handleOnCategoryClicked}
                                            className={classes.category}
                                            variant="outlined"
                                        >
                                            {commodity.categoryEntity.name}
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Divider />
                                <Box mt="2">
                                    <div className={classes.infoPrimary}>
                                        <Typography variant="h5">
                                            {commodity.name}
                                        </Typography>
                                        <Typography variant="h6">
                                            SGD {commodity.commodity.price}/{commodity.uom}
                                        </Typography>
                                    </div>
                                    <ResponsiveContainer width="90%" height={232}>
                                        <LineChart data={commodity.pastPrices}>
                                            <XAxis dataKey="dateTime" />
                                            <YAxis dataKey="price" />
                                            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                                            <Line type="monotone" dataKey="price" stroke="#8884d8" name="Price[SGD]" unit={"/" + commodity.uom} />
                                            <Tooltip />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </Box>
                                {(currentUser && currentUser.role === RoleEnum.BUYER && commodity.commodity) && (
                                    <Button
                                        aria-label="Purchase"
                                        href={`/purchase/${commodity.cnid}`} variant="contained"
                                        color="primary"
                                        className={classes.purchase}
                                    >
                                        Purchase
                                        <ShoppingBasket className={classes.purchaseIcon} />
                                    </Button>
                                )}
                            </Grid>
                        </Grid>
                    </Grid >
                </Paper>
            }
        </>
    )
};

export default CommodityDetails;
