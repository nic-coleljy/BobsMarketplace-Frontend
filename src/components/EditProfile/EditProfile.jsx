import React from 'react';
import { Person } from '@material-ui/icons';
import { Avatar, Paper, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import useStyles from './styles';
import { EditableProfileFieldEnum } from '../../helpers/EditableProfileField';
import EditName from './EditName';
import EditEmail from './EditEmail';
import EditBusinessProfileUrl from './EditBusinessProfileUrl';

const EditProfile = () => {
    const classes = useStyles();
    const { field } = useParams();

    return (
        <Paper className={classes.root} align="center">
            <Avatar className={classes.avatar}>
                <Person color="primary" />
            </Avatar>
            <br />
            <Typography variant="h5">
                <b>Edit Profile</b>
            </Typography>
            <br />
            {field && field === EditableProfileFieldEnum.NAME ?
                <EditName />
                : field === EditableProfileFieldEnum.EMAIL ?
                    <EditEmail />
                    : field === EditableProfileFieldEnum.BUSINESS_PROFILE_URL &&
                    <EditBusinessProfileUrl />
            }
        </Paper>
    )
};

export default EditProfile;
