import { Button, Grid, Typography } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { fetchSellerLicenses } from '../../helpers/BackendAPICalls';
import { UserContext } from '../../helpers/Contexts';
import useStyles from './styles';
import { BackButton } from '..';

const SellerLicensesTable = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { currentUser, isLoading, setIsLoading } = useContext(UserContext);
    const [licenses, setLicenses] = useState([]);

    useEffect(() => {
        if (currentUser) {
            setIsLoading(true);
            fetchSellerLicenses(currentUser.id).then((licenses) => {
                setLicenses(licenses);
                setIsLoading(false);
            });
        }
    }, [currentUser, setIsLoading]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 80 },
        { field: 'typeOfGood', headerName: 'Type Of Good', width: 150 },
        { field: 'issuedBy', headerName: 'Issued By', width: 150 },
        { field: 'expiryDate', headerName: 'Expiry Date', width: 150 },
        { field: 'status', headerName: 'Status', width: 150 },
        {
            field: 'actions', headerName: 'Actions', width: 100, renderCell: (params) => {
                return (
                    <Button
                        onClick={(e) => console.log(params.row.name)}
                        color="primary"
                        variant="outlined"
                    >
                        Remove
                    </Button>
                )
            }
        },
    ];

    const components = {
        Header: () => (
            <div className={classes.tableHeader}>
                <BackButton />
                <Typography variant="h5">
                    Licenses
                </Typography>
                <div>
                    <Grid container spacing={1}>
                        <Grid item>
                            <Button
                                onClick={() => navigate('/license/add')}
                                color="primary"
                                variant="outlined"
                            >
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        ),
    };

    return (
        <>
            {!isLoading && licenses && (
                <div className={classes.table}>
                    <DataGrid
                        rows={licenses}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        components={components}
                    />
                </div>
            )}
        </>
    )
}

export default SellerLicensesTable