import React, { useState, useEffect, useContext } from 'react';
import { Paper, Grid, Stepper, StepLabel, Step, Divider, Typography } from '@material-ui/core';

import useStyles from './styles';
import { useParams } from 'react-router-dom';
import Confirmation from './Confirmation';
import OrderInformation from './OrderInformation';
import Form from './Form/Form';
import { fetchCommodity } from '../../helpers/BackendAPICalls';
import { UserContext } from '../../helpers/Contexts';

const steps = ['Select quantity', 'Delivery information', 'Payment details'];

const Purchase = () => {
    const classes = useStyles();
    const { id } = useParams();
    const { currentUser, isLoading, setIsLoading, errorMessage, setErrorMessage } = useContext(UserContext);
    const [activeStep, setActiveStep] = useState(0);
    const [order, setOrder] = useState(null);
    const [transaction, setTransaction] = useState(null);

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    useEffect(() => {
        if (currentUser && id && !order) {
            setIsLoading(true);
            fetchCommodity(id).then((response) => {
                setIsLoading(false);
                if (response.status === 404)
                    setErrorMessage(`404 - Commodity ${id} Not Found`)
                else {
                    response.json().then((commodity) => {
                        setOrder({ commodity: commodity });
                    });
                }
            });
        }
    }, [currentUser, id, order, setErrorMessage, setIsLoading]);


    return (
        <>
            {!isLoading && !errorMessage && order && (
                <Paper className={classes.root} align="center">
                    <Typography variant="h5">
                        Purchase Form
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <Divider />
                    <br />
                    {activeStep === steps.length ? <Confirmation transaction={transaction} /> :
                        <>
                            <OrderInformation
                                order={order}
                                activeStep={activeStep}
                            />
                            <Form
                                activeStep={activeStep}
                                order={order}
                                setOrder={setOrder}
                                setTransaction={setTransaction}
                                nextStep={nextStep}
                                backStep={backStep}
                            />
                        </>
                    }
                </Paper>
            )}
        </>
    )
};

export default Purchase;
