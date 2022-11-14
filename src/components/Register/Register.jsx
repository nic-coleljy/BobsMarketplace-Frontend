import React, { useState } from 'react';

import { Divider, Link, Paper, Typography } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

import useStyles from './styles';
import RegisterForm from './RegisterForm';
import RoleSelection from './RoleSelection';
import { AvatarIcon } from '..';

const Register = () => {
    const classes = useStyles();
    const [roleSelected, setRoleSelected] = useState(null);

    return (
        <Paper className={classes.root} align="center">
            <AvatarIcon
                Icon={AddCircleOutlineOutlinedIcon}
            />
            <br />
            <Typography variant="h5">
                <b>Sign up</b>
            </Typography>
            <br />
            {!roleSelected ?
                <RoleSelection setRoleSelected={setRoleSelected} />
                :
                <RegisterForm roleSelected={roleSelected} setRoleSelected={setRoleSelected} />
            }
            <br />
            <br />
            <Divider />
            <Typography className={classes.register}>
                <br />
                Already have an account?
                <br />
                <Link href="/login">
                    Sign in
                </Link>
            </Typography>
        </Paper>
    )
};

export default Register;
