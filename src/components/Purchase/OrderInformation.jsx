import { Box, Divider, Typography } from '@material-ui/core'
import React from 'react';
import { DataField } from '..';
import useStyles from './styles';

const OrderInformation = ({ order, activeStep }) => {
    const classes = useStyles();

    return (
        <>
            {order &&
                <Box>
                    <Typography variant="h6" gutterBottom>
                        Order Information:
                    </Typography>
                    {order.commodity != null &&
                        <>
                            <img
                                className={classes.image}
                                src={order.commodity.pictureUrl}
                                alt={order.commodity.name}
                                width="200px"
                            />
                            <br />
                            <DataField
                                label="Name"
                                data={order.commodity.name}
                            />
                            <DataField
                                label="Price"
                                data={"SGD " + (order.commodity.commodity.price).toFixed(2) + "/" + order.commodity.uom}
                            />
                        </>
                    }
                    {activeStep > 0 &&
                        <>
                            <DataField
                                label="Sub-Total"
                                data={"SGD " + order.subTotal.toFixed(2) + " (" + order.quantity + " " + order.commodity.uom + ")"}
                            />
                            <DataField
                                label="Comment"
                                data={order.comment}
                            />
                        </>
                    }
                    {activeStep > 1 &&
                        <>
                            <DataField
                                label="Delivery Address"
                                data={order.address}
                            />
                            <DataField
                                label="ZIP / Postal Code"
                                data={order.zip}
                            />
                            <DataField
                                label="Delivery Charge"
                                data={"SGD " + order.deliveryCharge.toFixed(2) + (order.isExpress ? " (Express)" : " (Standard)")}
                            />
                            <DataField
                                label="Commission (2%)"
                            data={"SGD " + order.commission.toFixed(2) }
                            />
                            <DataField
                                label="Total"
                                data={"SGD " + order.total.toFixed(2)}
                            />
                        </>
                    }
                    <br />
                    <Divider />
                </Box>
            }
        </>
    )
}

export default OrderInformation