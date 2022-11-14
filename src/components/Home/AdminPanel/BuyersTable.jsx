import { Button, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react'
import { fetchBuyers, handleLockBuyer, handleUnlockBuyer } from '../../../helpers/BackendAPICalls';
import { UserContext } from '../../../helpers/Contexts';
import useStyles from './styles';
import { Table } from '../..';

const BuyersTable = () => {
    const classes = useStyles();
    const { currentUser, isLoading, setIsLoading, setErrorMessage } = useContext(UserContext);
    const [buyers, setBuyers] = useState(null);

    useEffect(() => {
        if (currentUser) {
            setIsLoading(true);
            fetchBuyers().then((buyers) => {
                setBuyers(buyers);
                setIsLoading(false);
            });
        }
    }, [currentUser, setIsLoading]);

    const handleLock = (id) => {
        setIsLoading(true);
        handleLockBuyer(id).then((response) => {
            if (response.status === 200) {
                window.location.reload(false);
            } else {
                setErrorMessage('An Error Occurred');
            }
            setIsLoading(false);
        });
    }

    const handleUnlock = (id) => {
        setIsLoading(true);
        handleUnlockBuyer(id).then((response) => {
            if (response.status === 200) {
                window.location.reload(false);
            } else {
                setErrorMessage('An Error Occurred');
            }
            setIsLoading(false);
        });
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 80 },
        { field: 'companyName', headerName: 'Company Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'creditScore', headerName: 'Credit Score', width: 110 },
        {
            field: 'lock', headerName: 'Status', width: 100, renderCell: (params) => {
                return (
                    <>
                        {params.row.lock ? 'Locked' : 'Okay'}
                    </>
                )
            }
        },
        {
            field: 'actions', headerName: 'Actions', width: 100, renderCell: (params) => {
                return (
                    <Button
                        onClick={(e) => params.row.lock ? handleUnlock(params.row.id)  : handleLock(params.row.id)}
                        color="primary"
                        variant="outlined"
                    >
                        {params.row.lock ? 'Unlock' : 'Lock'}
                    </Button>
                )
            }
        },
    ];

    const components = {
        Header: () => (
            <div className={classes.tableHeader}>
                <Typography variant="h5">
                    Buyers
                </Typography>
            </div>
        ),
    };

    return (
        <>
            {!isLoading && buyers &&
                <Table
                    rows={buyers}
                    columns={columns}
                    components={components}
                    getRowId={(row) => row.id}
                />
            }
        </>
    )
}

export default BuyersTable