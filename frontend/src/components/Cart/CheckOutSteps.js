import React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Typography } from "@mui/material";
import "./Shipping.css";
import {
  MdAccountBalance,
  MdLibraryAddCheck,
  MdLocalShipping,
} from "react-icons/md";
const CheckOutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <MdLocalShipping />,
    },
    {
      label: <Typography>Confirm order</Typography>,
      icon: <MdLibraryAddCheck />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <MdAccountBalance />,
    },
  ];
  const stepsstyle = {
    boxSizing: "border-box",
  };

  return (
    <>
      <Stepper
        className="stepper"
        activeStep={activeStep}
        alternativeLabel
        style={stepsstyle}
        sx={{
          "& .MuiStepConnector-line": {
            borderTopWidth: "2px",
          },
          "& .MuiStepConnector-root.Mui-active .MuiStepConnector-line": {
            borderColor: "red",
          },
          "& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line": {
            borderColor: "tomato",
          },
        }}
      >
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default CheckOutSteps;
