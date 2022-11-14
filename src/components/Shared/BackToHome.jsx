import { Button } from '@material-ui/core';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../helpers/Contexts';

const BackToHome = () => {
    const navigate = useNavigate();
    const { setErrorMessage } = useContext(UserContext);

    const handleSubmit = () => {
        setErrorMessage(null);
        navigate('/');
        window.scrollTo(0, 0);
    };

    return (
        <Button onClick={handleSubmit} variant="outlined" type="button">
            Back to Home
        </Button>
    );
}

export default BackToHome