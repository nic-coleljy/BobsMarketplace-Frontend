import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { BackToHome } from '..';

const NotFound = () => {
    return (
        <>
            <Grid align="center" >
                <Typography variant="h4">
                    404 - Page Not Found!
                </Typography>
                <BackToHome />
            </ Grid>
        </>
    )
};

export default NotFound;