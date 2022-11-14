import { Box, CircularProgress, Typography } from '@material-ui/core'
import React from 'react'
import { BackToHome } from '..';

const Confirmation = ({ transaction }) => {
    return (
        <Box>
            {transaction ?
                <>
                    <Typography variant="h6">
                        Thank you for your purchase
                    </Typography>
                    <br />
                    <Typography variant="subtitle2">
                        Transaction ID: {transaction.tid}
                    </Typography>
                    <br />
                    <BackToHome />
                </>
                :
                <>
                    <CircularProgress />
                </>
            }
        </Box>
    );
}

export default Confirmation