import { CircularProgress } from '@material-ui/core'
import React, { useContext } from 'react'
import { UserContext } from '../../helpers/Contexts';

const Loading = () => {
    const { isLoading } = useContext(UserContext);

    return (
        <>
            {isLoading && <CircularProgress />}
        </>
    )
}

export default Loading