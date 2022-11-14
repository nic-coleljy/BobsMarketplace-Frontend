import React, { useState } from 'react';
import { Button, Grid } from '@material-ui/core';

import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TextInput, TextAreaInput } from '../../';

const QuantityForm = ({ order, setOrder, nextStep }) => {
    const navigate = useNavigate();
    const methods = useForm();
    const [quantityError, setQuantityError] = useState(false);

    const handleQuantityChange = (e) => {
        setQuantityError(e.target.value < 1 || e.target.value > order.commodity.limit);
    }

    const onSubmit = (data) => {
        setOrder({
            commodity: order.commodity,
            quantity: data.quantity,
            subTotal: data.quantity * order.commodity.commodity.price,
            comment: data.comment,
        })
        nextStep();
    }

    return (
        <>
            {order && order.commodity &&
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit((data) => onSubmit({ ...data }))}>
                        <TextInput
                            required
                            name="quantity"
                            label={"Quantity(" + order.commodity.commodity.quantity + ")"}
                            type="number"
                            value={1}
                            error={quantityError}
                            helperText="Invalid quantity"
                            InputProps={{ inputProps: { min: 1, max: order.commodity.commodity.quantity } }}
                            handleChange={handleQuantityChange}
                        />
                        <TextAreaInput
                            name="comment"
                            label="Comment"
                            placeholder="Enter more information here..."
                            multiline
                            rows={3}
                            maxRows={Infinity}
                        />
                        <br />
                        <br />
                        <br />
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <Button onClick={() => navigate(-1)} variant='outlined'>
                                    Cancel
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
            }
        </>
    )
};

export default QuantityForm;