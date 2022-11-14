import { Button, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { fetchSellers, handleLockSeller, handleUnlockSeller } from '../../../helpers/BackendAPICalls';
import { UserContext } from '../../../helpers/Contexts';
import useStyles from './styles';
import { Table } from '../..';

const SellersTable = () => {
    const classes = useStyles();
    const { currentUser, isLoading, setIsLoading, setErrorMessage } = useContext(UserContext);
    const [sellers, setSellers] = useState([]);

    useEffect(() => {
        if (currentUser) {
            setIsLoading(true);
            fetchSellers().then((sellers) => {
                setSellers(sellers);
                setIsLoading(false);
            });
        }
    }, [currentUser, setIsLoading]);

    const handleLock = (id) => {
        setIsLoading(true);
        handleLockSeller(id).then((response) => {
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
        handleUnlockSeller(id).then((response) => {
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
        { field: 'credibility', headerName: 'Credibility', width: 100 },
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
                        onClick={(e) => params.row.lock ? handleUnlock(params.row.id) : handleLock(params.row.id) }
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
                    Sellers
                </Typography>
            </div>
        ),
    };

    return (
        <>
            {!isLoading && sellers &&
                <Table
                    rows={sellers}
                    columns={columns}
                    components={components}
                    getRowId={(row) => row.id}
                />
            }
        </>
    )
}

export default SellersTable