import { Button } from '@material-ui/core'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();
    return (
        <Button
            onClick={() => navigate(-1)}
            variant="outlined"
        >
            {'< Back'}
        </Button>
    )
}

export default BackButton