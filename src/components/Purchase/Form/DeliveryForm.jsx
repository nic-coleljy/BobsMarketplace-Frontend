import React, { useContext, useState } from 'react';
import { Button, Checkbox, Grid, Typography } from '@material-ui/core';

import { FormProvider, useForm } from 'react-hook-form';
import { TextInput } from '../..';
import { UserContext } from '../../../helpers/Contexts';
import useStyles from './styles';

const DeliveryForm = ({ order, setOrder, nextStep, backStep }) => {
    const classes = useStyles();
    const methods = useForm();
    const { currentUser } = useContext(UserContext);
    const [isExpress, setIsExpress] = useState(false);

    const handleApplyExpress = () => {
        setIsExpress(!isExpress);
    };

    const onBack = () => {
        setOrder({
            commodity: order.commodity,
        })
        backStep();
    }

    const onSubmit = (data) => {
        const deliveryCharge = order.quantity * (isExpress ? order.commodity.commodity.expressCharge : order.commodity.commodity.standardCharge);
        const commission = (order.subTotal + deliveryCharge) * 2 / 100;
        setOrder({
            commodity: order.commodity,
            quantity: order.quantity,
            subTotal: order.subTotal,
            comment: order.comment,
            address: data.address,
            zip: data.zip,
            isExpress: isExpress,
            deliveryCharge: deliveryCharge,
            commission: commission,
            total: order.subTotal + deliveryCharge + commission,
        })
        nextStep();
    }

    return (
        <>
            {currentUser && (
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit((data) => onSubmit({ ...data }))}>
                        <TextInput
                            name='address'
                            label='Delivery Address'
                            required
                        />
                        <TextInput
                            name='zip'
                            label='ZIP / Postal Code'
                            required
                        />
                        <br />
                        <br />
                        <div className={classes.checkboxRow}>
                            <Typography
                                variant="subtitle2"
                                color="textPrimary"
                                className={classes.checkboxLabel}
                            >
                                <b>Express delivery</b> (in  1-2 days)
                            </Typography>
                            <Checkbox
                                onChange={handleApplyExpress}
                            />
                        </div>
                        <Typography
                            variant="caption"
                            color="textPrimary"
                            className={classes.checkboxLabel}
                        >
                            [Standard - SGD {order.commodity.commodity.standardCharge}/{order.commodity.uom}, Express - SGD {order.commodity.commodity.expressCharge}/{order.commodity.uom}]
                        </Typography>
                        <br />
                        <br />
                        <br />
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <Button onClick={onBack} variant='outlined'>
                                    Back
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button type="submit" variant='contained' color="primary">
                                    Next
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </FormProvider>
            )}
        </>
    )
};

export default DeliveryForm;