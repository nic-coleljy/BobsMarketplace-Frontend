import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { RoleEnum } from '../../helpers/Role';

const RoleSelection = ({ setRoleSelected }) => {
    const handleClick = (role) => {
        setRoleSelected(role);
    };

    return (
        <>
            <Typography variant="caption">
                Please choose a role:
            </Typography>
            <br />
            <br />
            <Button
                variant="contained"
                color='primary'
                fullWidth
                onClick={() => handleClick(RoleEnum.BUYER)}
            >
                Buyer
            </Button>
            <br />
            <br />
            <Button
                variant="contained"
                color='primary'
                fullWidth
                onClick={() => handleClick(RoleEnum.SELLER)}
            >
                Seller
            </Button>
        </>
    )
};

export default RoleSelection;
