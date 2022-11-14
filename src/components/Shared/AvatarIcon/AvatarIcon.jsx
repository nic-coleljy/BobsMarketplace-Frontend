import { Avatar } from '@material-ui/core';
import React from 'react';
import useStyles from './styles';

const AvatarIcon = ({ Icon }) => {
    const classes = useStyles();

    return (
        <Avatar className={classes.avatar}>
            <Icon color="primary" />
        </Avatar>
    )
}

export default AvatarIcon