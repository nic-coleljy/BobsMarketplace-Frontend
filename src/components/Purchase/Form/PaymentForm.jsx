import React, { useContext, useEffect, useState } from 'react';
import { Typography, Button, Slider, Grid, CircularProgress } from '@material-ui/core';

import { CardElement, Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { UserContext } from '../../../helpers/Contexts';
import { fetchAvailableLoanAmount, handlePurchase } from '../../../helpers/BackendAPICalls';
import { ModalBox } from '../..';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ order, setOrder, setTransaction, nextStep, backStep }) => {
    const { currentUser, setErrorMessage } = useContext(UserContext);
    const [availableLoanAmount, setAvailableLoanAmount] = useState(null);
    const [loanAmount, setLoanAmount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [elements, setElements] = useState(null);
    const [stripe, setStripe] = useState(null);

    useEffect(() => {
        if (currentUser && order && order.total) {
            fetchAvailableLoanAmount(currentUser.id, order.total).then((response) => {
                if (response.status === 200) {
                    response.json().then((availableLoanAmount) => {
                        setAvailableLoanAmount(availableLoanAmount);
                    });
                } else {
                    setErrorMessage('An Error Occurred');
                }
            });
        }
    }, [currentUser, order, setErrorMessage]);

    const onBack = () => {
        setOrder({
            commodity: order.commodity,
            quantity: order.quantity,
            subTotal: order.subTotal,
            comment: order.comment,
        })
        backStep();
    }

    const onPay = (e, elements, stripe) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        setIsModalOpen(true);
        setElements(elements);
        setStripe(stripe);
        console.log(stripe);
    };

    const onConfirmPay = () => {
        setIsLoading(true);
        // if (!stripe || !elements) {
        //     return;
        // }
        // const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: elements.getElement(CardElement) });
        // if (error) {
        //     setErrorMessage(error.message);
        // } else {
        const payload = {
            buyerEntity: {
                id: currentUser.id,
            },
            commodityEntity: order.commodity.commodity,
            minPrice: order.commodity.commodity.price,
            quantity: order.quantity,
            subTotal: order.subTotal,
            comment: order.comment,
            address: order.address,
            zip: order.zip,
            isExpress: order.isExpress,
            deliveryCharge: order.deliveryCharge,
            commission: order.commission,
            totalCost: order.total,
            financing: loanAmount,
            status: 'Transacting',
            // payment: {
            //     gateway: 'stripe',
            //     stripe: {
            //         payment_method_id: paymentMethod.id
            //     },
            // },
        };
        handlePurchase(payload).then((response) => {
            setIsLoading(false);
            if (response.status === 201) {
                response.json().then((transaction) => {
                    setTransaction(transaction);
                    nextStep();
                });
            } else {
                setErrorMessage('An Error Occurred');
            }
        });
        // }

    };

    return (
        <>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({ elements, stripe }) => (
                        <form onSubmit={(e) => onPay(e, elements, stripe)}>
                            {availableLoanAmount && (
                                <>
                                    <br />
                                    <Typography variant="body1" color="textPrimary">
                                        <b>Financing:</b>
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={1}>
                                            <Typography variant="body1" color="textPrimary">
                                                0
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Slider
                                                defaultValue={0}
                                                onChange={(e, val) => setLoanAmount(Math.round(availableLoanAmount * val) / 100)}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography variant="body1" color="textPrimary">
                                                {availableLoanAmount.toFixed(2)}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Typography variant="caption" color="textPrimary">
                                        SGD {loanAmount.toFixed(2)} / {availableLoanAmount.toFixed(2)}
                                    </Typography>
                                </>
                            )}
                            <br />
                            <br />
                            <Typography variant="body1" gutterBottom color="textPrimary">
                                <b>Debit/Credit Card:</b>
                            </Typography>
                            <CardElement />
                            <br />
                            <br />
                            <br />
                            <Grid container justifyContent="space-between">
                                <Grid item>
                                    <Button onClick={onBack} variant='outlined'>
                                        Back
                                    </Button>
                                </Grid>
                                {order.total && availableLoanAmount && (
                                    <Grid item>
                                        <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                                            Pay SGD {(order.total - loanAmount).toFixed(2)}
                                        </Button>
                                    </Grid>
                                )}
                            </Grid>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
            <ModalBox
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                title="Confirm Payment"
                Content={() => {
                    return (
                        <>
                            <Typography variant="body2">
                                <b>Total:</b> SGD {order.total.toFixed(2)}
                                <br/>
                                <b>Loan:</b> SGD {loanAmount.toFixed(2)}
                                <br />
                                <b>To Pay:</b> SGD {(order.total - loanAmount).toFixed(2)}
                            </Typography>
                        </>
                    )
                }}
                Buttons={() => {
                    return (
                        <>
                            {isLoading ?
                                <CircularProgress />
                                :
                                <Grid container justifyContent="space-around">
                                    <Grid item>
                                        <Button
                                            color='primary'
                                            variant="contained"
                                            onClick={onConfirmPay}
                                        >
                                            Confirm
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="outlined"
                                            onClick={() => setIsModalOpen(false)}
                                        >
                                            Cancel
                                        </Button>
                                    </Grid>
                                </Grid>
                            }
                        </>
                    )
                }}
            />
        </>
    )
};

export default PaymentForm;