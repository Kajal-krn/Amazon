import React, { Fragment } from 'react'
import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import "./CheckOutSteps.css"

const CheckOutSteps = ({step}) => {

    const steps = [
        {
          label: <Typography>Shipping Details</Typography>,
          icon: <LocalShippingIcon />,
        },
        {
          label: <Typography>Confirm Order</Typography>,
          icon: <LibraryAddCheckIcon />,
        },
        {
          label: <Typography>Payment</Typography>,
          icon: <AccountBalanceIcon />,
        },
    ];

    const stepStyles = {
        boxSizing: "border-box",
    };

    return (
        <Fragment>
            <Stepper 
                alternativeLabel
                activeStep={step}
                style={stepStyles}
            >
                {steps.map((item,index) => (
                    <Step 
                        key={index}
                        active={step === index ? true : false}
                        completed={step >= index ? true : false}
                    >
                        <StepLabel 
                            style={{
                                color: step >= index ? (step > index ? "green" : "tomato") : ("rgba(0, 0, 0, 0.649)"),
                            }}
                            icon={item.icon}
                        >
                            {item.label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Fragment>
    )
}

export default CheckOutSteps
