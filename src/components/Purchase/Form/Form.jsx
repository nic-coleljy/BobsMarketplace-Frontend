import React from 'react'
import PaymentForm from './PaymentForm'
import DeliveryForm from './DeliveryForm'
import QuantityForm from './QuantityForm'

const Form = ({ activeStep, order, setOrder, setTransaction, nextStep, backStep }) => {
    return (
        <>
            {activeStep === 0 ?
                <QuantityForm
                    order={order}
                    setOrder={setOrder}
                    nextStep={nextStep}
                />
                : activeStep === 1 ?
                    <DeliveryForm
                        order={order}
                        setOrder={setOrder}
                        nextStep={nextStep}
                        backStep={backStep}
                    />
                    :
                    <PaymentForm
                        order={order}
                        setOrder={setOrder}
                        setTransaction={setTransaction}
                        nextStep={nextStep}
                        backStep={backStep}
                    />
            }
        </>
    )
}

export default Form