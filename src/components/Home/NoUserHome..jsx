import React from 'react';
import { BlinkingCursorTextBuilder } from 'react-animated-text-builders';

import { Typography } from '@material-ui/core';

import useStyles from './styles';

const NoUserHome = () => {
    const classes = useStyles();

    return (
        <>
            <Typography variant="h4" className={classes.title}>
                Welcome to
            </Typography>
            <BlinkingCursorTextBuilder
                textStyle={{
                    color: "white",
                    fontFamily: [
                        '-apple-system',
                        'BlinkMacSystemFont',
                        '"Segoe UI"',
                        'Roboto',
                        '"Helvetica Neue"',
                        'Arial',
                        'sans-serif',
                        '"Apple Color Emoji"',
                        '"Segoe UI Emoji"',
                        '"Segoe UI Symbol"',
                    ].join(','),
                    fontSize: "xx-large",
                }}
                cursorComponent={
                    <div style={{ color: "white" }}>
                        _
                    </div>
                }
                timeout={150}
                blinkingSpeed={500}
                blinkTimeAfterFinish={-1}
            >
                Bob's Marketplace
            </BlinkingCursorTextBuilder>
            <div className={classes.hero} />
        </>
    )
};

export default NoUserHome;
