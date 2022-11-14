import { Typography } from '@material-ui/core';
import React from 'react';
import ModalBox from './ModalBox';

const ModalBoxText = ({ isOpen, setIsOpen, title, content, Buttons }) => {
    return (
        <ModalBox
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={title}
            Content={() => {
                return (
                    <Typography variant="body2">
                        {content}
                    </Typography>
                )
            }}
            Buttons={Buttons}
        />
    )
}

export default ModalBoxText