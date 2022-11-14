import { Box, Divider, Modal, Typography } from '@material-ui/core';
import React from 'react';
import useStyles from './styles';

const ModalBox = ({ isOpen, setIsOpen, title, Content, Buttons, noClose }) => {
    const classes = useStyles();

    return (
        <Modal
            open={isOpen}
            onClose={() => {
                if (!noClose) {
                    setIsOpen(false);
                }
            }}
        >
            <Box className={classes.modal}>
                <Typography variant="h6">
                    {title}
                </Typography>
                <Divider />
                <Content />
                <br />
                <Buttons />
            </Box>
        </Modal>
    )
}

export default ModalBox