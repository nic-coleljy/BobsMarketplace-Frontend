import React from 'react';
import { Divider, Grid, Typography } from '@material-ui/core';

const Options = ({ label, options, Icon, Type, defaultOption, handleChange }) => {
    return (
        <Grid item xs={12} align="center" key={label}>
            <Typography
                variant="subtitle1"
                color="textSecondary"
            >
                <Icon fontSize="inherit" />
                {" " + label}
            </Typography>
            <Divider />
            <Type
                name={label}
                defaultValue={defaultOption}
                values={options}
                handleChange={handleChange}
            />
        </Grid>
    )
}

export default Options