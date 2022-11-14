import { Grid, Typography } from '@material-ui/core';
import React, { useContext } from 'react'
import { UserContext } from '../../helpers/Contexts';
import { BackToHome } from '..';

const Error = () => {
    const { errorMessage } = useContext(UserContext);
    
    return (
        <>
            {errorMessage && <Grid align="center" >
                <Typography variant="h4">
                    {errorMessage}
                </Typography>
                <BackToHome />
            </ Grid>}
        </>
    )
};

export default Error;